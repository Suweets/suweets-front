import chocolate_cake from "../../assets/cake4 2.svg";

export default function Cake() {
  return (
    <>
      <div className="bg-caramel shadow-cakeShadow relative z-50 flex h-fit w-80 flex-col items-center justify-center gap-2 rounded-4xl">
        <img src={chocolate_cake} alt="" className="-translate-y-15" />
        <div className="flex h-full w-56 -translate-y-14 flex-col justify-start">
          <h1 className="text-light-cream text-xl font-bold">
            Bolo de Chocolate Amargo
          </h1>
          <span className="text-light-cream text-[13px] font-medium">
            Bolo de chocolate amargo com um cremoso ganache
          </span>
        </div>
        <div
          className="bg-light-cream border-caramel shadow-cakeShadow absolute right-0 bottom-0 flex h-16 w-40 translate-y-9 items-center justify-center border-10 text-center"
          style={{ borderRadius: "100px 0px 16px 35px" }}
        >
          <span className="text-chocolate-brown font-bold">R$ 24,90</span>
        </div>
      </div>
    </>
  );
}
