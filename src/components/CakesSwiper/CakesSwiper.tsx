// components/CakeSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Cake from "../Cake/Cake";

const cakes = [
  {
    title: "Bolo de Chocolate Amargo",
    desc: "Bolo de chocolate amargo com um cremoso ganache",
    price: "24,90 R$",
    img: "/images/chocolate.png",
  },
  {
    title: "Bolo de Morango Trufado",
    desc: "Bolo de morango trufado com recheio de creme de morango",
    price: "32,90 R$",
    img: "/images/morango1.png",
  },
  {
    title: "Bolo de Morango Trufado",
    desc: "Bolo de morango trufado com recheio de creme de morango",
    price: "32,90 R$",
    img: "/images/morango2.png",
  },
  {
    title: "Bolo de Morango Trufado",
    desc: "Bolo de morango trufado com recheio de creme de morango",
    price: "32,90 R$",
    img: "/images/morango2.png",
  },
];

export default function CakesSwiper() {
  return (
    <div className="mx-auto h-1/2 py-10">
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cakes.map((cake, index) => (
          <SwiperSlide key={index}>
            <div className="mx-auto flex h-fit w-full items-center justify-center rounded-3xl">
              <Cake />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
