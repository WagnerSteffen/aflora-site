import { Link } from "react-router-dom";

const Home = () => {
  console.log("Home is running");
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-purple-400">
      {/* Container principal */}
      <div className="relative">
        <h1 className="text-[10rem] font-marck-script relative z-10">Aflora</h1>
        <h3 className="font-marck-script text-[2rem] text-blue-500 absolute top-[10rem] left-[14rem] whitespace-nowrap">
          espaço criativo
        </h3>
      </div>

      {/* Botões */}
      <div className="mt-10 flex gap-4">
        <Link to="/nossosprojetos">
          <button className="px-4 py-2 text-lg font-medium bg-white text-black rounded hover:opacity-80 transition-opacity">
            Nossos projetos
          </button>
        </Link>
        <Link to="/sobre">
          <button className="px-4 py-2 text-lg font-medium bg-white text-black rounded hover:opacity-80 transition-opacity">
            Conheça o Aflora
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
