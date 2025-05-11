import axios from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

class AuthService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL;
  }

  async register(data: RegisterData): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, data);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Erro inesperado no registro.';
      return { success: false, error: errorMsg };
    }
  }

 
  async login(data: LoginData): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, data);
      return { success: true, data: response.data.token };
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Erro inesperado na autenticacão.';
      return { success: false, error: errorMsg };
    }
  }
}

export default new AuthService();
