import { useNavigate } from "react-router";
import { useUser, UserType } from "../contexts/userContext";
import Button from "../components/Button/Button";
import FormInput from "../components/FormInput/FormInput";
import strawberryImg from "../assets/strawberry.svg";
import {
  LogOut,
  Edit3,
  User,
  ShieldCheck,
  Phone,
  FileText,
  UserCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfileService } from "../services/editUser";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";

const profileSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sobrenome: z.string().optional(),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  cpf: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const EditProfileModal = ({
  isOpen,
  onOpenChange,
  user,
  token,
  setUserState,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
  token: string | null;
  setUserState: (user: UserType | null) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nome: user.nome.split(" ")[0] || "",
      sobrenome: user.nome.split(" ").slice(1).join(" ") || "",
      email: user.email,
      telefone: user.telefone || "",
      cpf: user.cpf || "",
    },
  });

  useEffect(() => {
    if (user && isOpen) {
      const nomeCompleto = user.nome.split(" ");
      const nome = nomeCompleto[0] || "";
      const sobrenome = nomeCompleto.slice(1).join(" ") || "";
      reset({
        nome: nome,
        sobrenome: sobrenome,
        email: user.email,
        telefone: user.telefone || "",
        cpf: user.cpf || "",
      });
    }
  }, [user, isOpen, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormData) => {
      const payload = {
        nome: data.nome,
        sobrenome: data.sobrenome || undefined,
        telefone: data.telefone || undefined,
        cpf: data.cpf || undefined,
      };
      return updateUserProfileService({
        userId: user.id,
        userData: payload,
        token,
      });
    },
    onSuccess: (data) => {
      if (data.user) {
        setUserState(data.user);
        toast.success(data.message || "Perfil atualizado com sucesso!");
      }
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.error("Erro ao atualizar perfil:", error);
      toast.error(
        error.response?.data?.message || "Não foi possível atualizar o perfil.",
      );
    },
  });

  const onFormSubmit = (formData: ProfileFormData) => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-cream sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-chocolate-brown text-2xl">
            Editar Perfil
          </DialogTitle>
          <DialogDescription className="text-base-gray">
            Faça alterações no seu perfil aqui. Clique em guardar quando
            terminar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 pt-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <FormInput label="Nome *" {...register("nome")} />
              {errors.nome && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.nome.message}
                </p>
              )}
            </div>
            <div>
              <FormInput label="Sobrenome" {...register("sobrenome")} />
            </div>
            <div>
              <FormInput
                label="Email"
                {...register("email")}
                type="email"
                disabled
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <FormInput
                label="Telefone"
                {...register("telefone")}
                type="tel"
                placeholder="(00) 90000-0000"
              />
              {errors.telefone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.telefone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <FormInput
                label="CPF"
                {...register("cpf")}
                placeholder="000.000.000-00"
              />
              {errors.cpf && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.cpf.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <button
                type="button"
                disabled={updateProfileMutation.isPending}
                className="text-chocolate-brown hover:text-terracota cursor-pointer font-bold transition-colors"
              >
                Cancelar
              </button>
            </DialogClose>
            <Button
              variant="primary"
              type="submit"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {updateProfileMutation.isPending
                ? "A guardar..."
                : "Guardar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function UserPage() {
  const { user, logout, isLoading, setUserState, token } = useUser();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  console.log(
    "UserPage RENDER - isEditModalOpen:",
    isEditModalOpen,
    "isLoading:",
    isLoading,
    "User:",
    user ? user.nome : "null",
  );

  useEffect(() => {
    if (!isLoading && !user) {
      console.log(
        "UserPage EFFECT: No user and not loading, redirecting to /login",
      );
      toast.info("Por favor, faça login para aceder ao seu perfil.");
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  if (isLoading || !user) {
    return (
      <div className="bg-light-brown flex min-h-screen items-center justify-center">
        <Loader2 className="text-chocolate-brown mr-3 h-8 w-8 animate-spin" />
        <p className="text-chocolate-brown text-xl">Carregando perfil...</p>
      </div>
    );
  }

  const primeiroNome = user.nome.split(" ")[0];

  return (
    <>
      <div className="bg-light-brown flex min-h-screen flex-col items-center justify-center p-4 py-10 sm:p-6 md:p-8">
        <div className="bg-cream border-base-gray relative w-full max-w-2xl rounded-3xl border-2 p-6 py-8 shadow-xl sm:p-8 md:p-10 lg:px-12 lg:py-12">
          <img
            src={strawberryImg}
            alt="Morango decorativo"
            className="absolute top-0 right-0 w-16 translate-x-1/3 -translate-y-1/3 transform sm:w-20 md:w-24 md:translate-x-1/2 md:-translate-y-1/2"
          />
          <div className="flex flex-col items-center">
            <UserCircle2
              className="text-chocolate-brown mb-4"
              size={80}
              strokeWidth={1.5}
            />
            <h1 className="text-chocolate-brown mb-2 text-2xl font-bold sm:text-3xl">
              Olá, {primeiroNome}!
            </h1>
            <p className="text-base-gray mb-8 text-sm">
              Bem-vindo(a) ao seu perfil Suweets.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-base-gray/30 rounded-lg border bg-white/50 p-4">
              <h2 className="text-chocolate-brown mb-3 text-lg font-semibold">
                Minhas Informações
              </h2>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <User size={16} className="text-terracota mr-2" />{" "}
                  <strong className="text-base-gray mr-1">Nome:</strong>{" "}
                  {user.nome}
                </p>
                <p className="flex items-center">
                  <ShieldCheck size={16} className="text-terracota mr-2" />{" "}
                  <strong className="text-base-gray mr-1">Email:</strong>{" "}
                  {user.email}
                </p>
                {user.telefone && (
                  <p className="flex items-center">
                    <Phone size={16} className="text-terracota mr-2" />{" "}
                    <strong className="text-base-gray mr-1">Telefone:</strong>{" "}
                    {user.telefone}
                  </p>
                )}
                {user.cpf && (
                  <p className="flex items-center">
                    <FileText size={16} className="text-terracota mr-2" />{" "}
                    <strong className="text-base-gray mr-1">CPF:</strong>{" "}
                    {user.cpf}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={handleOpenEditModal}
                className="bg-terracota shadow-buttonShadow text-cream flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl p-3 font-bold transition-colors hover:bg-[#d86a42] active:scale-95 active:shadow-none sm:w-auto"
              >
                <Edit3 size={18} /> Editar Perfil
              </button>
            </div>
          </div>
          <div className="border-base-gray/30 mt-10 border-t pt-6">
            <button
              onClick={handleLogout}
              className="bg-pastel-red shadow-buttonShadow text-cream flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl p-3 font-bold transition-colors hover:bg-[#e24d50] active:scale-95 active:shadow-none"
            >
              <LogOut size={18} /> Sair da Conta
            </button>
          </div>
        </div>
      </div>
      {user && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          user={user}
          token={token}
          setUserState={setUserState}
        />
      )}
    </>
  );
}
