import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Navigation Bar for small screens */}
      <div className="block sm:hidden fixed top-0 left-0 w-full bg-white z-20">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="m-6">☰ Menu</Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-4">
            <div className="flex flex-col gap-2">
              <Link to="/producoes">
                <Button variant="ghost" className="w-full text-left">
                  Organização de Eventos
                </Button>
              </Link>
              <Link to="/projetoseoficinas">
                <Button variant="ghost" className="w-full text-left">
                  Projetos e Oficinas
                </Button>
              </Link>
              <Link to="/fotografia">
                <Button variant="ghost" className="w-full text-left">
                  Fotografia
                </Button>
              </Link>
              <Link to="/performance">
                <Button variant="ghost" className="w-full text-left">
                  Performance Artística
                </Button>
              </Link>
              <Link to="/sobre">
                <Button variant="ghost" className="w-full text-left">
                  Conheça o Aflora
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16 sm:pt-0">
        {/* Heading */}
        <div className="relative mb-10">
          {" "}
          {/* Added margin-bottom */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
            Aflora
          </h1>
          <h3 className="text-lg sm:text-xl md:text-xl lg:text-[2rem] font-unbounded relative z-10 text-center">
            Espaço Criativo
          </h3>
        </div>
        {/* Link Boxes */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          <Link to="/producoes">
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Produção de Eventos
            </Button>
          </Link>
          <Link to="/projetoseoficinas">
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Projetos e Oficinas Pedagógicas
            </Button>
          </Link>
          <Link to="/fotografia">
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Fotografia
            </Button>
          </Link>
          <Link to="/performance">
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Performance Artística
            </Button>
          </Link>
          <Link to="/sobre">
            <Button
              variant="default"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-3xl"
            >
              Conheça o Aflora
            </Button>
          </Link>
        </div>
        {/* Standard Navigation for larger screens - Removed as per linktr.ee style */}
        {/* <div className="hidden sm:mt-10 sm:flex gap-4">
          <Link to="/nossosprojetos">
            <Button variant="default">Nossos projetos</Button>
          </Link>
          <Link to="/sobre">
            <Button variant="default">Conheça o Aflora</Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
