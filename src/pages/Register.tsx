import { Link } from "react-router";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";

export default function Register() {
  return (
    <div className="bg-light-brown flex flex-col">
      <section className="flex h-screen w-full items-center justify-center p-[70px]">
        <div className="flex h-full w-full items-center justify-center">
          <form className="bg-cream shadow-grayShadow border-base-gray relative mt-20 flex h-fit w-[700px] flex-col items-center rounded-3xl border-2 px-14 py-3">
            <p className="text-chocolate-brown font-bold">Faça seu Registro</p>
            <div className="mt-10 mb-10 flex h-full w-full items-start justify-between gap-24">
              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput label="Nome *" required />
                <FormInput label="Sobrenome" />
                <FormInput label="Senha *" type="password" required />
                <FormInput label="Confirmar Senha *" type="password" required />
              </div>
              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput label="Email *" type="email" required />
                <FormInput label="Confirmar Email *" type="email" required />
                <FormInput label="CPF *" required />
                <FormInput label="Telefone" type="tel" />
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
