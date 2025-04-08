import { ChevronDown, ShoppingCart } from "lucide-react";
import { Outlet } from "react-router";

export default function Header() {
  return (
    <div className="flex h-screen flex-col">
      <div className="fixed z-20 flex w-full items-center justify-center">
        <header className="bg-cream flex h-[49px] w-[670px] items-center justify-between rounded-b-4xl">
          <nav className="text-chocolate-brown flex w-full items-center justify-center gap-6 text-base font-bold">
            <div className="flex items-center gap-2">
              <a href="#">Produtos</a>
              <ChevronDown />
            </div>
            |
            <div className="flex items-center gap-2">
              <a href="#">Catálogo</a>
              <ChevronDown />
            </div>
            |
            <div>
              <a href="#">Contato</a>
            </div>
            |
            <div>
              <a href="#">Sobre nós</a>
            </div>
          </nav>
          <div className="relative right-10">
            <ShoppingCart
              color="#5e2c15"
              className="relative cursor-pointer"
              size={30}
            />
            <p className="bg-light-cream absolute top-0 right-0 translate-x-3 rounded-[100%] p-0.5 px-1.5 text-xs font-bold">
              2
            </p>
          </div>
        </header>
      </div>
      <div className="bg-cream flex size-full flex-col">
        <Outlet />
      </div>
    </div>
  );
}
