import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/Carousel.tsx";

interface CarouselItemProps {
  folderName: string;
  imageUrls: string[];
  showTitle: boolean;
  textPosition: "below" | "side";
  descriptions?: { [key: string]: string };
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  folderName,
  imageUrls,
  showTitle = true,
  textPosition = "below",
  descriptions = {},
}) => {
  const description = descriptions[folderName] || "Descrição do carrossel...";

  return (
    <div className="mb-8">
      {showTitle && (
        <h3 className="text-xl font-bold mb-2 text-center">{folderName}</h3>
      )}

      <div className="px-4">
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <ShadcnCarouselItem key={index} className="w-full aspect-square">
                <div
                  className="
                       h-full w-full flex justify-center items-center"
                >
                  <img
                    src={url}
                    alt={`${folderName} - Imagem ${index + 1}`}
                    loading="lazy"
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              </ShadcnCarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {textPosition === "below" && (
        <div className="px-4 mt-4">
          <p className="text-center">{description}</p>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
