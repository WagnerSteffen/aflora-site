import { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "../components/Carousel/CarouselItem";
import Layout from "../components/Layout";
import { MouseEvent as ReactMouseEvent } from "react";
import StickyMenu from "../components/StickyMenu";

type CarouselData = {
  folderName: string;
  imageUrls: string[];
};

type CategoryData = {
  categoryName: string;
  carousels: CarouselData[];
  subcategories: string[]; // Changed to string array
};

const DELIMITER = "/";
const BUCKET_NAME = "aflora-static-page";
const MAIN_FOLDER = "images/producaodeeventos";
const CACHE_KEY = "categoriesData";
const CACHE_EXPIRATION = 60 * 60 * 1000;

const formatFolderNameForId = (folderName: string): string => {
  return folderName.toLowerCase().replace(/\s+/g, "-");
};

// Extracts the parent folder name from a URL.
function parentNameExtractor(url: string): string | null {
  const match = url.match(/\/([^/]+)\/[^/]+\/?$/);
  return match ? match[1] : null;
}

// --- Helper Functions (for fetching data) ---

async function fetchDataFromGCS(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
}

async function fetchAndParseXML(url: string): Promise<Document> {
  const xmlText = await fetchDataFromGCS(url);
  return new DOMParser().parseFromString(xmlText, "text/xml");
}

function extractImageUrls(doc: Document, bucketName: string): string[] {
  return Array.from(doc.querySelectorAll("Contents"))
    .filter((content) => {
      const key = content.querySelector("Key")?.textContent;
      return key && !key.endsWith("/");
    })
    .map((content) => {
      const key = content.querySelector("Key")?.textContent;
      return key ? `https://storage.googleapis.com/${bucketName}/${key}` : "";
    })
    .filter((url) => url !== "") as string[];
}
//Modified fetchCarousels
async function fetchCarousels(
  bucketName: string,
  categoryPrefix: string,
): Promise<CarouselData[]> {
  const carouselsUrl = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${MAIN_FOLDER}/${categoryPrefix}/`;
  const carouselsDoc = await fetchAndParseXML(carouselsUrl);

  const carousels = await Promise.all(
    Array.from(carouselsDoc.querySelectorAll("CommonPrefixes > Prefix")).map(
      async (carouselElement) => {
        const carouselPrefix = carouselElement.textContent?.trim();
        if (!carouselPrefix) return null;

        const imagesUrl = `https://storage.googleapis.com/${bucketName}?prefix=${carouselPrefix}`;
        const imagesDoc = await fetchAndParseXML(imagesUrl);
        const imageUrls = extractImageUrls(imagesDoc, bucketName);

        // Use parentNameExtractor here
        const folderName =
          imageUrls.length > 0 ? parentNameExtractor(imageUrls[0]) : null;

        return {
          folderName: folderName || "", // Use extracted name, fallback to empty string
          imageUrls,
        };
      },
    ),
  );
  return carousels.filter((c): c is CarouselData => c !== null);
}

// Modified fetchCategories
async function fetchCategories(
  bucketName: string,
  mainFolder: string,
): Promise<CategoryData[]> {
  const categoriesUrl = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${mainFolder}/`;
  const categoriesDoc = await fetchAndParseXML(categoriesUrl);

  const categories = await Promise.all(
    Array.from(categoriesDoc.querySelectorAll("CommonPrefixes > Prefix")).map(
      async (prefixElement) => {
        const categoryPrefix = prefixElement.textContent
          ?.replace(mainFolder + "/", "")
          ?.replace(/\/$/, "");
        if (!categoryPrefix || categoryPrefix.includes("/")) {
          return null; // Skip subcategories or invalid prefixes
        }

        const carousels = await fetchCarousels(bucketName, categoryPrefix);

        // Extract subcategories from carousels
        const subcategories = carousels
          .map((carousel) => carousel.folderName)
          .filter((name) => !!name);

        return {
          categoryName: categoryPrefix,
          carousels: carousels,
          subcategories: subcategories, // Use the extracted subcategories
        } as CategoryData;
      },
    ),
  );

  return categories.filter((c): c is CategoryData => c !== null);
}

const Productions = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 40;
  const scrollThreshold = 50;
  let scrollTimeout: NodeJS.Timeout | null = null;

  const categoriesMenuItems = categoriesData.map((category) => ({
    key: category.categoryName,
    to: formatFolderNameForId(category.categoryName),
    label: category.categoryName,
  }));

  useEffect(() => {
    const fetchDataAndCache = async () => {
      setIsLoading(true);

      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CACHE_KEY + "_timestamp");

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - Number(cachedTimestamp) < CACHE_EXPIRATION
      ) {
        setCategoriesData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      try {
        const validCategories = await fetchCategories(BUCKET_NAME, MAIN_FOLDER);
        setCategoriesData(validCategories);
        localStorage.setItem(CACHE_KEY, JSON.stringify(validCategories));
        localStorage.setItem(CACHE_KEY + "_timestamp", Date.now().toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataAndCache();
  }, []);
  if (categoriesData) {
    console.log(categoriesData);
  }
  const categoryDescriptions: { [key: string]: string } = {
    "Corporativo e Institucional": `
No Aflora, desenhamos experiências envolventes e dinâmicas, com olhar criativo e artístico, que permita às pessoas se conectarem com os valores da sua marca e desfrutarem de momentos memoráveis.

Com um olhar atento para cada detalhe, cuidamos de todas as etapas do seu evento (desde a concepção até a execução), transformando suas ideias em eventos únicos e inesquecíveis.

Deseja um evento que surpreenda e inspire?
Entre em contato conosco e descubra como podemos transformar sua ideia em realidade.
`,
    "Arte e Cultura": `
Transforme seu espaço em um palco de criatividade. No Aflora, criamos vivências artísticas e culturais únicas e personalizadas para empresas, instituições e eventos. Seja uma imersão, um festival, um projeto educativo ou performances artísticas, nossos projetos são pensados para inspirar, engajar e transformar.
Com um olhar atento para cada detalhe, desenhamos experiências que convidam à reflexão, à interação e à descoberta. Utilizando da pluralidade das linguagens artísticas, transformamos espaços em cenários que conectam pessoas e seus propósitos.
Juntos, podemos criar experiências memoráveis que farão a diferença.


Quer transformar seu espaço em um palco de criatividade? Entre em contato conosco e descubra como podemos te ajudar a realizar seus projetos.
`,
    "Eventos Particulares": `
Cada celebração é um momento único e especial!

No Aflora, transformamos o seu desejo em realidade. Com um serviço completo de cerimonial, coreografia e fotografia, cuidamos de cada detalhe para que o seu grande dia seja inesquecível. Do clássico ao rústico, do moderno ao vintage, personalizamos cada evento para que ele reflita a sua história, seus desejos e o seu estilo.
Entre em contato conosco e descubra como podemos desenhar um evento que reflita seus gostos, desejos  e atenda às suas necessidades.
`,
  };

  const carouselDescriptions: { [key: string]: string } = {
    "Cristiane e Eduardo": "Fotografia",
    "Festa de 18":
      "Abertura de pista com a aniversariante e família + fotografia.",
    "Chá de Bebê": "Suporte organização + Mimos personalizados + fotografia",
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const navElement = navRef.current;
    if (!navElement) return;

    clearTimeout(scrollTimeout as NodeJS.Timeout);

    const rect = navElement.getBoundingClientRect();
    const mouseX = e.clientX;

    if (mouseX < rect.left + scrollThreshold) {
      scrollTimeout = setTimeout(() => {
        navElement.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }, 10);
    } else if (mouseX > rect.right - scrollThreshold) {
      scrollTimeout = setTimeout(() => {
        navElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }, 10);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(scrollTimeout as NodeJS.Timeout);
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-white text-black p-8">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded text-center mb-4">
          Produção de Eventos
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Esse é um exemplo de subtexto. Aqui pode conter informações diversas
          sobre os tipos de eventos que realizamos.
        </p>

        <StickyMenu
          navRef={navRef}
          style={{ top: "64px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          menuItems={categoriesMenuItems}
          scrollbarHide={true}
        />

        {isLoading && (
          <div className="text-center">
            <p>Carregando...</p>
          </div>
        )}

        {!isLoading &&
          categoriesData.map((category) => (
            <section
              key={category.categoryName}
              id={formatFolderNameForId(category.categoryName)}
              className="mb-16 scroll-mt-16"
            >
              <h2 className="text-3xl font-bold mb-4 text-center">
                {category.categoryName}
              </h2>
              <p className="mb-8 text-gray-600 max-w-3xl mx-auto text-center">
                {categoryDescriptions[category.categoryName] ||
                  "Descrição da categoria..."}
              </p>
              {category.carousels && category.carousels.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                  {category.carousels.map((carousel) => (
                    <CarouselItem
                      key={carousel.folderName}
                      folderName={carousel.folderName}
                      imageUrls={carousel.imageUrls}
                      showTitle={true}
                      textPosition="below"
                      descriptions={carouselDescriptions}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}

        {!isLoading && categoriesData.length === 0 && (
          <div className="text-center">
            <p>Nenhum conteúdo encontrado.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Productions;
