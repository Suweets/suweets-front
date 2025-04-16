import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  variants: {
    variant: {
      primary:
        "bg-terracota shadow-buttonShadow text-cream cursor-pointer rounded-2xl p-3 font-bold transition-colors hover:bg-[#d86a42] active:scale-95 active:shadow-none",
      secondary:
        "text-chocolate-brown hover:text-terracota cursor-pointer font-bold transition-colors ",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type buttonVariants = VariantProps<typeof button>;

interface ButtonProps extends buttonVariants {
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  return <button className={button(props)}>{props.children}</button>;
}
