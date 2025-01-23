import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useInView } from "react-intersection-observer";

interface CarouselItemProps {
  folderName: string;
  imageUrls: string[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  folderName,
  imageUrls,
}) => {
  const [autoPlay, setAutoPlay] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Define 50% do carrossel visível como o gatilho
  });

  useEffect(() => {
    setAutoPlay(inView);
  }, [inView]);

  return (
    <div ref={ref} className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{folderName}</h2>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={autoPlay} // Controla o autoPlay com base no estado
        interval={3000}
      >
        {imageUrls.map((url, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={url}
              alt={`${folderName} - Imagem ${index + 1}`}
              loading="lazy"
              className="w-full h-auto object-contain max-h-96 max-w-max"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselItem;
