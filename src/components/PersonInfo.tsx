// PersonInfo.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface PersonInfoProps {
  imageUrl: string;
  name: string;
  text: string;
  textAlign?: "left" | "center" | "right" | "justify";
  imgAlign?: "top" | "middle" | "bottom" | "center";
  imageOnLeft?: boolean;
}

const PersonInfo: React.FC<PersonInfoProps> = ({
  imageUrl,
  name,
  text,
  textAlign = "left",
  imgAlign = "middle",
  imageOnLeft = true,
}) => {
  return (
    <div
      className={`flex ${
        imageOnLeft ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
      } items-${imgAlign} text-${textAlign} w-full`}
    >
      {/* Imagem */}
      <div className="w-full md:w-1/2 pb-4 md:pb-8 flex justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="max-w-full h-auto max-h-[20rem] md:max-h-[30rem]" // Imagem responsiva, altura ajustada para mobile
        />
      </div>

      {/* Texto */}
      <div className="w-full md:w-1/2 p-4 md:p-8 prose">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => (
              <h1
                className="text-2xl md:text-3xl font-bold mb-2" // Tamanho da fonte ajustado para mobile
                {...props}
              >
                {children}
              </h1>
            ),
            p: ({ children, ...props }) => (
              <p className="mb-2" {...props}>
                {children}
              </p>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PersonInfo;
