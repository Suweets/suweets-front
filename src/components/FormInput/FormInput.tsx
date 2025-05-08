import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

interface FormInputProps extends InputProps {
  label?: string;
  className?: string;
}

export default function FormInput({
  label,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-chocolate-brown font-bold">{label}</label>
      )}
      <input
        className={clsx(
          "bg-light-cream border-base-gray shadow-grayShadow text-chocolate-brown w-full rounded-3xl border-2 p-3 text-sm outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
