import { useQuery } from "@tanstack/react-query";
import Cake from "../components/Cake/Cake";
import FormInput from "../components/FormInput/FormInput";
import { getFatias } from "../services/getFatias";
import { useState } from "react";
import { Search, ListFilter, X } from "lucide-react";
import { FatiaType } from "../types/fatias";

export default function Catalogo() {
  const [searchFatia, setSearchFatia] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: fatias, isLoading } = useQuery<FatiaType[]>({
    queryKey: ["fatias"],
    queryFn: getFatias,
  });

  const filteredFatias = fatias
    ?.filter((fatia) => {
      if (selectedCategory) {
        const isInNome = fatia.nome_fatia
          ?.toLowerCase()
          ?.includes(selectedCategory.toLowerCase());
        return isInNome;
      }
      return true;
    })
    .filter((fatia) => {
      const searchTerm = searchFatia.toLowerCase();
      return (
        fatia.nome_fatia.toLowerCase().includes(searchTerm) ||
        fatia.recheio.toLowerCase().includes(searchTerm)
      );
    })
    .filter((fatia) => {
      if (selectedIngredients.length > 0) {
        return selectedIngredients.some(
          (selIng) =>
            fatia.nome_fatia.toLowerCase().includes(selIng.toLowerCase()) ||
            fatia.recheio.toLowerCase().includes(selIng.toLowerCase()),
        );
      }
      return true;
    });

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient],
    );
  };

  const exampleIngredients = [
    "Chocolate",
    "Morango",
    "Maracujá",
    "Creme de Morango",
    "Brigadeiro",
  ];

  return (
    <div className="bg-cream bg-hero-gradient flex flex-col px-4 pb-12 sm:px-6 md:px-10 lg:px-[70px]">
      <div className="mb-4 flex justify-end md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-chocolate-brown text-cream shadow-buttonShadow hover:bg-light-brown flex items-center gap-2 rounded-lg p-3"
          aria-label={isSidebarOpen ? "Fechar filtros" : "Abrir filtros"}
        >
          {isSidebarOpen ? <X size={20} /> : <ListFilter size={20} />}
          <span className="text-sm font-medium">Filtros</span>
        </button>
      </div>

      <section
        className={`mt-0 mb-12 flex w-full flex-col items-start gap-8 md:mt-24 md:flex-row md:gap-10 lg:gap-12 xl:gap-16`}
      >
        <aside
          className={`bg-cream fixed top-0 left-0 z-40 flex h-full w-full flex-col gap-6 overflow-y-auto p-6 transition-transform duration-300 ease-in-out md:p-0 lg:bg-transparent ${isSidebarOpen ? "mt-25 translate-x-0" : "-translate-x-full"} md:relative md:sticky md:top-48 md:h-auto md:w-1/3 md:translate-x-0 lg:w-1/4 xl:w-1/5`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-chocolate-brown absolute top-4 right-4 z-50 md:hidden"
            aria-label="Fechar filtros"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-6 pt-10 md:pt-0">
            <div className="bg-light-cream shadow-grayShadow border-base-gray flex w-full flex-col items-start justify-center gap-3 rounded-2xl border p-5 md:p-6">
              <span className="text-chocolate-brown text-lg font-light">
                Pesquisar:
              </span>
              <FormInput
                className="h-10 w-full"
                type="text"
                placeholder="Nome ou recheio..."
                value={searchFatia}
                onChange={(e) => setSearchFatia(e.target.value)}
              />
            </div>
            <div className="bg-light-cream shadow-grayShadow border-base-gray flex w-full flex-col items-start justify-between gap-4 rounded-2xl border p-5 md:p-6">
              <span className="text-chocolate-brown text-lg font-light">
                Selecione a categoria:
              </span>
              <div className="flex w-full flex-wrap gap-2 text-sm font-bold">
                {["Bolos", "Fatias", "Tortas"].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`shadow-buttonShadow hover:bg-light-brown flex-auto cursor-pointer rounded-lg px-4 py-2 transition-colors active:scale-95 active:shadow-none ${
                      selectedCategory === category
                        ? "bg-terracota text-white"
                        : "bg-chocolate-brown text-light-cream"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-light-cream shadow-grayShadow border-base-gray flex w-full flex-col items-start justify-center gap-3 rounded-2xl border p-5 md:p-6">
              <span className="text-chocolate-brown text-lg font-light">
                Filtrar por ingredientes:
              </span>
              <div className="flex w-full flex-col gap-2">
                {exampleIngredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`ing-${ing.toLowerCase().replace(" ", "-")}`}
                      name={ing}
                      checked={selectedIngredients.includes(ing)}
                      onChange={() => handleIngredientChange(ing)}
                      className="text-terracota focus:ring-terracota h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                    <label
                      className="text-chocolate-brown cursor-pointer text-sm font-light"
                      htmlFor={`ing-${ing.toLowerCase().replace(" ", "-")}`}
                    >
                      {ing}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
        <main className="flex h-full w-full flex-col justify-start gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          <div className="text-chocolate-brown relative z-20 flex w-full flex-col flex-wrap items-start justify-between gap-3 text-sm sm:flex-row sm:items-center md:gap-4">
            <span className="order-2 font-extralight sm:order-1">
              {filteredFatias?.length || 0} produtos encontrados
            </span>
            <span className="bg-chocolate-brown text-cream order-1 rounded-3xl px-6 py-1.5 text-center text-xs font-bold sm:order-2 sm:px-8 sm:text-sm">
              {selectedCategory || "Todos os Produtos"}
            </span>
            <div className="order-3 flex items-center gap-1 font-medium sm:order-3">
              <span>Ordenar por:</span>
              <select className="text-chocolate-brown cursor-pointer rounded bg-transparent p-1 font-extralight focus:outline-none">
                <option value="mais-vendidos">Mais vendidos</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
                <option value="novidades">Novidades</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <div className="col-span-full flex w-full items-center justify-center">
              <p className="text-chocolate-brown text-xl font-bold">
                Carregando delícias...
              </p>
            </div>
          ) : filteredFatias && filteredFatias.length > 0 ? (
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-28">
              {filteredFatias.map((fatia) => (
                <Cake
                  id={fatia.id_fatia}
                  key={fatia.id_fatia}
                  nome={fatia.nome_fatia}
                  descricao={fatia.recheio}
                  valor={fatia.valor}
                  isCatalog={true}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full flex w-full flex-col items-center justify-center py-20 text-center">
              <Search size={48} className="text-chocolate-brown mb-4" />
              <p className="text-chocolate-brown mb-2 text-xl font-bold">
                Nenhuma delícia encontrada!
              </p>
              <p className="text-chocolate-brown font-light">
                Tente ajustar os filtros ou o termo de pesquisa.
              </p>
            </div>
          )}
        </main>
      </section>
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-30 bg-black md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
