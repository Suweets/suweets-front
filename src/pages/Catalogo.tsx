import { useQuery } from "@tanstack/react-query";
import Cake from "../components/Cake/Cake";
import FormInput from "../components/FormInput/FormInput";
import { getFatias } from "../services/getFatias";
import { useState } from "react";

export default function Catalogo() {
  const [searchFatia, setSearchFatia] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: fatias, isLoading } = useQuery({
    queryKey: ["fatias"],
    queryFn: getFatias,
  });

  const filteredByCategory = fatias?.filter(
    (fatia: any) =>
      fatia?.nome_produto
        .toLowerCase()
        .includes(selectedCategory.toLowerCase()) ||
      fatia?.recheio.toLowerCase().includes(selectedCategory.toLowerCase()),
  );

  const filteredFatias = filteredByCategory?.filter(
    (fatia: any) =>
      fatia?.nome_produto.toLowerCase().includes(searchFatia.toLowerCase()) ||
      fatia?.recheio.toLowerCase().includes(searchFatia.toLowerCase()),
  );

  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  // };

  return (
    <div className="bg-cream bg-hero-gradient flex h-screen flex-col px-[70px]">
      <section className="mt-48 mb-48 flex h-full w-full items-start justify-between gap-28">
        <div className="flex w-1/5 flex-col gap-10">
          <div className="bg-light-cream shadow-grayShadow border-base-gray flex h-full w-full flex-col items-start justify-center gap-3 rounded-2xl border py-12 pr-24 pl-7">
            <span className="text-chocolate-brown text-lg font-light">
              Pesquisar:
            </span>
            <FormInput
              className="h-9 w-full"
              type="text"
              placeholder="Pesquisar..."
              onChange={(e) => setSearchFatia(e.target.value)}
            />
          </div>
          <div className="bg-light-cream shadow-grayShadow border-base-gray flex h-full w-full flex-col items-start justify-between gap-3 rounded-2xl border py-12 pr-24 pl-7">
            <span className="text-chocolate-brown text-lg font-light">
              Selecione a categoria:
            </span>
            <div className="text-light-cream flex w-full gap-4 text-sm font-bold">
              <button className="bg-chocolate-brown shadow-buttonShadow hover:bg-light-brown shrink cursor-pointer rounded-l-3xl px-5 py-0.5 transition-colors active:scale-95 active:shadow-none">
                Bolos
              </button>
              <button className="bg-chocolate-brown shadow-buttonShadow hover:bg-light-brown shrink cursor-pointer px-5 py-0.5 transition-colors active:scale-95 active:shadow-none">
                Fatias
              </button>
              <button className="bg-chocolate-brown shadow-buttonShadow hover:bg-light-brown shrink cursor-pointer rounded-r-3xl px-5 py-0.5 transition-colors active:scale-95 active:shadow-none">
                Tortas
              </button>
            </div>
          </div>
          <div className="bg-light-cream shadow-grayShadow border-base-gray flex h-full w-full flex-col items-start justify-center gap-3 rounded-2xl border py-12 pr-24 pl-7">
            <span className="text-chocolate-brown text-lg font-light">
              Filtrar por ingredientes:
            </span>
            <div className="flex w-full flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="todos-ing" name="todos-ing" />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="todos-ing"
                >
                  Todos os ingredientes
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="chocolate" name="chocolate" />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="chocolate"
                >
                  Chocolate
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="maracuja" name="maracuja" />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="maracuja"
                >
                  Maracujá
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="creme-morango"
                  name="creme-morango"
                />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="creme-morango"
                >
                  Creme de Morango
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="brigadeiro" name="brigadeiro" />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="brigadeiro"
                >
                  Brigadeiro
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="morango" name="morango" />
                <label
                  className="text-chocolate-brown text-sm font-light"
                  htmlFor="morango"
                >
                  Morango
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-4/5 flex-col justify-start gap-25">
          <div className="text-chocolate-brown flex w-full justify-between">
            <span className="font-extralight">{fatias.length} Fatias encontradas</span>
            <span className="bg-chocolate-brown text-cream rounded-3xl px-9 py-1.5 font-bold">
              Fatias
            </span>
            <span className="font-medium">
              Ordenar por:
              <span className="font-extralight"> Mais vendidos</span>
            </span>
          </div>
          <div className="grid grid-cols-3 grid-rows-5 gap-30">
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <p className="text-chocolate-brown font-bold">Carregando...</p>
              </div>
            ) : (
              filteredFatias?.map((fatias: any) => (
                <Cake
                  key={fatias.id_fatia}
                  nome={fatias.nome_produto}
                  descricao={fatias.recheio}
                  valor={fatias.valor}
                  isCatalog={true}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
