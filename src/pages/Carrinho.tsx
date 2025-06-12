// src/pages/CarrinhoPage.tsx
import { Link, useNavigate } from "react-router";
import { ShoppingBag, Loader2 } from "lucide-react";
import CartItemCard from "../components/CartItemCard/CartItemCard";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import ProductCarousel from "../components/ProductCarrousel/ProductCarrousel";
import { useCart } from "../contexts/cartContext";
import { useUser } from "../contexts/userContext";
import { useQuery } from "@tanstack/react-query";
import { FatiaType } from "../types/fatias";
import { getFatias } from "../services/getFatias";

export default function CarrinhoPage() {
  const { data: fatias } = useQuery<FatiaType[]>({
    queryKey: ["fatias"],
    queryFn: getFatias,
  });

  const {
    cartItems,
    removeItemFromCart,
    updateItemQuantity,
    getCartSubtotal,
    getCartTotalItems,
    isLoadingCart,
  } = useCart();

  const { user, isLoading: isLoadingUser } = useUser();
  const navigate = useNavigate();

  const subtotal = getCartSubtotal();
  const total = subtotal;
  const itemCount = getCartTotalItems();

  const handleCheckout = () => {
    if (!user && !isLoadingUser) {
      alert("Por favor, faça login para finalizar a compra.");
      navigate("/login", { state: { from: "/carrinho" } });
      return;
    }
    console.log("Prosseguir para o checkout com os itens:", cartItems);
  };

  if (isLoadingCart || isLoadingUser) {
    return (
      <div className="bg-cream flex min-h-[calc(100vh-var(--header-height,100px))] items-center justify-center p-6">
        <Loader2 className="text-chocolate-brown h-12 w-12 animate-spin" />
        <p className="text-chocolate-brown ml-4 text-xl">
          A carregar carrinho...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <ShoppingBag className="text-chocolate-brown" size={32} />
          <h1 className="text-chocolate-brown text-3xl font-bold">
            Carrinho de compra
          </h1>
        </div>
        {cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-8 py-20 text-center shadow-md">
            <ShoppingBag size={64} className="text-base-gray mx-auto mb-6" />
            <p className="text-chocolate-brown mb-3 text-xl font-semibold">
              O seu carrinho está vazio!
            </p>
            <p className="text-base-gray mb-8">
              Adicione algumas delícias do nosso catálogo para continuar.
            </p>
            <Link
              to="/catalogo"
              className="bg-terracota shadow-buttonShadow text-cream cursor-pointer rounded-xl px-8 py-3 font-bold transition-colors hover:bg-[#d86a42] active:scale-95 active:shadow-none"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-8 lg:flex-row xl:gap-12">
            <div className="w-full space-y-6 lg:w-2/3">
              {cartItems.map((item) => (
                <CartItemCard
                  item={item}
                  key={item.id}
                  onRemove={removeItemFromCart}
                  onQuantityChange={updateItemQuantity}
                />
              ))}
            </div>
            <div className="w-full lg:w-1/3">
              <OrderSummary
                subtotal={subtotal}
                total={total}
                itemCount={itemCount}
              />
            </div>
          </div>
        )}
        <ProductCarousel
          products={fatias}
          id_fatia={""}
          nome_fatia={""}
          recheio={""}
          valor={0}
        />
      </main>
    </div>
  );
}
