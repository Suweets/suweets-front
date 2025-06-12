import { useState } from "react";

interface OrderSummaryProps {
  subtotal: number;
  total: number;
  itemCount: number;
}

type PaymentMethod = "dinheiro" | "pix";

export default function OrderSummary({
  subtotal,
  total,
  itemCount,
}: OrderSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const handleWhatsAppCheckout = () => {
    if (!paymentMethod) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }
    const message = `Olá! Gostaria de finalizar meu pedido:
    ${itemCount} produto(s)
    Total: R$ ${total.toFixed(2).replace(".", ",")}
    Forma de Pagamento: ${paymentMethod === "dinheiro" ? "Dinheiro" : "Pix"}
    (Detalhes dos itens seriam adicionados aqui idealmente)
    `;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=11957132161&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-light-cream sticky top-48 rounded-xl p-6 shadow-lg md:p-8">
      <h2 className="text-chocolate-brown mb-6 text-xl font-bold">
        Resumo do pedido
      </h2>
      <div className="text-chocolate-brown mb-6 space-y-3">
        <div className="flex justify-between">
          <span>{itemCount} Produto(s)</span>
          <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
        </div>
        <hr className="border-base-gray my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span>TOTAL</span>
          <span>R$ {total.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-md text-chocolate-brown mb-3 font-semibold">
          Forma de Pagamento
        </h3>
        <div className="flex gap-3">
          {["dinheiro", "pix"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method as PaymentMethod)}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                paymentMethod === method
                  ? "bg-chocolate-brown border-chocolate-brown text-white shadow-md"
                  : "text-chocolate-brown border-base-gray hover:border-chocolate-brown hover:bg-cream bg-white"
              }`}
            >
              {method === "dinheiro" ? "Dinheiro" : "Pix"}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleWhatsAppCheckout}
        className="bg-pistache-green w-full cursor-pointer rounded-lg px-4 py-3 font-bold text-white shadow-md transition-colors hover:bg-emerald-700 hover:shadow-lg"
      >
        Finalizar compra pelo Whatsapp
      </button>
    </div>
  );
}
