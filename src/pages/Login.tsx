// src/pages/Login.tsx
import { Link, useNavigate } from "react-router";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin as UserLoginType } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/loginUser";
import { useUser } from "../contexts/userContext";
import { toast } from "sonner";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();

  const loginUserSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  });

  type LoginFormSchema = z.infer<typeof loginUserSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      reset();
      if (data.userInfo && data.userInfo.length > 0) {
        login(data.userInfo[0], data.token);
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        toast.error(
          "Dados do usuário não encontrados na resposta do servidor.",
        );
        console.error("Login bem-sucedido, mas sem dados de usuário:", data);
      }
    },
    onError: (error: any) => {
      console.error("Error logging in user:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais.";
      toast.error(errorMessage);
    },
  });

  console.log("usuario logado", loginMutation.data);

  const handleFormSubmit = (formData: LoginFormSchema) => {
    loginMutation.mutate(formData as UserLoginType);
  };

  return (
    <div className="mt-30 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-cream border-base-gray relative flex w-full max-w-md flex-col items-center rounded-3xl border-2 p-6 py-8 shadow-xl sm:p-8 md:p-10 lg:px-12 lg:py-12"
      >
        <img
          src={strawberry}
          alt="Morango decorativo"
          className="absolute top-0 left-0 w-16 -translate-x-1/3 -translate-y-1/3 transform sm:w-20 md:w-24 md:-translate-x-1/2 md:-translate-y-1/2"
        />
        <h1 className="text-chocolate-brown mb-8 text-2xl font-bold sm:mb-10 sm:text-3xl">
          Faça seu Login
        </h1>
        <div className="mb-8 flex w-full flex-col gap-5 sm:gap-6">
          <div className="w-full">
            <FormInput label="Email *" type="email" {...register("email")} />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <FormInput
              label="Senha *"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 text-base font-semibold md:text-lg"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Entrando..." : "Fazer Login"}
          </Button>
          <p className="text-sm text-gray-700">
            Ainda não possui uma conta?{" "}
            <Link
              to={"/register"}
              className="text-chocolate-brown hover:text-terracota font-bold underline"
            >
              Crie uma
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
