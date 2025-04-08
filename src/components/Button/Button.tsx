export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-terracota shadow-buttonShadow text-cream cursor-pointer rounded-2xl p-4 font-bold transition-colors hover:bg-[#d86a42] active:shadow-none">
      {children}
    </button>
  );
}
