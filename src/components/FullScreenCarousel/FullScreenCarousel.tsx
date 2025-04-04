import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "../Carousel/Carousel";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface FullScreenCarouselProps {
  imageUrls: string[];
  initialIndex: number;
  onClose: () => void;
}

const FullScreenCarousel: React.FC<FullScreenCarouselProps> = ({
  imageUrls,
  initialIndex,
  onClose,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (api) {
      api.on("select", handleSelect);
      api.scrollTo(initialIndex, true);
    }
    return () => {
      if (api) {
        api.off("select", handleSelect);
      }
    };
  }, [api, initialIndex, handleSelect]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm overflow-x-auto"
      onClick={onClose}
      ref={containerRef}
    >
      {/* Botão de Fechar */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-gray-700 rounded-full z-50"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Fechar</span>
      </Button>

      {/* Carrossel de Imagens */}
      <Carousel setApi={setApi} opts={{ loop: true, startIndex: initialIndex }}>
        <CarouselContent>
          {imageUrls.map((url, index) => (
            <ShadcnCarouselItem
              key={index}
              className="flex justify-center items-center w-screen h-screen"
            >
              <img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="object-contain w-auto h-3/5 max-w-full"
                loading="lazy"
              />
            </ShadcnCarouselItem>
          ))}
        </CarouselContent>

        {/* Controles de Navegação */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <CarouselPrevious className="opacity-50 hover:opacity-100 transition text-white" />
          <CarouselNext className="opacity-50 hover:opacity-100 transition text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default FullScreenCarousel;
