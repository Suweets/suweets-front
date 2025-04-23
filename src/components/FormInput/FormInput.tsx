type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface FormInputProps extends InputProps {
  label?: string;
}

export default function FormInput({ label, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-chocolate-brown font-bold">{label}</label>
      <input
        className="bg-light-cream border-base-gray shadow-grayShadow text-chocolate-brown w-full rounded-3xl border-2 p-3 text-sm outline-none"
        {...props}
      />
    </div>
  );
}
