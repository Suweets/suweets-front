import { Minus } from "lucide-react";
import Button from "../Button/Button";
import CakesSwiper from "../CakesSwiper/CakesSwiper";

export default function SwipeSection() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-20">
        <div className="flex w-full flex-col gap-30">
          <div className="flex w-full items-center justify-between">
            <Button variant="primary">Visualizar Todos</Button>
            <div className="text-chocolate-brown flex items-center gap-2">
              <Minus className="text-chocolate-brown" size={20} />
              <span className="text-chocolate-brown font-bold">Destaques</span>
            </div>
          </div>
          <div>
            <CakesSwiper />
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
            <CakesSwiper />
          </div>
        </div>
      </div>
    </>
  );
}
