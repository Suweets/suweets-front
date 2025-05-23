import { Plus } from "lucide-react";
import { useCart, ProductType } from "../../contexts/cartContext";
import chocolate_cake from "../../assets/cake4 2.svg";

interface CakeProps {
  id: string | number;
  nome: string;
  descricao?: string;
  valor: number;
  isCatalog?: boolean;
  className?: string;
  imageUrl?: string;
}

export default function Cake({
  id,
  nome,
  descricao,
  valor,
  isCatalog,
  className = "",
  imageUrl,
}: CakeProps) {
  const { addItemToCart } = useCart();

  console.log(valor);
  const imageSource = imageUrl || chocolate_cake;
  const cakeName = nome || "Bolo Delicioso";
  const displayValor = valor !== undefined ? `R$ ${valor}` : "R$ 0,00";

  const handleAddToCart = () => {
    const productToAdd: ProductType = {
      id,
      nome,
      valor,
      imageUrl,
    };
    addItemToCart(productToAdd);
  };

  return (
    <div
      className={`bg-caramel shadow-cakeShadow relative z-10 flex h-fit w-80 flex-col items-center justify-start rounded-4xl pt-[60px] ${className}`}
    >
      <div className="absolute top-0 left-1/2 flex h-[150px] w-[160px] -translate-x-1/2 -translate-y-[calc(50%-10px)] items-center justify-center">
        <img
          src={imageSource}
          alt={`Imagem de ${cakeName}`}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = chocolate_cake;
          }}
        />
      </div>
      <div className="flex h-full w-56 flex-col justify-start px-4 pt-2 text-center">
        <h1 className="text-light-cream line-clamp-2 min-h-[2.5em] text-xl font-bold">
          {cakeName}
        </h1>
        <span className="text-light-cream mt-1 line-clamp-2 min-h-[2.5em] text-[13px] font-medium">
          {descricao || "Delicioso bolo com ingredientes selecionados."}
        </span>
      </div>
      <div
        className="bg-light-cream border-caramel shadow-cakeShadow absolute right-0 bottom-0 flex h-16 w-40 translate-y-9 transform items-center justify-center border-[4px] text-center"
        style={{ borderRadius: "100px 0px 16px 35px" }}
      >
        <span className="text-chocolate-brown font-bold">{displayValor}</span>
      </div>
      {isCatalog && (
        <div
          className="bg-light-cream border-caramel shadow-cakeShadow absolute bottom-0 left-0 flex h-16 w-20 translate-y-9 transform items-center justify-center border-[4px] text-center"
          style={{ borderRadius: "0px 100px 35px 50px" }}
        >
          <button
            type="button"
            aria-label={`Adicionar ${nome} ao carrinho`}
            className="text-chocolate-brown flex cursor-pointer items-center justify-center text-center"
            onClick={handleAddToCart}
          >
            <Plus size={28} />
          </button>
        </div>
      )}
      <div className="h-16 w-full"></div>{" "}
    </div>
  );
}
