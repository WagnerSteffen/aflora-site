import Layout from "../components/Layout.tsx";
import { useState, useEffect, useRef } from "react";
import CarouselItem from "../components/Carousel/CarouselItem";
import { MouseEvent as ReactMouseEvent } from "react"; // Import MouseEvent from React
import StickyMenu from "../components/StickyMenu.tsx"; // Certifique-se que o caminho está correto

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
  const navRef = useRef<HTMLDivElement>(null); // Create a ref for the nav element
  const scrollAmount = 40; // Adjust scroll amount as needed
  const scrollThreshold = 50; // Adjust hover threshold as needed
  let scrollTimeout: NodeJS.Timeout | null = null; // For debouncing scroll

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
  const carouselMenuItems = carouselsData.map((carousel) => ({
    key: carousel.folderName,
    to: formatFolderNameForId(carousel.folderName),
    label: carousel.folderName,
  }));

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

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    // Use ReactMouseEvent here
    const navElement = navRef.current;
    if (!navElement) return;

    clearTimeout(scrollTimeout as NodeJS.Timeout); // Clear previous timeout for debouncing

    const rect = navElement.getBoundingClientRect();
    const mouseX = e.clientX;

    if (mouseX < rect.left + scrollThreshold) {
      // Hovering near left edge
      scrollTimeout = setTimeout(() => {
        navElement.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }, 10); // Small delay for smoother scroll - adjust as needed
    } else if (mouseX > rect.right - scrollThreshold) {
      // Hovering near right edge
      scrollTimeout = setTimeout(() => {
        navElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }, 10); // Small delay for smoother scroll - adjust as needed
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(scrollTimeout as NodeJS.Timeout); // Stop scrolling on mouse leave
  };

  return (
    <Layout>
      {" "}
      <div className="relative min-h-screen bg-white text-black p-8">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
          Projetos e Oficinas
        </h1>
        <div className="prose text-justify mb-6 mt-6 lg:mx-[16rem] font-work-sans">
          {partes.map((parte, index) => {
            if (parte.startsWith("* ")) {
              return <li key={index}>{parte.substring(2)}</li>;
            } else {
              return <p key={index}>{parte}</p>;
            }
          })}
        </div>

        {/* Sticky Navigation - Carousels Menu - Agora usando StickyMenu */}
        <StickyMenu
          navRef={navRef} // Use a mesma navRef que já estava sendo usada
          style={{ top: "64px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          menuItems={carouselMenuItems} // Passa o array de menuItems que criamos
          scrollbarHide={true}
        />

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
                  id={formatFolderNameForId(carousel.folderName)}
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
    </Layout>
  );
};

export default Projects;
