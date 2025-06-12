import React, { useState, useEffect, useRef } from 'react';
import '../styles/style.css';
import { FaArrowLeft, FaPaperPlane, FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchChats, sendChat, updateChat, deleteChat } from '../api/chatAPI';
import { io } from 'socket.io-client';

const emojiList = ['🐶', '🐱', '🐼', '🦊', '🐸', '🐵', '🐧', '🐯', '🐻', '🐨', '🦁', '🐷', '🐥'];

const getAvatarEmoji = (id) => {
  if (!id) return '👤';
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return emojiList[hash % emojiList.length];
};

const RoomChat = () => {
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
  const username = localStorage.getItem('username') || 'Anonymous';

  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [replyToId, setReplyToId] = useState(null);
  const [groupChats, setGroupChats] = useState([]);
  const [filter, setFilter] = useState('all');
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const getTime = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    socketRef.current = io('http://localhost:5050');

    socketRef.current.on('connect', () => {
      console.log('Socket connected with ID:', socketRef.current.id);
    });

    socketRef.current.on('receive_message', (msg) => {
      const isFromSelf = String(msg.user_id?._id || msg.user_id) === String(userId);
      const uid = msg.user_id?._id || msg.user_id;

      const chat = {
        id: msg._id || msg.id,
        text: msg.message || msg.text,
        sender: isFromSelf ? 'You' : msg.sender || 'Anonymous',
        avatar: msg.avatar || getAvatarEmoji(uid),
        time: msg.time || getTime(msg.createdAt),
        replyTo: msg.replyTo,
        label: msg.label || 'Not Labeled',
      };

      setGroupChats((prev) => {
        const exists = prev.some((existingChat) => existingChat.id === chat.id);
        return exists ? prev : [...prev, chat];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchChats();
        const formatted = data
          .filter((chat) => chat.user_recipient === 'public')
          .map((chat) => {
            const uid = chat.user_id?._id || chat.user_id;
            return {
              id: chat._id,
              text: chat.message,
              sender: String(uid) === String(userId) ? 'You' : chat.sender || 'Anonymous',
              avatar: chat.avatar || getAvatarEmoji(uid),
              time: getTime(chat.createdAt),
              replyTo: chat.replyTo,
              label: chat.label || 'Not Labeled',
            };
          });
        setGroupChats(formatted);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    loadChats();
  }, [userId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    if (editingId !== null) {
      try {
        const updated = await updateChat(editingId, message);
        const updatedList = groupChats.map((chat) =>
          chat.id === editingId ? { ...chat, text: updated.message, label: updated.label } : chat
        );
        setGroupChats(updatedList);
        setEditingId(null);
        setMessage('');
        showNotification('✏️ Message edited successfully.');
      } catch (error) {
        console.error('Failed to update message:', error);
      }
      return;
    }

    const newChatData = {
      user_id: userId,
      user_recipient: 'public',
      message,
      replyTo: replyToId,
      sender: username,
      avatar: getAvatarEmoji(userId),
    };

    try {
      const saved = await sendChat(newChatData);

      const newChat = {
        id: saved._id,
        text: saved.message,
        sender: 'You',
        avatar: saved.avatar || getAvatarEmoji(userId),
        time: getTime(saved.createdAt),
        replyTo: saved.replyTo,
        label: saved.label || 'Not Labeled',
      };

      setGroupChats((prev) => [...prev, newChat]);
      socketRef.current.emit('send_message', saved);
      setMessage('');
      setReplyToId(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      if (error.response?.status === 403) {
        setGroupChats((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'SafeTalks AI',
            text: '❌ Your message was not sent because it contains **hate speech**. Please use respectful language 😇',
            time: '',
            system: true,
          },
        ]);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChat(id);
      const filtered = groupChats.filter((chat) => chat.id !== id && chat.replyTo !== id);
      setGroupChats(filtered);
      showNotification('🗑️ Message deleted successfully.');
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleEdit = (chat) => {
    setEditingId(chat.id);
    setMessage(chat.text);
  };

  const handleReply = (id) => {
    setReplyToId(id);
  };

  const getRepliedMessage = (id) => groupChats.find((msg) => msg.id === id);
  const filteredChats = groupChats.filter((chat) =>
    filter === 'all' ? true : chat.label === filter
  );

  return (
    <div className="chat-app">
      {notification && <div className="notification-box">{notification}</div>}

      <aside className="sidebar">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft />
        </button>
        <h3 className="sidebar-title">Room Chat</h3>
        <div className="chat-list">
          <div className="chat-item active">💬 Group Chat</div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ color: 'white', fontSize: '0.9rem' }}>Filter by Label:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          >
            <option value="all">All</option>
            <option value="Offensive">Offensive</option>
            <option value="Not Offensive">Not Offensive</option>
          </select>
        </div>
      </aside>

      <div className="chat-room">
        <header className="chat-room-header">
          <h2>Group Chat</h2>
        </header>

        <div className="chat-messages">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-bubble ${chat.system ? 'system-message' : ''} ${chat.sender === 'You' ? 'own-message' : ''}`}
            >
              {!chat.system && (
                <>
                  <div className="chat-meta">
                    <span className="avatar">{chat.avatar}</span>
                    <span className="sender">{chat.sender}</span>
                    <span className="time">{chat.time}</span>
                  </div>

                  {chat.replyTo && (
                    <div className="reply-preview">
                      💬 Replying to: <em>{getRepliedMessage(chat.replyTo)?.text || 'Message deleted'}</em>
                    </div>
                  )}

                  <div className="chat-text">{chat.text}</div>

                  {chat.label && (
                    <div
                      className={`chat-label ${
                        chat.label === 'Hate Speech'
                          ? 'label-hate'
                          : chat.label === 'Offensive'
                          ? 'label-offensive'
                          : 'label-safe'
                      }`}
                    >
                      {chat.label}
                    </div>
                  )}

                  <div className="chat-actions">
                    <button onClick={() => handleReply(chat.id)}><FaReply /> Reply</button>
                    {chat.sender === 'You' && (
                      <>
                        <button onClick={() => handleEdit(chat)}><FaEdit /> Edit</button>
                        <button onClick={() => handleDelete(chat.id)}><FaTrash /> Delete</button>
                      </>
                    )}
                  </div>
                </>
              )}
              {chat.system && (
                <div
                  className="chat-text system-text"
                  dangerouslySetInnerHTML={{ __html: chat.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          {replyToId && (
            <div className="replying-to">
              Replying to: {getRepliedMessage(replyToId)?.text}
              <button onClick={() => setReplyToId(null)} style={{ marginLeft: '10px', color: 'red' }}>
                Cancel
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}><FaPaperPlane /></button>
        </div>
      </div>
    </div>
  );
};

export default RoomChat;