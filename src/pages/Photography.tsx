import { Img } from "react-image";

const Photography = () => {
  const path = "../src/assets/images/daia1.jpg";
  return (
    <div>
      <h1 className="mt-4 pt-4 text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
        {" "}
        Uma experiência fotografica
      </h1>
      <p className="p-[2rem] text-center font-unbounded">
        Aqui vai um exemplo de um subtexto de introdução
      </p>
      <Img
        src={path}
        alt={`Imagem xyz`}
        className="w-full h-auto object-cover border-4 border-white"
        loader={<div className="animate-pulse w-full h-40 bg-gray-300"></div>}
        unloader={<p className="text-red-500">Erro ao carregar a imagem.</p>} // Mensagem de erro
      />
    </div>
  );
};

export default Photography;
