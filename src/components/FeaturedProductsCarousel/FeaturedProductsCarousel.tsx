import Cake from "../Cake/Cake";
import { ProductRecommendationType } from "../../types/cart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FeaturedProductsCarouselProps {
  products: ProductRecommendationType[];
}

export default function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-base-gray py-8 text-center">
        Nenhum produto em destaque no momento.
      </div>
    );
  }

  const showNavigationAndPagination = products.length > 3;

  const slidePaddingTop = "pt-16";

  const slidePaddingBottom = "pb-10";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="group relative px-4 md:px-0">
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
                  nextEl: ".swiper-button-next-featured",
                  prevEl: ".swiper-button-prev-featured",
                }
              : false
          }
          pagination={showNavigationAndPagination ? { clickable: true } : false}
          className="pb-12 md:pb-14"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id_fatia}
              className={`flex h-auto justify-center self-stretch pt-20 ${slidePaddingTop} ${slidePaddingBottom}`}
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
              className="swiper-button-prev-featured text-chocolate-brown absolute top-1/2 left-0 z-10 -translate-x-2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 md:-translate-x-4"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="swiper-button-next-featured text-chocolate-brown absolute top-1/2 right-0 z-10 translate-x-2 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-30 md:translate-x-4"
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
