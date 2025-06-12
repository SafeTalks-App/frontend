import axios from 'axios';

const API_URL = 'https://be-safetalks.up.railway.app/api/chats';

export const fetchChats = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const sendChat = async (chatData) => {
  try {
    const res = await axios.post(API_URL, chatData);
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      throw new Error('Failed to send chat. Please try again.');
    }
  }
};

export const updateChat = async (id, message) => {
  const res = await axios.put(`${API_URL}/${id}`, { message });
  return res.data;
};

export const deleteChat = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};