import { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselItem from "../components/ui/carouselItem";
import Layout from "../components/Layout";
import { MouseEvent as ReactMouseEvent } from "react"; // Import MouseEvent from React
import StickyMenu from "../components/StickyMenu";

type CarouselData = {
  folderName: string;
  imageUrls: string[];
};

type CategoryData = {
  categoryName: string;
  carousels: CarouselData[];
  subcategories: CategoryData[]; // Subcategorias are now required
};

const DELIMITER = "/";

const formatFolderNameForId = (folderName: string): string => {
  return folderName.toLowerCase().replace(/\s+/g, "-");
};

const Productions = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bucketName = "aflora-static-page";
  const mainFolder = "images/producaodeeventos";
  const cacheKey = "categoriesData";
  const cacheExpiration = 60 * 60 * 1000;
  const navRef = useRef<HTMLDivElement>(null); // Create a ref for the nav element
  const scrollAmount = 40; // Adjust scroll amount as needed
  const scrollThreshold = 50; // Adjust hover threshold as needed
  let scrollTimeout: NodeJS.Timeout | null = null; // For debouncing scroll

  const categoriesMenuItems = categoriesData.map((category) => ({
    // Assuming you have categoriesData and formatFolderNameForId for categories
    key: category.categoryName,
    to: formatFolderNameForId(category.categoryName),
    label: category.categoryName,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheKey + "_timestamp");

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - Number(cachedTimestamp) < cacheExpiration
      ) {
        setCategoriesData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      try {
        // Fetch categories (first-level folders under mainFolder)
        const categoriesUrl = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${mainFolder}/`;
        const categoriesResponse = await fetch(categoriesUrl);

        if (!categoriesResponse.ok) {
          throw new Error(
            `Failed to fetch categories: ${categoriesResponse.status} ${categoriesResponse.statusText}`,
          );
        }

        const categoriesXml = await categoriesResponse.text();
        const categoriesDoc = new DOMParser().parseFromString(
          categoriesXml,
          "text/xml",
        );

        const categories = await Promise.all(
          Array.from(
            categoriesDoc.querySelectorAll("CommonPrefixes > Prefix"),
          ).map(async (prefixElement) => {
            const categoryPrefix = prefixElement.textContent
              ?.replace(mainFolder + "/", "")
              ?.replace(/\/$/, "");
            if (!categoryPrefix) return null;

            // Check if it's a main category or a subcategory
            if (!categoryPrefix.includes("/")) {
              // Main category: Fetch carousels (subfolders within category)
              const carouselsUrl = `https://storage.googleapis.com/${bucketName}?delimiter=${DELIMITER}&prefix=${mainFolder}/${categoryPrefix}/`;
              const carouselsResponse = await fetch(carouselsUrl);

              if (!carouselsResponse.ok) {
                throw new Error(
                  `Failed to fetch carousels: ${carouselsResponse.status} ${carouselsResponse.statusText}`,
                );
              }

              const carouselsXml = await carouselsResponse.text();
              const carouselsDoc = new DOMParser().parseFromString(
                carouselsXml,
                "text/xml",
              );

              const carousels = await Promise.all(
                Array.from(
                  carouselsDoc.querySelectorAll("CommonPrefixes > Prefix"),
                ).map(async (carouselElement) => {
                  const carouselPrefix = carouselElement.textContent?.trim();
                  if (!carouselPrefix) return null;

                  // Fetch images for carousel
                  const imagesResponse = await fetch(
                    `https://storage.googleapis.com/${bucketName}?prefix=${carouselPrefix}`,
                  );

                  if (!imagesResponse.ok) {
                    throw new Error(
                      `Failed to fetch images: ${imagesResponse.status} ${imagesResponse.statusText}`,
                    );
                  }

                  const imagesXml = await imagesResponse.text();
                  const imagesDoc = new DOMParser().parseFromString(
                    imagesXml,
                    "text/xml",
                  );

                  const imageUrls = Array.from(
                    imagesDoc.querySelectorAll("Contents"),
                  )
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
                    .filter((url) => url !== "") as string[];

                  return {
                    folderName: carouselPrefix.split("/").pop() || "",
                    imageUrls,
                  };
                }),
              );

              return {
                categoryName: categoryPrefix,
                carousels: carousels.filter(
                  (c): c is CarouselData => c !== null,
                ),
                subcategories: [], // No subcategories for main categories
              } as CategoryData; // Now we cast it as CategoryData
            } else {
              return null; // Skip subcategories for now
            }
          }),
        );

        // Filter out null values and assert the type
        const validCategories = categories.filter(
          (c): c is CategoryData => c !== null,
        );

        setCategoriesData(validCategories);
        localStorage.setItem(cacheKey, JSON.stringify(validCategories));
        localStorage.setItem(cacheKey + "_timestamp", Date.now().toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bucketName, mainFolder, cacheExpiration]);

  const categoryDescriptions: { [key: string]: string } = {
    "Corporativo e Institucional": `
No Aflora, desenhamos experiências envolventes e dinâmicas, com olhar criativo e artístico, que permita às pessoas se conectarem com os valores da sua marca e desfrutarem de momentos memoráveis.

Com um olhar atento para cada detalhe, cuidamos de todas as etapas do seu evento (desde a concepção até a execução), transformando suas ideias em eventos únicos e inesquecíveis. 

Deseja  um evento que surpreenda e inspire?
Entre em contato conosco e descubra como podemos transformar sua ideia em realidade.
`,
    "Arte e Cultura": "Descrição para eventos culturais...",
    "Eventos Particulares": "Descrição para eventos particulares...",
  };

  const carouselDescriptions: { [key: string]: string } = {
    Casamento: "Descrição para casamentos...",
    "Festa de 18": "Descrição para festas de 15 anos...",
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
      <div className="relative min-h-screen bg-white text-black p-8">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded text-center mb-4">
          Produção de Eventos
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Esse é um exemplo de subtexto. Aqui pode conter informações diversas
          sobre os tipos de eventos que realizamos.
        </p>

        {/* Sticky Navigation */}
        <StickyMenu
          navRef={navRef} // Use navRef para o componente StickyMenu
          style={{ top: "64px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          menuItems={categoriesMenuItems} // Use categoriesMenuItems que você já definiu
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
