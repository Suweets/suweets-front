import logo from "../assets/suweets-logo.svg";
import Button from "../components/Button/Button";
import heroImg from "../assets/heroImage.svg";
import Divider from "../components/Divider/Divider";
import { Minus } from "lucide-react";
import CakeSwiper from "../components/CakesSwiper/CakesSwiper";

export default function Main() {
  return (
    <div className="bg-cream flex flex-col">
      <header className="bg-hero-gradient h-screen w-full items-center justify-center">
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
          <img src={heroImg} alt="" className="animate-float" />
        </div>
      </header>
      <Divider />
      <section className="mt-48 flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-full w-full flex-col items-center justify-start gap-10 px-[70px] text-center">
          <div className="flex max-w-2xl flex-col items-center justify-center gap-15 text-center">
            <h1 className="text-chocolate-brown text-5xl font-bold">
              Destaques da Suweets
            </h1>
            <span className="text-light-brown text-xl font-bold">
              Nossos bolos e tortas mais pedidos, feitos com ingredientes
              selecionados e muito carinho! Perfeitos para qualquer ocasião,
              seja uma comemoração especial ou um momento de puro prazer.
            </span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-20">
            <div className="flex h-screen w-full flex-col gap-30">
              <div className="flex w-full items-center justify-between">
                <Button variant="primary">Visualizar Todos</Button>
                <div className="text-chocolate-brown flex items-center gap-2">
                  <Minus className="text-chocolate-brown" size={20} />
                  <span className="text-chocolate-brown font-bold">
                    Destaques
                  </span>
                </div>
              </div>
              <div>
                <CakeSwiper />
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-30">
              <div className="flex w-full items-center justify-between">
                <Button variant="primary">Visualizar Todos</Button>
                <div className="text-chocolate-brown flex items-center gap-2">
                  <Minus className="text-chocolate-brown" size={20} />
                  <span className="text-chocolate-brown font-bold">
                    Novos Sabores
                  </span>
                </div>
              </div>
              <div>
                <CakeSwiper />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section className="mt-48 flex h-full w-full flex-col items-center justify-center"></section>
    </div>
  );
}
