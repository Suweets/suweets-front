import { tv, type VariantProps } from "tailwind-variants";
import clsx from "clsx";

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

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type buttonVariants = VariantProps<typeof button>;

interface ButtonProps extends NativeButtonProps, buttonVariants {
  children: React.ReactNode;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { className, children, ...variantProps } = props;
  return (
    <button className={clsx(button(variantProps), className)}>
      {children}
    </button>
  );
}
