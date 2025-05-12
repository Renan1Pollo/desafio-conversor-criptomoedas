import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import FloatingInput from "../../components/inputs/InputFloating";
import routes from "../../routes/routes";
import { login } from "../../services/AuthService";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLoginFormValid = (): boolean => {
    const result = loginSchema.safeParse({ email, password });

    if (result.success) return true;

    const [firstIssue] = result.error.errors;
    setError(firstIssue?.message ?? "Dados inválidos");

    return false;
  };

  const submitLoginForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!isLoginFormValid()) return;

    const authResponse = await login({ email, password });

    if (!authResponse.success) {
      const fallbackMessage = "Erro ao autenticar usuário. Tente novamente.";
      setError(authResponse.error ?? fallbackMessage);
      return;
    }

    localStorage.setItem("token", authResponse.data!);
    navigate(routes.home);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Fazer login
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={submitLoginForm}>
              <FloatingInput
                id="email"
                label="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                required
              />

              <FloatingInput
                id="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              >
                Entrar
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ainda não tem uma conta? 
                <a href={routes.auth.register} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Criar conta
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
