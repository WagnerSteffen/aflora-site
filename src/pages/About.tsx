import PersonInfo from "../components/personInfo"; // Importe o componente

const About = () => {
  const bucketName = "aflora-static-page";
  const wagnerImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/wagner/me.png`;
  const daiaImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/daia/me.png`;

  return (
    <div className="relative min-h-screen bg-white text-black p-8">
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center">
        Sobre Nós
      </h1>

      <PersonInfo
        imageUrl={wagnerImageUrl}
        name="Wagner"
        text="Olá, eu sou o Wagner! Sou apaixonado por..."
        imgAlign="start"
        imageOnLeft={false}
      />

      <PersonInfo
        imageUrl={daiaImageUrl}
        name="Daia"
        text="Olá, eu sou a Daia! Sou apaixonada por..."
        imgAlign="center"
        imageOnLeft={true}
      />
    </div>
  );
};

export default About;
