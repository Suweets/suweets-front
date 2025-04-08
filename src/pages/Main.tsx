import chocolate_header from "../assets/Ativo 3.svg";
import suweets_logo from "../assets/suweets-logo.png";
import Button from "../components/Button/Button";

export default function Main() {
  return (
    <>
      <div className="size-full bg-cover bg-no-repeat">
        <img
          src={chocolate_header || "/placeholder.svg"}
          alt=""
          className="desktop:-top-52 pointer-events-none absolute z-0 w-full"
        />
        <div className="relative z-10 flex h-1/2 w-full flex-col items-center justify-center gap-6">
          <img
            src={suweets_logo}
            alt="Suweets Logo"
            className="w-80 sm:-mt-10 md:-mt-32 lg:mt-5"
          />
          <p className="text-light-brown max-w-md text-center font-bold">
            Doces feitos com amor, perfeitos para qualquer momento!
          </p>
          <Button>Ver Produtos</Button>
        </div>
        <div className="bg-light-cream flex h-screen w-full items-center justify-center">
          adsdas
        </div>
      </div>
    </>
  );
}
