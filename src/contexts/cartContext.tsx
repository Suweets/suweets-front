import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

export interface ProductType {
  id: string | number;
  nome: string;
  valor: number;
  imageUrl?: string;
  descricao?: string;
}

export interface CartItemType extends ProductType {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  addItemToCart: (product: ProductType, quantity?: number) => void;
  removeItemFromCart: (productId: string | number) => void;
  updateItemQuantity: (productId: string | number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotalItems: () => number;
  getCartSubtotal: () => number;
  isLoadingCart: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage", error);
      localStorage.removeItem("cartItems");
    } finally {
      setIsLoadingCart(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoadingCart) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoadingCart]);

  const addItemToCart = (product: ProductType, quantityToAdd: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        toast.success(`${product.nome} adicionado ao carrinho!`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      } else {
        toast.success(`${product.nome} adicionado ao carrinho!`);
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const removeItemFromCart = (productId: string | number) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        toast.error(`${itemToRemove.nome} removido do carrinho.`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateItemQuantity = (
    productId: string | number,
    newQuantity: number,
  ) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Carrinho esvaziado.");
  };

  const getCartTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.valor * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        getCartTotalItems,
        getCartSubtotal,
        isLoadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
