import React from "react";
import Carousel from "../ui/Carousel.tsx";

interface CarouselItemProps {
  folderName: string;
  imageUrls: string[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  folderName,
  imageUrls,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{folderName}</h2>
      <Carousel
        autoSlide={true} // Controla o autoPlay com base no estado
        autoSlideInterval={3000}
      >
        {imageUrls.map((s) => (
          <img src={s} className="max-h-96" />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
