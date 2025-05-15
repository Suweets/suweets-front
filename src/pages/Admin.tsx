import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import FormInput from "../components/FormInput/FormInput";
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

export default function Admin() {
  const { data: fatias, isLoading } = useQuery({
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
    <div className="bg-cream flex h-screen flex-col px-[70px]">
      <section className="mt-48 mb-48 flex h-full w-full items-start justify-between gap-28">
        <div className="flex w-1/2 items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-cream shadow-grayShadow border-base-gray relative mt-20 flex h-fit w-[700px] flex-col items-center rounded-3xl border-2 px-14 py-3"
          >
            <p className="text-chocolate-brown mb-4 text-xl font-bold">
              Registre uma fatia
            </p>
            <div className="mt-6 mb-10 flex h-full w-full items-start justify-between gap-24">
              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput label="Nome *" {...register("nome")} />
                {errors.nome && (
                  <span className="text-xs text-red-500">
                    {errors.nome.message}
                  </span>
                )}

                <FormInput label="Massa *" {...register("massa")} />
                {errors.massa && (
                  <span className="text-xs text-red-500">
                    {errors.massa.message}
                  </span>
                )}

                <FormInput label="Recheio *" {...register("recheio")} />
                {errors.recheio && (
                  <span className="text-xs text-red-500">
                    {errors.recheio.message}
                  </span>
                )}

                <FormInput label="Cobertura *" {...register("cobertura")} />
                {errors.cobertura && (
                  <span className="text-xs text-red-500">
                    {errors.cobertura.message}
                  </span>
                )}
              </div>

              <div className="flex h-full w-1/2 flex-col gap-4">
                <FormInput
                  label="Peso (g) *"
                  type="number"
                  {...register("peso_g")}
                />
                {errors.peso_g && (
                  <span className="text-xs text-red-500">
                    {errors.peso_g.message}
                  </span>
                )}

                <FormInput
                  label="Valor (R$) *"
                  type="number"
                  step="0.01"
                  {...register("valor")}
                />
                {errors.valor && (
                  <span className="text-xs text-red-500">
                    {errors.valor.message}
                  </span>
                )}

                <label className="text-chocolate-brown text-sm font-semibold">
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
                      className="text-sm"
                      placeholder="Selecione os ingredientes"
                    />
                  )}
                />
                {errors.ingredientes && (
                  <span className="text-xs text-red-500">
                    {errors.ingredientes.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-chocolate-brown hover:bg-opacity-90 mt-4 rounded-full px-6 py-2 text-sm text-white transition disabled:opacity-70"
            >
              {mutation.isPending ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </div>
        <div className="flex w-fit items-center justify-center">
          <div className="w-full rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-chocolate-brown text-xl font-bold">
              Fatias cadastradas
            </h2>
            <div className="mt-4 grid max-h-190 grid-cols-2 overflow-y-auto">
              {isLoading ? (
                <p className="text-chocolate-brown text-sm font-light">
                  Carregando fatias...
                </p>
              ) : (
                fatias?.map((fatias: any) => (
                  <Cake
                    key={fatias.id_fatia}
                    nome={fatias.nome_fatia}
                    descricao={fatias.recheio}
                    valor={fatias.valor}
                    isCatalog={false}
                    className="scale-65"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
