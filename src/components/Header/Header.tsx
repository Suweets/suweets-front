import { Headset, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import { Link, Outlet } from "react-router";
import suweets from "../../assets/SuweetsMini.svg";
import { useUser } from "../../contexts/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <div className="flex h-screen flex-col">
      <div className="fixed z-[50000] flex w-full flex-col items-center justify-center">
        <header className="bg-cream shadow-headerShadow relative flex w-[965px] items-center justify-between gap-4 rounded-b-4xl p-5">
          <Link to={"/"}>
            <img src={suweets} alt="" />
          </Link>
          <div className="relative w-[60%] gap-2">
            <input
              type="text"
              className="border-chocolate-brown text-chocolate-brown w-full border-b-1 text-sm outline-none"
              placeholder="O que você procura?"
            />
            <Search
              className="text-chocolate-brown absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
              size={15}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <UserCircle2 className="text-chocolate-brown" size={25} />
              {!user ? (
                <p className="text-chocolate-brown w-25 text-xs">
                  <Link
                    to={"/login"}
                    className="hover:text-light-brown font-bold"
                  >
                    Entre
                  </Link>{" "}
                  ou{" "}
                  <Link
                    to={"/register"}
                    className="hover:text-light-brown font-bold"
                  >
                    Cadastre
                  </Link>
                </p>
              ) : (
                <p className="text-chocolate-brown w-25 text-base">
                  {user.nome}
                </p>
              )}
            </div>
            <div className="flex items-center gap-5">
              <Headset
                className="text-chocolate-brown cursor-pointer"
                size={25}
              />
              <div className="relative flex items-center justify-center">
                <ShoppingCart
                  className="text-chocolate-brown cursor-pointer"
                  size={25}
                />
                <span className="absolute top-0 right-0 translate-x-2 rounded-full bg-white px-1 text-[9px]">
                  21
                </span>
              </div>
            </div>
          </div>
        </header>
        <div className="bg-cream text-chocolate-brown shadow-headerShadow z-21 flex w-3xl items-center justify-between rounded-b-4xl px-10 py-2 text-xs font-medium">
          <a href="#">Bolos de Chocolate</a>
          <a href="#">Bolos Trufados</a>
          <a href="#">Fatias de Bolo</a>
          <a href="#">Tortas Salgadas</a>
          <a href="#">Bolos Salgados</a>
        </div>
      </div>
      <div className="bg-cream flex size-full flex-col overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}
