import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  size = "sm",
}: QuantitySelectorProps) {
  const buttonPadding = size === "sm" ? "p-2" : "p-2.5";
  const iconSize = size === "sm" ? 16 : 18;
  const containerHeight = size === "sm" ? "h-9" : "h-10";

  const fontSizeClass = size === "sm" ? "text-sm" : "text-base";
  const numberMinWidthClass = size === "sm" ? "min-w-[3rem]" : "min-w-[3.5rem]";

  return (
    <div
      className={`border-base-gray bg-cream flex items-center justify-center overflow-hidden rounded-full border ${containerHeight}`}
    >
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`text-chocolate-brown hover:bg-light-brown/60 focus:outline-none ${buttonPadding} transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label="Diminuir quantidade"
      >
        <Minus size={iconSize} />
      </button>
      <div className="bg-base-gray/50 h-full w-px"></div>
      <span
        className={`text-chocolate-brown font-semibold ${fontSizeClass} flex items-center justify-center ${numberMinWidthClass}`}
      >
        {quantity}
      </span>
      <div className="bg-base-gray/50 h-full w-px"></div>
      <button
        onClick={onIncrease}
        className={`text-chocolate-brown hover:bg-light-brown/60 focus:outline-none ${buttonPadding} transition-colors`}
        aria-label="Aumentar quantidade"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
