import logo from "../assets/suweets-logo.svg";
import Button from "../components/Button/Button";
import heroImg from "../assets/heroImage.svg";
import Divider from "../components/Divider/Divider";
import Flavors from "../components/Flavors/Flavors";
import Pie from "../assets/tortaWhy.png";
import Ingredients from "../assets/ingredientesWhy.png";
import Bolo from "../assets/boloWhy.png";
import { Link } from "react-router";
import FeaturedProductsCarousel from "../components/FeaturedProductsCarousel/FeaturedProductsCarousel";
import { getFatias } from "@/services/getFatias";
import { useQuery } from "@tanstack/react-query";
import { FatiaType } from "@/types/fatias";

export default function Main() {
  const { data: fatias } = useQuery<FatiaType[]>({
    queryKey: ["fatias"],
    queryFn: getFatias,
  });
  return (
    <div className="bg-cream flex flex-col">
      <header className="bg-hero-gradient w-full items-center justify-center">
        <div className="flex h-full w-full items-center justify-center gap-52 p-[70px]">
          <div className="ml-30 flex flex-col items-center gap-11 text-start">
            <img src={logo} alt="Logo" className="w-auto" />
            <span className="text-light-cream w-[438px] text-[20px] font-bold">
              Bolos e tortas feitos com amor, perfeitos e saborosos para
              qualquer momento!
            </span>
            <div className="flex w-full gap-5">
              <Link
                to={"/catalogo"}
                className="bg-terracota shadow-buttonShadow text-cream cursor-pointer rounded-2xl p-3 font-bold transition-colors hover:bg-[#d86a42] active:scale-95 active:shadow-none"
              >
                Faça seu pedido
              </Link>
              <Button variant="secondary">
                <Link to={"/catalogo"} className="">
                  Ver catálogo
                </Link>
              </Button>
            </div>
          </div>
          <img src={heroImg} alt="" className="animate-float" />
        </div>
      </header>
      <Divider />
      <section className="mt-48 mb-48 flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-full w-full flex-col items-center justify-between px-[70px] text-center">
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
          <FeaturedProductsCarousel products={fatias ?? []} />
          <section className="mt-48 flex w-full flex-col items-center justify-center gap-16 px-10">
            <div className="flex max-w-2xl flex-col items-center justify-center gap-28 text-center">
              <h1 className="text-chocolate-brown w-lg text-5xl font-bold">
                Conheça todos os nossos sabores
              </h1>
              <span className="text-light-brown text-xl font-bold">
                Explore nossa deliciosa variedade de sabores, feitos com
                ingredientes selecionados e muito carinho. Dos clássicos aos
                mais inovadores, cada mordida é uma experiência única. Escolha o
                seu favorito e aproveite!
              </span>
            </div>
            <div className="flex w-11/12 items-center justify-between">
              <Flavors image="fatias" title="Fatias" />
              <Flavors image="bolo" title="Bolos" />
              <Flavors image="torta" title="Tortas" />
            </div>
          </section>
        </div>
      </section>
      <Divider />
      <section className="mt-48 flex h-full w-full flex-col items-center justify-center px-10">
        <div className="flex max-w-2xl flex-col items-center justify-center gap-28 text-center">
          <h1 className="text-chocolate-brown w-lg text-5xl font-bold">
            Por que escolher a Suweets?
          </h1>
          <span className="text-light-brown text-xl font-bold">
            Na Suweets, cada doce é feito com dedicação e ingredientes
            selecionados para garantir sabor, qualidade e uma experiência única.
            Mais do que bolos, criamos momentos especiais que adoçam a sua vida!
          </span>
        </div>
        <div className="mt-32 flex w-full flex-col items-center justify-between gap-[119px] px-[70px]">
          <div className="flex w-full justify-between">
            <img src={Pie} alt="" className="rounded-[500px]" />
            <div className="flex flex-col items-end justify-end gap-5 text-right">
              <h1 className="text-chocolate-brown w-lg text-5xl font-extrabold">
                Além do que você imagina
              </h1>
              <span className="text-light-brown w-2xl text-xl font-bold">
                A Suweets oferece bolos artesanais e tortas irresistíveis,
                feitas com ingredientes selecionados. De bolos clássicos a
                tortas recheadas, cada doce é preparado com carinho para tornar
                seus momentos ainda mais especiais!{" "}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col items-start justify-end gap-5 text-left">
              <h1 className="text-chocolate-brown w-lg text-5xl font-extrabold">
                Ingredientes selecionados
              </h1>
              <span className="text-light-brown w-2xl text-xl font-bold">
                Usamos apenas os melhores ingredientes, selecionados com
                cuidado, para garantir o máximo de sabor, frescor e qualidade em
                cada bolo. Nosso compromisso é oferecer experiências
                irresistíveis em cada mordida!
              </span>
            </div>
            <img src={Ingredients} alt="" className="rounded-[500px]" />
          </div>
          <div className="mb-20 flex w-full justify-between">
            <img src={Bolo} alt="" className="rounded-[500px]" />
            <div className="flex flex-col items-end justify-end gap-5 text-right">
              <h1 className="text-chocolate-brown w-lg text-5xl font-extrabold">
                Feito com amor
              </h1>
              <span className="text-light-brown w-2xl text-xl font-bold">
                Cada bolo e torta é preparado artesanalmente, com dedicação e
                atenção a cada detalhe. Do preparo à finalização, garantimos
                sabores autênticos e uma experiência única em cada mordida!
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
