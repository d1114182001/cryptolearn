import axios from 'axios';

const api_url = 'http://localhost:5000';

export const addWallet = async () => {
    const response = await axios.post(`${api_url}/create-wallet`);
    return response.data;
}

export const getAllWallets = async () => {
    try {
      const response = await axios.get(`${api_url}/wallets`);
      return response.data;
    } catch (error) {
      throw new Error("無法獲取錢包數據");
    }
}