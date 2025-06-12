import { Link, useNavigate } from "react-router"; // ATUALIZADO para react-router-dom
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "../types/user";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const registerUserSchema = z
    .object({
      nome: z.string().min(1, "Nome é obrigatório"),
      sobrenome: z.string().optional(),
      email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
      confirmEmail: z.string().email("Email de confirmação inválido"),
      password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
      confirmPassword: z
        .string()
        .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
      cpf: z.string().optional(),
      telefone: z.string().optional(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: "Os emails não coincidem",
      path: ["confirmEmail"],
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  type RegisterFormData = z.infer<typeof registerUserSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
  });

  const userMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      toast.success(
        "Registro realizado com sucesso! Você já pode fazer login.",
      );
      reset();
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao criar usuário. Tente novamente.";
      toast.error(errorMessage);
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    const { confirmEmail, confirmPassword, ...submissionData } = data;
    console.log("Form data for submission:", submissionData);
    userMutation.mutate(submissionData as userRegister);
  };

  return (
    <div className="mt-30 flex flex-col items-center justify-center p-4 py-10 sm:p-6 md:p-8">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-cream border-base-gray relative flex w-full max-w-2xl flex-col items-center rounded-3xl border-2 p-6 py-8 shadow-xl sm:p-8 md:p-10 lg:px-12 lg:py-12"
      >
        <img
          src={strawberry}
          alt="Morango decorativo"
          className="absolute top-0 left-0 w-16 -translate-x-1/3 -translate-y-1/3 transform sm:w-20 md:w-24 md:-translate-x-1/2 md:-translate-y-1/2"
        />

        <h1 className="text-chocolate-brown mb-8 text-2xl font-bold sm:mb-10 sm:text-3xl">
          Faça seu Registro
        </h1>

        <div className="mb-8 grid w-full grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2 md:gap-y-6">
          <div className="flex flex-col gap-5 md:gap-6">
            <div>
              <FormInput label="Nome *" {...register("nome")} />
              {errors.nome && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.nome.message}
                </p>
              )}
            </div>
            <div>
              <FormInput label="Sobrenome" {...register("sobrenome")} />
            </div>
            <div>
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
            <div>
              <FormInput
                label="Confirmar Senha *"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            <div>
              <FormInput label="Email *" type="email" {...register("email")} />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                label="Confirmar Email *"
                type="email"
                {...register("confirmEmail")}
              />
              {errors.confirmEmail && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                label="CPF"
                {...register("cpf")}
                placeholder="000.000.000-00"
              />
              {errors.cpf && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.cpf.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                label="Telefone"
                type="tel"
                {...register("telefone")}
                placeholder="(00) 90000-0000"
              />
              {errors.telefone && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.telefone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-xs flex-col items-center justify-center gap-5">
          <Button
            variant="primary"
            type="submit"
            className="w-full py-3 text-base font-semibold md:text-lg"
            disabled={userMutation.isPending}
          >
            {userMutation.isPending ? "Registrando..." : "Registrar"}
          </Button>
          <p className="text-sm text-gray-700">
            Já possui uma conta?{" "}
            <Link
              to={"/login"}
              className="text-chocolate-brown hover:text-terracota font-bold underline"
            >
              Entre aqui
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
