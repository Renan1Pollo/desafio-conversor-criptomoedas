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
  private apiUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api';

  constructor() {
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


  async login(data: LoginData): Promise<string> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, data);
      const jwt = response.data.token;
      return jwt;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }
}

export default new AuthService();
