import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import FormInput from "../components/FormInput/FormInput"; // Presumo que você estilizará este componente
import { postFatias } from "../services/postFatias";
import { getFatias } from "../services/getFatias";
import Cake from "../components/Cake/Cake";

const cakeSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  massa: z.string().min(1, "Massa obrigatória"),
  recheio: z.string().min(1, "Recheio obrigatório"),
  cobertura: z.string().min(1, "Cobertura obrigatória"),
  peso_g: z.coerce.number().min(1, "Peso obrigatório"),
  valor: z.coerce.number().min(0.01, "Valor obrigatório"),
  ingredientes: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "Selecione ao menos um ingrediente"),
});

type FormData = z.infer<typeof cakeSchema>;

const ingredientesOptions = [
  { label: "Chocolate", value: "Chocolate" },
  { label: "Morango", value: "Morango" },
  { label: "Chocolate Amargo", value: "Chocolate Amargo" },
  { label: "Maracujá", value: "Maracujá" },
  { label: "Ninho", value: "Ninho" },
  { label: "Doce de Leite", value: "Doce de Leite" },
  { label: "Mandioca", value: "Mandioca" },
  { label: "Milho", value: "Milho" },
];

interface FatiaType {
  id_fatia: string | number;
  nome_fatia: string;
  recheio: string;
  valor: number;
}

export default function Admin() {
  const { data: fatias, isLoading } = useQuery<FatiaType[]>({
    queryKey: ["fatias"],
    queryFn: getFatias,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(cakeSchema),
    defaultValues: {
      nome: "",
      massa: "",
      recheio: "",
      cobertura: "",
      peso_g: undefined,
      valor: undefined,
      ingredientes: [],
    },
  });

  const mutation = useMutation({
    mutationFn: postFatias,
    onSuccess: () => {
      toast.success("Fatia cadastrada com sucesso!");
      reset();
    },
    onError: (error) => {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar fatia. Tente novamente.");
    },
  });

  const onSubmit = (data: FormData) => {
    const ingredientesValues = data.ingredientes.map((ing) => ing.value);

    const fatiasData = {
      fatia: {
        nome: data.nome,
        massa: data.massa,
        recheio: data.recheio,
        cobertura: data.cobertura,
        peso_g: data.peso_g,
        valor: data.valor,
      },
      ingredientes: ingredientesValues,
    };

    mutation.mutate(fatiasData);
  };

  return (
    <div className="bg-cream flex flex-col px-8 py-24 md:px-16 lg:px-24">
      <section className="flex flex-1 flex-col items-start justify-center gap-10 lg:flex-row lg:gap-16">
        <div className="flex w-full items-center justify-center lg:w-3/5 xl:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-cream shadow-grayShadow border-base-gray w-full max-w-[700px] rounded-3xl border-2 p-8 sm:p-10"
          >
            <p className="text-chocolate-brown mb-6 text-center text-2xl font-bold">
              {" "}
              Registre uma fatia
            </p>
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:gap-12">
              <div className="flex w-full flex-col gap-4 md:w-1/2">
                <div>
                  <FormInput label="Nome *" {...register("nome")} />
                  {errors.nome && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.nome.message}
                    </span>
                  )}
                </div>
                <div>
                  <FormInput label="Massa *" {...register("massa")} />
                  {errors.massa && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.massa.message}
                    </span>
                  )}
                </div>
                <div>
                  <FormInput label="Recheio *" {...register("recheio")} />
                  {errors.recheio && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.recheio.message}
                    </span>
                  )}
                </div>
                <div>
                  <FormInput label="Cobertura *" {...register("cobertura")} />
                  {errors.cobertura && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.cobertura.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 md:w-1/2">
                <div>
                  <FormInput
                    label="Peso (g) *"
                    type="number"
                    {...register("peso_g")}
                  />
                  {errors.peso_g && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.peso_g.message}
                    </span>
                  )}
                </div>
                <div>
                  <FormInput
                    label="Valor (R$) *"
                    type="number"
                    step="0.01"
                    {...register("valor")}
                  />
                  {errors.valor && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.valor.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-chocolate-brown mb-1 block text-sm font-semibold">
                    Ingredientes *
                  </label>
                  <Controller
                    control={control}
                    name="ingredientes"
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={ingredientesOptions}
                        value={field.value}
                        onChange={field.onChange}
                        className="react-select-container text-sm"
                        classNamePrefix="react-select"
                        placeholder="Selecione os ingredientes"
                      />
                    )}
                  />
                  {errors.ingredientes && (
                    <span className="mt-1 block text-xs text-red-500">
                      {errors.ingredientes.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-chocolate-brown hover:bg-opacity-80 focus:ring-terracota w-full rounded-xl px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.02] focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70 sm:w-auto sm:px-8"
            >
              {mutation.isPending ? "Enviando..." : "Enviar Cadastro"}
            </button>
          </form>
        </div>
        <div className="flex w-full justify-center lg:w-2/5 lg:justify-start xl:w-1/2">
          <div className="w-full max-w-[700px] rounded-xl bg-white p-6 shadow-lg">
            {" "}
            <h2 className="text-chocolate-brown mb-4 text-xl font-bold">
              Fatias cadastradas
            </h2>
            <div className="mt-4 grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto p-1 py-12 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
              {isLoading ? (
                <p className="text-chocolate-brown text-sm font-light">
                  Carregando fatias...
                </p>
              ) : fatias && fatias.length > 0 ? (
                fatias.map((fatia) => (
                  <Cake
                    key={fatia.id_fatia}
                    nome={fatia.nome_fatia}
                    descricao={fatia.recheio}
                    valor={fatia.valor}
                    isCatalog={false}
                    className="scale-80"
                    id={fatia.id_fatia}
                  />
                ))
              ) : (
                <p className="text-chocolate-brown col-span-full text-center text-sm font-light">
                  Nenhuma fatia cadastrada ainda.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
