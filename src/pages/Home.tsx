import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import afloraPin from "../assets/aflora_symbol.png";

const Home = () => {
  return (
    <div className="relative h-full bg-[#f9fafb] text-black">
      {/* Main
      Content */}
      <div className="flex items-center justify-center pt-8">
        <img
          src={afloraPin}
          alt="pin do aflora" className="max-h-48 sm:max-h-48 md:max-h-56 lg:max-h-56 max-w-auto"
        />
      </div>
      <div className="flex flex-col text-center items-center justify-top px-4 ">
        {/* Heading */}
        <div className="relative mb-10">
          <h1 className="text-[#3361bf] max-h-[6.7rem] text-[6rem] sm:text-[6rem] md:text-[6rem] lg:text-[6rem] font-work-sans relative z-10">
            Aflaora
          </h1>
          <h3 className="text-[#3361bf] text-[2rem] sm:text-[2rem] md:text-[2rem] lg:text-[2rem] font-work-sans relative z-10  ">
            espaço criativo
          </h3>
        </div>
        {/* Link Boxes */}
        <div className="flex flex-col gap-2">
          <Link to="/sobre">
            <Button
              variant="default"
              size="default"
              className="w-full h-12 bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Conheça o Aflora
            </Button>
          </Link>
          <Button
            variant="default"
            size="lg"
            className="w-full h-12 bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            asChild
          >
            <Link to="https://wagnersteffen.alboompro.com/">Fotografia</Link>
          </Button>
          <Link to="/producoes">
            <Button
              variant="default"
              size="lg"
              className="w-full h-12 bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Produção de Eventos
            </Button>
          </Link>
          <Link to="/projetoseoficinas">
            <Button
              variant="default"
              size="lg"
              className="w-full h-12 bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl"
            >
              Projetos e Oficinas Pedagógicas
            </Button>
          </Link>
          {/* <Link to="/performance"> **/}
          {/*    <Button **/}
          {/*     variant="default" **/}
          {/*    size="lg" **/}
          {/*    className="w-full h-12 bg-[#7802c8] hover:bg-[#A62E9E] text-white font-bold py-4 px-6 rounded-xl" **/}
          {/*     > **/}
          {/*       Performance Artística **/}
          {/*    </Button> **/}
          {/*  </Link> **/}
        </div>
      </div>
    </div>
  );
};

export default Home;
