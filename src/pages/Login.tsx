import { Link } from "react-router";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberry from "../assets/strawberry.svg";

export default function Login() {
  return (
    <div className="bg-light-brown flex flex-col">
      <section className="flex h-screen w-full items-center justify-center p-[70px]">
        <div className="flex h-full w-full items-center justify-center">
          <form className="bg-cream shadow-grayShadow border-base-gray relative mt-20 flex h-fit w-fit flex-col items-center rounded-3xl border-2 px-16 py-3">
            <p className="text-chocolate-brown font-bold">Faça seu Login</p>
            <div className="mt-10 mb-10 flex h-full w-fit items-center justify-center gap-24">
              <div className="flex h-full w-full flex-col gap-4">
                <FormInput label="Email *" required />
                <FormInput label="Senha *" required />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-5">
              <Button variant="primary" type="submit">
                Fazer Login
              </Button>
              <p className="text-xs font-light">
                Ainda não possui uma conta?{" "}
                <Link to={"/register"} className="text-chocolate-brown font-bold">
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
