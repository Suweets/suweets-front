import Cake from "../Cake/Cake";
import { ProductRecommendationType } from "../../types/cart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { FatiaType } from "../../types/fatias";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps extends FatiaType {
  products: ProductRecommendationType[] | undefined;
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  if (!products || products.length === 0) return null;
  const showNavigationAndPagination = products.length > 1;
  const cakeImagePopOutPadding = "pt-16";
  return (
    <div className="py-8 md:py-12">
      <h2 className="text-chocolate-brown mb-8 text-center text-2xl font-bold md:text-left">
        Você também pode gostar
      </h2>
      <div className="group relative">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={false}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          navigation={
            showNavigationAndPagination
              ? {
                  nextEl: ".swiper-button-next-custom-carousel",
                  prevEl: ".swiper-button-prev-custom-carousel",
                }
              : false
          }
          pagination={showNavigationAndPagination ? { clickable: true } : false}
          className="pb-12 md:pb-14"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id_fatia}
              className={`flex h-auto justify-center self-stretch pt-28 pb-16 ${cakeImagePopOutPadding}`}
              style={{ overflow: "visible" }}
            >
              <div className="flex w-full justify-center">
                <Cake
                  id={product.id_fatia}
                  nome={product.nome_fatia}
                  descricao={product.recheio}
                  valor={product.valor}
                  imageUrl={product.imageUrl}
                  isCatalog={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {showNavigationAndPagination && (
          <>
            <button
              className="swiper-button-prev-custom-carousel text-chocolate-brown absolute top-[calc(50%+2rem)] left-0 z-10 -translate-x-3 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 md:-translate-x-6"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="swiper-button-next-custom-carousel text-chocolate-brown absolute top-[calc(50%+2rem)] right-0 z-10 translate-x-3 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 md:translate-x-6"
              aria-label="Próximo"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
