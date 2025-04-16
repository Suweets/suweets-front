import logo from "../assets/suweets-logo.svg";
import Button from "../components/Button/Button";
import heroImg from "../assets/heroImage.svg";

export default function Main() {
  return (
    <>
      <div className="bg-hero-gradient h-screen w-full items-center justify-center">
        <div className="flex h-full w-full items-center justify-center gap-52 p-[70px]">
          <div className="ml-30 flex flex-col items-center gap-11 text-start">
            <img src={logo} alt="Logo" className="w-auto" />
            <span className="text-light-cream w-[438px] text-[20px] font-bold">
              Bolos e tortas feitos com amor, perfeitos e saborosos para
              qualquer momento!
            </span>
            <div className="flex w-full gap-5">
              <Button>Faça seu pedido</Button>
              <Button variant="secondary">Ver catálogo</Button>
            </div>
          </div>
          <img src={heroImg} alt="" />
        </div>
      </div>
    </>
  );
}
