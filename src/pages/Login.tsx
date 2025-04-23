import { Link } from "react-router";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../types/user";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/loginUser";

export default function Login() {
  const loginUserSchema = z.object({
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  });

  const { register, handleSubmit, reset } = useForm<userLogin>({
    resolver: zodResolver(loginUserSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      reset();
      console.log("User logged in successfully:", data);
    },

    onError: (error) => {
      console.error("Error logging in user:", error);
    },
  });

  const handleLogin = (data: userLogin) => {
    loginMutation.mutate(data);
    console.log("Form data:", data);
  };

  return (
    <div className="bg-light-brown flex flex-col">
      <section className="flex h-screen w-full items-center justify-center p-[70px]">
        <div className="flex h-full w-full items-center justify-center">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-cream shadow-grayShadow border-base-gray relative mt-20 flex h-fit w-fit flex-col items-center rounded-3xl border-2 px-16 py-3"
          >
            <p className="text-chocolate-brown font-bold">Faça seu Login</p>
            <div className="mt-10 mb-10 flex h-full w-fit items-center justify-center gap-24">
              <div className="flex h-full w-full flex-col gap-4">
                <FormInput
                  label="Email *"
                  {...register("email")}
                  type="email"
                />
                <FormInput
                  label="Senha *"
                  {...register("password")}
                  type="password"
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-5">
              <Button variant="primary" type="submit">
                Fazer Login
              </Button>
              <p className="text-xs font-light">
                Ainda não possui uma conta?{" "}
                <Link
                  to={"/register"}
                  className="text-chocolate-brown font-bold"
                >
                  Crie uma
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
