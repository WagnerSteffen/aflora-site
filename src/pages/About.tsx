import Layout from "../components/Layout";
import PersonInfo from "../components/PersonInfo"; // Importe o componente
import wagnerText from "../assets/minibio_wagner.txt?raw";
import daiaText from "../assets/minibio_daia.txt?raw";

const About = () => {
  const bucketName = "aflora-static-page";
  const wagnerImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/wagner/me2.png`;
  const daiaImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/daia/daia.png`;
  return (
    <Layout>
      <div className="relative min-h-screen bg-white text-black pt-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
          Sobre Nós
        </h1>
        <div className="bg-gray-100 pt-4">
          <PersonInfo
            imageUrl={wagnerImageUrl}
            name="Wagner"
            text={wagnerText}
            textAlign="justify"
            imgAlign="center"
            imageOnLeft={false}
          />
        </div>
        <div className="bg-gray-100 pt-4">
          <PersonInfo
            imageUrl={daiaImageUrl}
            name="Daia"
            text={daiaText}
            textAlign="justify"
            imgAlign="center"
            imageOnLeft={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
