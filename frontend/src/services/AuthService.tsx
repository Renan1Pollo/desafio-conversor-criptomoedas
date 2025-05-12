import axios from "axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function register(data: RegisterData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || "Erro inesperado no registro.";
    return { success: false, error: errorMsg };
  }
}

export async function login(credentials: LoginData): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    const { data } = await axios.post(`${API_URL}/login`, credentials);
    return { success: true, data: data.token };
  } catch (error: any) {
    const message = error.response?.data?.error ?? "Erro inesperado na autenticação.";
    return { success: false, error: message };
  }
}
