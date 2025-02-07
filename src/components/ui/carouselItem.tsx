import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { useInView } from "react-intersection-observer";

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
  const [autoPlay, setAutoPlay] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setAutoPlay(inView);
  }, [inView]);

  const description = descriptions[folderName] || "Descrição do carrossel...";

  return (
    <div ref={ref} className="mb-8">
      {showTitle && (
        <h3 className="text-xl font-bold mb-2 text-center">{folderName}</h3>
      )}

      <div className="px-4">
        <Carousel autoSlide={autoPlay} autoSlideInterval={3000}>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={url}
                alt={`${folderName} - Imagem ${index + 1}`}
                loading="lazy"
                className="object-contain "
              />
            </div>
          ))}
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
