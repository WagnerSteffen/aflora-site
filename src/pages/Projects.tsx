import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "../components/ui/CarouselItem";

type CarouselData = {
  folderName: string;
  imageUrls: string[];
}[];

const DELIMITER = "/";

const Projects = () => {
  const [carouselsData, setCarouselsData] = useState<CarouselData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bucketName = "aflora-static-page";
  const mainFolder = "images/oficinaseprojetos/MEA";
  const cacheKey = "carouselsData";
  const cacheExpiration = 60 * 60 * 1000; // 1 hora em milissegundos

  useEffect(() => {
    const fetchCarouselData = async () => {
      setIsLoading(true);

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheKey + "_timestamp");

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - Number(cachedTimestamp) < cacheExpiration
      ) {
        setCarouselsData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      try {
        const url = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${mainFolder}/`;

        const response = await fetch(url);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const prefixes = Array.from(
          xmlDoc.querySelectorAll("CommonPrefixes > Prefix"),
        );

        const carousels = await Promise.all(
          prefixes.map(async (prefixElement) => {
            if (prefixElement.textContent) {
              const folderName = prefixElement.textContent
                .replace(mainFolder + "/", "")
                .replace("/", "");
              const prefix = `${mainFolder}/${folderName}/`;
              const fetchImageUrls = async (
                bucketName: string,
                prefix: string,
              ) => {
                try {
                  const url = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${prefix}`;
                  const response = await fetch(url);
                  const xmlText = await response.text();
                  const parser = new DOMParser();
                  const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                  const contents = xmlDoc.querySelectorAll("Contents");

                  return Array.from(contents)
                    .filter((content) => {
                      const key = content.querySelector("Key")?.textContent;
                      return key && !key.endsWith("/");
                    })
                    .map((content) => {
                      const key = content.querySelector("Key")?.textContent;
                      return key
                        ? `https://storage.googleapis.com/${bucketName}/${key}`
                        : "";
                    })
                    .filter((url) => url !== "");
                } catch (error) {
                  console.error("Erro ao buscar URLs das imagens:", error);
                  return [];
                }
              };
              const imageUrls = await fetchImageUrls(bucketName, prefix);
              return { folderName, imageUrls };
            }
            return null;
          }),
        );

        const filteredCarousels: CarouselData = carousels.filter(
          (carousel): carousel is { folderName: string; imageUrls: string[] } =>
            carousel !== null,
        );

        setCarouselsData(filteredCarousels);

        localStorage.setItem(cacheKey, JSON.stringify(filteredCarousels));
        localStorage.setItem(cacheKey + "_timestamp", Date.now().toString());
      } catch (error) {
        console.error("Erro ao buscar dados dos carrosséis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarouselData();
  }, [bucketName, mainFolder, cacheExpiration]);

  const carouselTexts: { [key: string]: string } = {
    Deslocamentos: "Texto sobre Deslocamentos...",
    "Oficina APAE": "Texto sobre Oficina APAE...",
    "Oficina de Arte Floral": "Texto sobre Oficina de Arte Floral...",
    "Oficina de Bonecas": "Texto sobre Oficina de Bonecas...",
    "Oficina de Brinquedos": "Texto sobre Oficina de Brinquedos...",
    "Oficina de Ceramica": "Texto sobre Oficina de Cerâmica...",
    "Oficina de Dia das Crianças": "Texto sobre Oficina de Dia das Crianças...",
    "Oficina de Empanadas": "Texto sobre Oficina de Empanadas...",
  };
  return (
    <div className="relative min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
        Projetos e Oficinas
      </h1>
      <p className="text-center mb-4 mt-4">
        Esse é um exemplo de subtexto. Aqui pode conter informações diversas
      </p>

      {isLoading && (
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      )}

      {!isLoading && carouselsData.length > 0 && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {carouselsData.map((carousel, index) => {
            // Verifica se o índice é par ou ímpar para alternar a ordem
            const isEven = index % 2 === 0;
            return (
              <div
                key={carousel.folderName}
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  !isEven && "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2 px-4">
                  <CarouselItem
                    showTitle={false}
                    textPosition="side"
                    folderName={carousel.folderName}
                    imageUrls={carousel.imageUrls}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <p className="text-center">
                    {carouselTexts[carousel.folderName] ||
                      "Texto padrão para este carrossel..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && carouselsData.length === 0 && (
        <div className="text-center">
          <p>Nenhum carrossel encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
