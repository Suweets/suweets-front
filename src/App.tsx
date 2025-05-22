import router from "./router/router";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/userContext";
import { CartProvider } from "./contexts/cartContext";

const queryClient = new QueryClient();

export function App() {
  return (
    <UserProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </UserProvider>
  );
}
