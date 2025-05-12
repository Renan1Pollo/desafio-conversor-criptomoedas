import { z } from "zod";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/buttons/Button";
import FloatingInput from "../../components/inputs/InputFloating";
import { register } from "../../services/AuthService";
import routes from "../../routes/routes";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isFormValid = (): boolean => {
    const result = registerSchema.safeParse({ name, email, password, confirmPassword });
    if (result.success) return true;
    const [firstIssue] = result.error.errors;
    setError(firstIssue?.message ?? "Dados inválidos");
    return false;
  };

  const submitRegisterForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!isFormValid()) return;

    const response = await register({ name, email, password });

    if (response.success) {
      navigate(routes.auth.login);
    } else {
      setError(response.error ?? "Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Criar uma conta
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={submitRegisterForm}>
              <FloatingInput
                id="username"
                label="Seu nome de usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Silva"
                type="text"
                name="name"
                required
              />

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
                placeholder="••••••••"
                type="password"
                name="password"
                required
              />

              <FloatingInput
                id="confirmPassword"
                label="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              >
                Criar conta
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já tem uma conta?
                <a
                  href={routes.auth.login}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Faça login aqui
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};