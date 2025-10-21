import axios from "axios";

const API_URL = "http://127.0.0.1:8000/chat";

export const chatService = {
  askQuestion: async (question) => {
    const response = await axios.post(`${API_URL}/ask`, { question });
    return response.data;
  },
};
