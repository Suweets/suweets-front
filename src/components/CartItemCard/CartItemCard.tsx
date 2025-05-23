import { Trash2 } from "lucide-react";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { CartItemType } from "../../contexts/cartContext";
import chocolate_cake from "../../assets/cake4 2.svg";

interface CartItemCardProps {
  item: CartItemType;
  onRemove: (productId: string | number) => void;
  onQuantityChange: (productId: string | number, newQuantity: number) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onQuantityChange,
}: CartItemCardProps) {
  const subtotal = item.valor * item.quantity;

  const handleIncrease = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const imageSource = item.imageUrl || chocolate_cake;
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center md:justify-between md:gap-6 md:p-5">
      <div className="flex w-full items-center gap-3 md:w-auto md:flex-none">
        <div className="flex-shrink-0">
          <img
            src={imageSource}
            alt={item.nome}
            className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24 md:h-[70px] md:w-[70px]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = chocolate_cake;
            }}
          />
        </div>
        <div className="flex flex-grow flex-col items-start text-left">
          <h3 className="text-chocolate-brown text-sm leading-tight font-bold sm:text-base md:text-base">
            {item.nome}
          </h3>
          <button
            onClick={() => onRemove(item.id)}
            className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600 hover:text-red-800 sm:text-xs"
            aria-label={`Remover ${item.nome} do carrinho`}
          >
            <Trash2 size={12} /> Remover
          </button>
        </div>
      </div>

      <div className="text-chocolate-brown flex w-full flex-col items-stretch gap-3 text-xs sm:flex-row sm:items-center sm:justify-around md:w-auto md:flex-row md:items-center md:justify-end md:gap-5 lg:gap-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-base-gray">Preço unitário (R$)</p>
          <p className="text-sm font-semibold md:text-base">R$ {item.valor}</p>
        </div>

        {/* Quantidade */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base-gray mb-0.5">Quantidade</p>
          <QuantitySelector
            quantity={item.quantity}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            size="sm"
          />
        </div>

        {/* Subtotal */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base-gray">Subtotal (R$)</p>
          <p className="text-sm font-bold md:text-base">R$ {subtotal}</p>
        </div>
      </div>
    </div>
  );
}
