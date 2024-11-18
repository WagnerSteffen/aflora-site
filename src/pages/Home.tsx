import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const Home = () => {
  const birdRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const animationEndHandler = () => {
      if (birdRef.current) {
        birdRef.current.classList.remove("animate-flyOnce");
      }
    };

    if (birdRef.current) {
      birdRef.current.addEventListener("animationend", animationEndHandler);
    }

    return () => {
      if (birdRef.current) {
        birdRef.current.removeEventListener(
          "animationend",
          animationEndHandler,
        );
      }
    };
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-purple-400">
      <div className="relative">
        <h1 className="text-[10rem] font-amatic-sc relative z-10">
          Comming soon...
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
