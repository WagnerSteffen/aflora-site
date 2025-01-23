import { Img } from "react-image";

const Performance = () => {
  return (
    <div>
      <h1 className="mt-4 pt-4 text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] relative z-10 text-center">
        {" "}
        Performance Artística
      </h1>
      <p className="p-[2rem] text-center ">
        Aqui vai um exemplo de um subtexto de introdução de uma Performance
        Artística
      </p>
      <Img
        src={"No Source"}
        alt={`Imagem xyz`}
        className="w-full h-auto object-cover border-4 border-white"
        loader={<div className="animate-pulse w-full h-40 bg-gray-300"></div>}
        unloader={<p className="text-red-500">Erro ao carregar a imagem.</p>} // Mensagem de erro
      />
    </div>
  );
};

export default Performance;
