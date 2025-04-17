import Button from "../Button/Button";
import fatias from "../../assets/fatiasImg.png";
import torta from "../../assets/torta.png";
import bolo from "../../assets/bolo.png";

interface FlavorsProps {
  image: "fatias" | "torta" | "bolo";
  title: string;
}

export default function Flavors({ image, title }: FlavorsProps) {
  let imageSrc: string;
  if (image === "fatias") {
    imageSrc = fatias;
  } else if (image === "torta") {
    imageSrc = torta;
  } else {
    imageSrc = bolo;
  }

  return (
    <>
      <div
        className="bg-fatias border-terracota flex h-[372px] w-[320px] flex-col items-center justify-end gap-5 rounded-4xl border-5 bg-cover bg-no-repeat p-10"
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <span className="text-5xl font-bold text-white">{title}</span>
        <Button variant="primary">Saiba mais</Button>
      </div>
    </>
  );
}
