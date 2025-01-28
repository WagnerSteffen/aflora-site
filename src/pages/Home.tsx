import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  const afloraPin = "../../src/assets/Aflora_color.png";
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Main
      Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16 sm:pt-0">
        {/* Heading */}
        <div className="relative mb-10">
          {" "}
          <div className="flex items-center justify-center">
            <img
              src={afloraPin}
              alt="pin do aflora"
              className="max-h-72 max-w-auto"
            />
          </div>
          <h1 className="text-[4rem] sm:text-6xl md:text-[12rem] lg:text-[6rem] font-lexend-giga relative z-10 text-center max-w-fit">
            AFLORA
          </h1>
          <h3 className="text-[1rem] sm:text-xl md:text-4xl lg:text-[2rem] font-lexend-giga relative z-10 text-center">
            Espaço Criativo
          </h3>
        </div>
        {/* Link Boxes */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          <Link to="/sobre">
            <Button
              variant="default"
              className="w-full bg-[#7802c8] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Conheça o Aflora
            </Button>
          </Link>
          <Link to="/producoes">
            <Button
              variant="default"
              className="w-full bg-[#7802c8] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Produção de Eventos
            </Button>
          </Link>
          <Link to="/projetoseoficinas">
            <Button
              variant="default"
              className="w-full bg-[#7802c8] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Projetos e Oficinas Pedagógicas
            </Button>
          </Link>
          <Link to="/fotografia">
            <Button
              variant="default"
              className="w-full bg-[#7802c8]  hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Fotografia
            </Button>
          </Link>
          <Link to="/performance">
            <Button
              variant="default"
              className="w-full bg-[#7802c8] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Performance Artística
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
