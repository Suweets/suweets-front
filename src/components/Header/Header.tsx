import {
  Headset,
  Search,
  ShoppingCart,
  UserCircle2,
  Menu,
  X,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import suweets from "../../assets/SuweetsMini.svg";
import { useUser } from "../../contexts/userContext";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../contexts/cartContext";

const categories = [
  { name: "Bolos de Chocolate", slug: "bolos-de-chocolate" },
  { name: "Bolos Trufados", slug: "bolos-trufados" },
  { name: "Fatias de Bolo", slug: "fatias-de-bolo" },
  { name: "Tortas Salgadas", slug: "tortas-salgadas" },
  { name: "Bolos Salgados", slug: "bolos-salgados" },
];

export default function HeaderLayout() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const { getCartTotalItems, isLoadingCart } = useCart();
  const totalItemsInCart = getCartTotalItems();
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleCategoryNavigation = (slug: string) => {
    navigate(`/catalogo?category=${encodeURIComponent(slug)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-cream flex min-h-screen flex-col">
      <div
        ref={headerRef}
        className="bg-cream fixed top-0 left-0 z-50 flex w-full flex-col items-center shadow-lg"
      >
        <header className="flex w-full max-w-screen-xl items-center justify-between gap-4 p-3 md:p-4 lg:p-5">
          <Link to={"/"} className="shrink-0">
            <img src={suweets} alt="Suweets Logo" className="h-8 md:h-10" />
          </Link>
          <div className="relative mx-4 hidden flex-grow md:flex md:max-w-md lg:max-w-lg">
            <input
              type="text"
              className="border-chocolate-brown text-chocolate-brown placeholder-base-gray w-full border-b-2 bg-transparent py-1.5 text-sm outline-none"
              placeholder="O que você procura?"
            />
            <Search
              className="text-chocolate-brown absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
              size={18}
            />
          </div>
          <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
            <button className="text-chocolate-brown md:hidden">
              <Search size={22} />
            </button>
            <div className="hidden items-center gap-2 md:flex">
              <UserCircle2 className="text-chocolate-brown" size={25} />
              {!user ? (
                <p className="text-chocolate-brown text-xs whitespace-nowrap">
                  <Link
                    to={"/login"}
                    className="hover:text-light-brown font-bold"
                  >
                    Entre
                  </Link>
                  {" ou "}
                  <Link
                    to={"/register"}
                    className="hover:text-light-brown font-bold"
                  >
                    Cadastre
                  </Link>
                </p>
              ) : (
                <Link
                  to={"/perfil"}
                  className="text-chocolate-brown text-sm font-semibold whitespace-nowrap"
                >
                  {user.nome.split(" ")[0]}
                </Link>
              )}
            </div>
            <Link
              to={user ? "/perfil" : "/login"}
              className="text-chocolate-brown md:hidden"
            >
              <UserCircle2 size={25} />
            </Link>
            <Headset
              className="text-chocolate-brown hidden cursor-pointer sm:block"
              size={25}
            />
            <Link
              to="/carrinho"
              className="relative flex items-center justify-center"
            >
              <ShoppingCart
                className="text-chocolate-brown cursor-pointer"
                size={25}
              />
              {!isLoadingCart && totalItemsInCart > 0 && (
                <span className="bg-terracota absolute -top-1.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-chocolate-brown xl:hidden"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </header>
        <nav className="bg-cream text-chocolate-brown border-base-gray/30 hidden w-full items-center justify-center border-t shadow-md xl:flex">
          <div className="flex max-w-screen-lg justify-center gap-6 px-6 py-2.5 text-xs font-medium lg:gap-8 lg:text-sm">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryNavigation(category.slug)}
                className="hover:text-terracota transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[40000] bg-black/30 backdrop-blur-sm xl:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav
            className="bg-cream fixed top-0 right-0 flex h-full w-4/5 max-w-sm flex-col gap-6 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMobileMenu}
              className="text-chocolate-brown self-end"
              aria-label="Fechar menu"
            >
              <X size={28} />
            </button>

            <div className="relative w-full gap-2">
              <input
                type="text"
                className="border-chocolate-brown text-chocolate-brown placeholder-base-gray w-full border-b-2 bg-transparent py-1.5 text-sm outline-none"
                placeholder="O que você procura?"
              />
              <Search
                className="text-chocolate-brown absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                size={18}
              />
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryNavigation(category.slug)}
                  className="text-chocolate-brown hover:text-terracota py-2 text-left text-base font-medium transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>

            <hr className="border-base-gray/30 my-4" />

            {!user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={"/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-brown hover:text-terracota py-2 text-left text-base font-medium"
                >
                  Entre
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-chocolate-brown hover:text-terracota py-2 text-left text-base font-medium"
                >
                  Cadastre-se
                </Link>
              </div>
            ) : (
              <Link
                to={"/perfil"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-chocolate-brown hover:text-terracota cursor-pointer py-2 text-left text-base font-medium"
              >
                {user.nome}
              </Link>
            )}
            <Link
              to={"/sac"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-chocolate-brown hover:text-terracota flex items-center gap-2 py-2 text-left text-base font-medium"
            >
              <Headset size={20} /> Atendimento
            </Link>
          </nav>
        </div>
      )}
      <div
        className="bg-cream flex flex-1 flex-col"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        <Outlet />
      </div>
    </div>
  );
}
