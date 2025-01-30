import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.tsx";

const Home = () => {
  const afloraPin = "../../src/assets/Aflora_color2.png";
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
          <h1 className="text-[#3361bf] text-[4rem] sm:text-6xl md:text-[12rem] lg:text-[6rem] font-work-sans relative z-10 text-center max-w-fit">
            Aflora
          </h1>
          <h3 className="text-[#3361bf] text-[1rem] sm:text-xl md:text-4xl lg:text-[2rem] font-work-sans relative z-10 text-center">
            espaço criativo
          </h3>
        </div>
        {/* Link Boxes */}
        <div className="w-18 max-w-sm flex flex-col gap-2">
          <Link to="/sobre">
            <Button
              variant="default"
              size="high"
              className="w-full bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Conheça o Aflora
            </Button>
          </Link>
          <Link to="/producoes">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Produção de Eventos
            </Button>
          </Link>
          <Link to="/projetoseoficinas">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Projetos e Oficinas Pedagógicas
            </Button>
          </Link>
          <a
            href="https://wagnersteffen.alboompro.com/"
            className="text-center py-1.5 w-full bg-[#7802c8]  hover:bg-[#A62E9E] text-white font-bold rounded-xl"
          >
            Fotografia
          </a>
          <Link to="/performance">
            <Button
              variant="default"
              size="lg"
              className="w-full bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
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
