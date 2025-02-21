import Layout from "../components/Layout";
import PersonInfo from "../components/PersonInfo"; // Importe o componente

const About = () => {
  const bucketName = "aflora-static-page";
  const wagnerImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/wagner/wagner.png`;
  const daiaImageUrl = `https://storage.googleapis.com/${bucketName}/images/sobrenos/daia/daia.png`;

  const daiaText = `
**Daiana Hartmann** é a força criativa por trás do Aflora - Espaço Criativo. Seu interesse por diferentes modos de vida, pessoas, culturas, arte e desenvolvimento humano a levou a trilhar caminhos como o magistério e a educação física,  com uma trajetória consistente de estudos e pesquisas em processos de ensino-aprendizagem em dança / teatro. Sua alma aventureira a conduziu por diferentes experiências profissionais, impulsionando-a a explorar diversas linguagens artísticas e estudos de autoconhecimento e desenvolvimento pessoal.

Com uma conexão profunda com a natureza, tanto em seu interior quanto no mundo ao redor, Daiana demonstra um interesse genuíno por temas ligados à espiritualidade e a diferentes filosofias de vida. Sua criatividade, extroversão e propósito em tudo que faz, a tornam uma pessoa inspiradora e contagiante.

À frente do Aflora - Espaço Criativo, Daiana busca criar um espaço onde a criatividade, o desenvolvimento humano, a expressão autêntica e a conexão com a natureza se encontram, proporcionando experiências enriquecedoras e transformadoras para todos que cruzam seu caminho.
`;
  const wagnerText = `
**Wagner Steffen de Morais** é a mente por trás do Aflora - Espaço Criativo. Um ser humano observador, sensível, inteligente e criativo, com paixões que vão da vastidão do cosmos à lealdade dos cães, passando pela profundidade da filosofia e o dinamismo da tecnologia. Sua trajetória profissional diversificada lhe proporcionou um repertório pessoal rico e potente.

Com formação em gastronomia e atualmente cursando Análise e Desenvolvimento de Sistemas, Wagner trilhou caminhos que aparentemente não se cruzam, mas que juntos revelam um indivíduo multifacetado e curioso. Atualmente, atua na área da fotografia, onde acumula 7 anos de experiência, eternizando momentos e contando histórias através de suas imagens.
No Aflora Espaço Criativo, Wagner é responsável por diversos projetos e ações, aplicando sua criatividade e visão estratégica para impulsionar o crescimento do espaço. Sua paixão por astronomia se reflete em sua busca por novas perspectivas e soluções, enquanto seu amor por cachorros demonstra sua lealdade e companheirismo.

A filosofia o leva a questionar e buscar o sentido das coisas, e a tecnologia o impulsiona a inovar e explorar novas possibilidades. Wagner Steffen de Morais é a prova de que diferentes áreas de conhecimento podem se complementar e enriquecer um indivíduo, transformando-o em um profissional completo e diferenciado.
`;
  return (
    <Layout>
      <div className="relative min-h-screen bg-white text-black pt-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-unbounded relative z-10 text-center pb-4">
          Sobre Nós
        </h1>
        <div className="bg-gray-100 py-2">
          <PersonInfo
            imageUrl={wagnerImageUrl}
            name="Wagner"
            text={wagnerText}
            textAlign="justify"
            imgAlign="center"
            imageOnLeft={false}
          />
        </div>
        <div className="p-8">
          <p></p>
        </div>
        <div className="bg-gray-100 pt-2">
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
