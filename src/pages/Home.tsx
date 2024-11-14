import { Link } from "react-router-dom";

const Home = () => {
  console.log("Home is running");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <h1 className="text-6xl font-bold animate-pulse">Aflora</h1>
      <div className="mt-10 flex gap-4">
        <Link to="/nossosprojetos">
          <button className="px-4 py-2 text-lg font-medium bg-white text-black rounded hover:opacity-80 transition-opacity">
            Know Our Projects
          </button>
        </Link>
        <Link to="/sobre">
          <button className="px-4 py-2 text-lg font-medium bg-white text-black rounded hover:opacity-80 transition-opacity">
            About Aflora
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
