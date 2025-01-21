import { Img } from "react-image";

const Production = () => {
  const imageUrls = [
    "https://via.placeholder.com/300x400", // Imagem mais alta
    "https://via.placeholder.com/400x300", // Imagem mais larga
    "https://via.placeholder.com/350x350",
    "https://via.placeholder.com/450x300",
    "https://via.placeholder.com/300x450", // Imagem mais alta
    "https://via.placeholder.com/400x400",
    "https://via.placeholder.com/500x300", // Imagem mais larga
    "https://via.placeholder.com/300x300",
    "https://via.placeholder.com/350x450", // Imagem mais alta
    "https://via.placeholder.com/450x400",
  ];

  return (
    <div className="relative min-h-screen bg-white text-black">
      <h1 className="mt-4 pt-4 text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
        Produção de Eventos
      </h1>
      <p className="p-[2rem] text-center font-unbounded">
        Esse é um exemplo de texto para ter uma base de como ficaria
      </p>

      {/* Galeria de Imagens */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative overflow-hidden">
              <Img
                src={url}
                alt={`Imagem ${index + 1}`}
                className="w-full h-auto object-cover border-4 border-white"
                loader={
                  <div className="animate-pulse w-full h-40 bg-gray-300"></div>
                }
                unloader={
                  <p className="text-red-500">Erro ao carregar a imagem.</p>
                } // Mensagem de erro
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Production;
