import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.BASE_URL,
});

/* // interceptador de solicitação adicionado à instância do axios:
// unção que é chamada antes de cada solicitação ser enviada.
//A função obtém o token do cookie e o adiciona ao cabeçalho Authorization da solicitação

API.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Token:", token);
  console.log("Request headers:", config.headers);
  return config;
});
*/

export const sendMessage = async (message: string) => {
  const token = Cookies.get("authToken");
  const response = await API.post(
    process.env.BASE_URL || "",
    { chats: message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.output;
};
