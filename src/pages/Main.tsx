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
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4 md:flex-row md:gap-16 lg:gap-52 lg:p-[70px]">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-start lg:ml-30 lg:gap-11">
            <img src={logo} alt="Logo" className="w-48 md:w-56 lg:w-auto" />
            <span className="text-light-cream max-w-sm text-base font-bold md:max-w-md md:text-lg lg:w-[438px] lg:text-[20px]">
              Bolos e tortas feitos com amor, perfeitos e saborosos para
              qualquer momento!
            </span>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:gap-5">
              <Link
                to={"/catalogo"}
                className="bg-terracota shadow-buttonShadow text-cream cursor-pointer rounded-2xl p-3 text-center font-bold transition-colors hover:bg-[#d86a42] active:scale-95 active:shadow-none"
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
          <img
            src={heroImg}
            alt=""
            className="animate-float w-64 md:w-80 lg:w-auto"
          />
        </div>
      </header>
      <Divider />
      <section className="my-16 flex h-full w-full flex-col items-center justify-center md:my-32 lg:my-48">
        <div className="flex h-full w-full flex-col items-center justify-between px-4 text-center md:px-8 lg:px-[70px]">
          <div className="flex max-w-xs flex-col items-center justify-center gap-6 text-center sm:max-w-lg md:max-w-xl lg:max-w-2xl lg:gap-15">
            <h1 className="text-chocolate-brown text-2xl font-bold md:text-4xl lg:text-5xl">
              Destaques da Suweets
            </h1>
            <span className="text-light-brown text-sm font-bold md:text-lg lg:text-xl">
              Nossos bolos e tortas mais pedidos, feitos com ingredientes
              selecionados e muito carinho! Perfeitos para qualquer ocasião,
              seja uma comemoração especial ou um momento de puro prazer.
            </span>
          </div>
          <FeaturedProductsCarousel products={fatias ?? []} />
          <section className="mt-16 flex w-full flex-col items-center justify-center gap-8 px-4 md:mt-32 md:gap-12 lg:mt-48 lg:gap-16 lg:px-10">
            <div className="flex max-w-xs flex-col items-center justify-center gap-8 text-center sm:max-w-lg md:max-w-xl lg:max-w-2xl lg:gap-28">
              <h1 className="text-chocolate-brown w-lg text-2xl font-bold md:text-4xl lg:text-5xl">
                Conheça todos os nossos sabores
              </h1>
              <span className="text-light-brown text-sm font-bold md:text-lg lg:text-xl">
                Explore nossa deliciosa variedade de sabores, feitos com
                ingredientes selecionados e muito carinho. Dos clássicos aos
                mais inovadores, cada mordida é uma experiência única. Escolha o
                seu favorito e aproveite!
              </span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between md:w-11/12">
              <Flavors image="fatias" title="Fatias" />
              <Flavors image="bolo" title="Bolos" />
              <Flavors image="torta" title="Tortas" />
            </div>
          </section>
        </div>
      </section>
      <Divider />
      <section className="mt-16 flex h-full w-full flex-col items-center justify-center px-4 md:mt-32 md:px-8 lg:mt-48 lg:px-10">
        <div className="flex max-w-xs flex-col items-center justify-center gap-8 text-center sm:max-w-lg md:max-w-xl lg:max-w-2xl lg:gap-28">
          <h1 className="text-chocolate-brown w-lg text-2xl font-bold md:text-4xl lg:text-5xl">
            Por que escolher a Suweets?
          </h1>
          <span className="text-light-brown text-sm font-bold md:text-lg lg:text-xl">
            Na Suweets, cada doce é feito com dedicação e ingredientes
            selecionados para garantir sabor, qualidade e uma experiência única.
            Mais do que bolos, criamos momentos especiais que adoçam a sua vida!
          </span>
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-12 px-4 md:mt-16 md:gap-16 md:px-8 lg:mt-32 lg:gap-[119px] lg:px-[70px]">
          <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
            <img
              src={Pie}
              alt=""
              className="w-48 rounded-full md:w-64 lg:w-auto lg:rounded-[500px]"
            />
            <div className="flex flex-col items-center justify-center gap-3 text-center md:items-end md:text-right lg:gap-5">
              <h1 className="text-chocolate-brown w-lg text-xl font-extrabold md:text-3xl lg:text-5xl">
                Além do que você imagina
              </h1>
              <span className="text-light-brown max-w-sm text-sm font-bold md:max-w-md md:text-base lg:w-2xl lg:text-xl">
                A Suweets oferece bolos artesanais e tortas irresistíveis,
                feitas com ingredientes selecionados. De bolos clássicos a
                tortas recheadas, cada doce é preparado com carinho para tornar
                seus momentos ainda mais especiais!{" "}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col-reverse items-center justify-center gap-6 md:flex-row md:justify-between">
            <div className="flex flex-col items-center justify-center gap-3 text-center md:items-start md:text-left lg:gap-5">
              <h1 className="text-chocolate-brown w-lg text-xl font-extrabold md:text-3xl lg:text-5xl">
                Ingredientes selecionados
              </h1>
              <span className="text-light-brown max-w-sm text-sm font-bold md:max-w-md md:text-base lg:w-2xl lg:text-xl">
                Usamos apenas os melhores ingredientes, selecionados com
                cuidado, para garantir o máximo de sabor, frescor e qualidade em
                cada bolo. Nosso compromisso é oferecer experiências
                irresistíveis em cada mordida!
              </span>
            </div>
            <img
              src={Ingredients}
              alt=""
              className="w-48 rounded-full md:w-64 lg:w-auto lg:rounded-[500px]"
            />
          </div>
          <div className="mb-8 flex w-full flex-col items-center justify-center gap-6 md:mb-12 md:flex-row md:justify-between lg:mb-20">
            <img
              src={Bolo}
              alt=""
              className="w-48 rounded-full md:w-64 lg:w-auto lg:rounded-[500px]"
            />
            <div className="flex flex-col items-center justify-center gap-3 text-center md:items-end md:text-right lg:gap-5">
              <h1 className="text-chocolate-brown w-lg text-xl font-extrabold md:text-3xl lg:text-5xl">
                Feito com amor
              </h1>
              <span className="text-light-brown max-w-sm text-sm font-bold md:max-w-md md:text-base lg:w-2xl lg:text-xl">
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
