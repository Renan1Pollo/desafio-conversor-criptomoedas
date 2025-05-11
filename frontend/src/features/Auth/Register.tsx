import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/Button';
import FloatingInput from '../../components/inputs/InputFloating';
import routes from '../../routes/routes';
import AuthService from '../../services/AuthService';

const PASSWORD_MISMATCH_ERROR = 'As senhas não são iguais. Tente novamente.';
const GENERIC_REGISTRATION_ERROR = 'Erro ao registrar usuário. Tente novamente.';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePasswords = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const getFormPayload = (form: typeof formData) => {
    const { name, email, password } = form;
    return { name, email, password };
  };

  const registerUser = async (
    payload: { name: string; email: string; password: string }
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      return await AuthService.register(payload);
    } catch {
      return { success: false, error: GENERIC_REGISTRATION_ERROR };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!validatePasswords(password, confirmPassword)) {
      setError(PASSWORD_MISMATCH_ERROR);
      return;
    }

    const payload = getFormPayload(formData);
    const response = await registerUser(payload);

    if (response.success) {
      alert('Registro realizado com sucesso!');
      window.location.href = routes.auth.login;
    } else {
      setError(response.error || GENERIC_REGISTRATION_ERROR);
    }
  };

  useEffect(() => {
    const { name, email, password, confirmPassword } = formData;
    setIsFormValid(
      name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== ''
    );
  }, [formData]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Criar uma conta
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <FloatingInput
                id="username"
                label="Seu nome de usuário"
                value={formData.name}
                onChange={handleChange}
                placeholder="João Silva"
                type="text"
                name="name"
                required
              />

              <FloatingInput
                id="email"
                label="Seu email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                required
              />

              <FloatingInput
                id="password"
                label="Senha"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
                name="password"
                required
              />

              <FloatingInput
                id="confirmPassword"
                label="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
                name="confirmPassword"
                required
              />

              {error && (
                <div className="text-red-500 text-sm font-light">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!isFormValid}
              >
                Criar conta
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já tem uma conta?
                <a href={routes.auth.login} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Faça login aqui</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
