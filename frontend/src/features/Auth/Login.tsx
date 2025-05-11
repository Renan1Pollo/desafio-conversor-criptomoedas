import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/Button';
import FloatingInput from '../../components/inputs/InputFloating';
import routes from '../../routes/routes';
import AuthService from '../../services/AuthService';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await AuthService.login(formData);

    if (response.success) {
      window.location.href = routes.auth.login;
    } else {
      setError(response.error || 'Erro ao autenticar usuário. Tente novamente.');
    }
  };

  useEffect(() => {
    const { email, password} = formData;
    setIsFormValid(email.trim() !== '' && password.trim() !== '');
  }, [formData]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Fazer login
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                Entrar
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ainda não tem uma conta?
                <a href={routes.auth.register} className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Criar conta</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
