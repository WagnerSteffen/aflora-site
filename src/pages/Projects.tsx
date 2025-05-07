import { useState, useEffect } from "react";
import CarouselItem from "../components/Carousel/CarouselItem";

type CarouselData = {
  folderName: string;
  imageUrls: string[];
}[];

const DELIMITER = "/";

const formatFolderNameForId = (folderName: string): string => {
  return folderName.toLowerCase().replace(/\s+/g, "-");
};

const Projects = () => {
  const [carouselsData, setCarouselsData] = useState<CarouselData>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bucketName = "aflora-static-page";
  const mainFolder = "images/oficinaseprojetos/MEA";
  const cacheKey = "carouselsData";
  const cacheExpiration = 60 * 60 * 1000; // 1 hora em milissegundos

  const apresentationText = `
Acreditamos no poder da arte para transformar vidas e comunidades!
Desenhamos oficinas e projetos, para todas as idades, explorando diversas linguagens artísticas, do corpo ao pincel, da música à argila. Através de experiências que inspiram a criatividade, o autoconhecimento e a conexão humana.
* Diversidade: Valorizamos a pluralidade de expressões artísticas e o potencial único de cada indivíduo.
* Conexão: Promovemos o encontro entre pessoas e suas próprias capacidades criativas.
* Consciência: Estimulamos a reflexão sobre o mundo e o papel de cada um na sociedade.
* Sustentabilidade: 
Entre em contato conosco e descubra como podemos desenhar uma experiência para atender às suas necessidades.
`;
  const partes = apresentationText.split("\n");

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
    Deslocamentos: "Deslocamentos MEA, 2024",
    "Oficina APAE":
      "Oficina de Montagem de Brinquedos com Materiais Reciclados - APAE, 2024",
    "Oficina de Arte Floral": "Oficina de Arte Floral, com Andréia Vogel, 2024",
    "Oficina de Bonecas":
      "Oficina de Bonecas, com Ilária Reis (Ateliê Ilarilariê), 2024",
    "Oficina de Brinquedos":
      "Ofina de Montagem de Brinquedos com Materiais Reciclados - MEA, 2024",
    "Oficina de Ceramica": "Oficina de Cerâmica, com Karen Thiele Campos, 2024",
    "Oficina de Dia das Crianças": "Ofina de Dia das Crianças, MEA, 2024",
    "Oficina de Empanadas": "Oficina de Empanadas, com Gustavo Johann, 2024",
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <h1 className="pt-4 text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
        Projetos e Oficinas
      </h1>
      <div className="mx-4 prose text-justify mb-6 mt-6 lg:mx-[16rem] font-work-sans">
        {partes.map((parte, index) => {
          if (parte.startsWith("* ")) {
            return <li key={index}>{parte.substring(2)}</li>;
          } else {
            return <p key={index}>{parte}</p>;
          }
        })}
      </div>

      {isLoading && (
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      )}

      {!isLoading && carouselsData.length > 0 && (
        <div className="mx-auto">
          {carouselsData.map((carousel, index) => {
            // Verifica se o índice é par ou ímpar para alternar a ordem
            const isEven = index % 2 === 0;
            return (
              <div
                key={carousel.folderName}
                id={formatFolderNameForId(carousel.folderName)}
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  !isEven && "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-1/2">
                  <CarouselItem
                    showTitle={false}
                    textPosition="side"
                    folderName={carousel.folderName}
                    imageUrls={carousel.imageUrls}
                    descriptions={carouselTexts}
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
