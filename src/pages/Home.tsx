import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="relative">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-amatic-sc relative z-10 text-center">
          Coming soon...
        </h1>
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
