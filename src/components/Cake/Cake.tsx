import { Plus } from "lucide-react";
import chocolate_cake from "../../assets/cake4 2.svg";

interface CakeProps {
  nome?: string;
  descricao?: string;
  valor?: string;
  isCatalog?: boolean;
  className?: string;
}

export default function Cake({
  isCatalog,
  nome,
  descricao,
  valor,
  className = "",
}: CakeProps) {
  return (
    <>
      <div
        className={`bg-caramel shadow-cakeShadow relative z-50 flex h-fit w-80 flex-col items-center justify-center gap-2 rounded-4xl ${className}`}
      >
        <img src={chocolate_cake} alt="" className="-translate-y-15" />
        <div className="flex h-full w-56 -translate-y-14 flex-col justify-start">
          <h1 className="text-light-cream text-xl font-bold">
            {nome || "Bolo de Chocolate"}
          </h1>
          <span className="text-light-cream text-[13px] font-medium">
            {descricao ||
              "Delicioso bolo de chocolate com cobertura de brigadeiro."}
          </span>
        </div>
        <div
          className="bg-light-cream border-caramel shadow-cakeShadow absolute right-0 bottom-0 flex h-16 w-40 translate-y-9 items-center justify-center border-10 text-center"
          style={{ borderRadius: "100px 0px 16px 35px" }}
        >
          <span className="text-chocolate-brown font-bold">
            R$ {valor || "15,90"}
          </span>
        </div>
        {isCatalog && (
          <div
            className="bg-light-cream border-caramel shadow-cakeShadow absolute bottom-0 left-0 flex h-16 w-20 translate-y-9 items-center justify-center border-10 text-center"
            style={{ borderRadius: "0px 100px 35px 50px" }}
          >
            <span className="text-chocolate-brown flex items-center justify-center text-center">
              <button className="cursor-pointer">
                <Plus />
              </button>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
