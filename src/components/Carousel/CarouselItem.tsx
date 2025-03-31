// CarouselItem.tsx
import React, { useState } from "react"; // Import useState
import {
  Carousel,
  CarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./Carousel.tsx";
import FullScreenCarousel from "../FullScreenCarousel/FullScreenCarousel.tsx"; // Import the new component

interface CarouselItemProps {
  folderName: string;
  imageUrls: string[];
  showTitle: boolean;
  textPosition: "below" | "side";
  descriptions?: { [key: string]: string };
}

const CarouselItems: React.FC<CarouselItemProps> = ({
  folderName,
  imageUrls,
  showTitle = true,
  textPosition = "below",
  descriptions = {},
}) => {
  const description = descriptions[folderName] || "";
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openFullScreen = (index: number) => {
    setSelectedImageIndex(index);
    setFullScreenOpen(true);
  };

  const closeFullScreen = () => {
    setFullScreenOpen(false);
  };

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
              <ShadcnCarouselItem
                key={index}
                className="w-full aspect-square relative"
              >
                <div
                  className="h-full w-full flex justify-center items-center cursor-pointer"
                  onClick={() => openFullScreen(index)} // Open fullscreen on image click
                >
                  <img
                    src={url}
                    alt={`${folderName} - Imagem ${index + 1}`}
                    loading="lazy"
                    className="object-contain w-full h-auto"
                  />
                </div>
              </ShadcnCarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white" />
        </Carousel>
      </div>

      {textPosition === "below" && (
        <div className="px-4 mt-4">
          <p className="text-center">{description}</p>
        </div>
      )}

      {/* FullScreenCarousel */}
      {fullScreenOpen && (
        <FullScreenCarousel
          imageUrls={imageUrls}
          initialIndex={selectedImageIndex}
          onClose={closeFullScreen}
        />
      )}
    </div>
  );
};

export default CarouselItems;
