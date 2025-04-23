import { Link } from "react-router";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../services/createUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "../types/user";

export default function Register() {
  const registerUserSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    sobrenome: z.string().optional(),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    cpf: z.string().optional(),
    telefone: z.string().optional(),
    funcao: z.number().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userRegister>({
    resolver: zodResolver(registerUserSchema),
  });

  const userMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      reset();
    },

    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const handleRegister = (data: userRegister) => {
    console.log("Form data:", data);
    userMutation.mutate(data);
  };

  return (
    <div className="bg-light-brown flex flex-col">
      <section className="flex h-screen w-full items-center justify-center p-[70px]">
        <div className="flex h-full w-full items-center justify-center">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="bg-cream shadow-grayShadow border-base-gray relative mt-20 flex h-fit w-[700px] flex-col items-center rounded-3xl border-2 px-14 py-3"
          >
            <p className="text-chocolate-brown font-bold">Faça seu Registro</p>
            <div className="mt-10 mb-10 flex h-full w-full items-start justify-between gap-24">
              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput label="Nome *" {...register("nome")} />
                {errors.nome && (
                  <p className="text-xs text-red-500">{errors.nome.message}</p>
                )}
                <FormInput label="Sobrenome" {...register("sobrenome")} />
                <FormInput
                  label="Senha *"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
                <FormInput label="Confirmar Senha *" type="password" />
              </div>
              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput
                  label="Email *"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
                <FormInput label="Confirmar Email *" type="email" />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
                <FormInput label="CPF" {...register("cpf")} />

                <FormInput
                  label="Telefone"
                  type="tel"
                  {...register("telefone")}
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center gap-5">
              <Button className="w-full" variant="primary" type="submit">
                Registrar
              </Button>
              <p className="text-xs font-light">
                Já possui uma conta?{" "}
                <Link to={"/login"} className="text-chocolate-brown font-bold">
                  Entre aqui
                </Link>
              </p>
            </div>
            <img
              src={strawberry}
              alt=""
              className="absolute top-0 left-0 w-14 -translate-x-5 -translate-y-5"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
