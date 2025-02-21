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
      className={`flex ${imageOnLeft ? "flex-row" : "flex-row-reverse"} items-${imgAlign} text-${textAlign} w-full`}
    >
      <div className="w-1/2 pb-8 flex justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="max-w-full h-auto max-h-[30rem]" // Imagem responsiva
        />
      </div>
      <div className="w-1/2 p-8 prose">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children, ...props }) => (
              <h1 className="text-3xl font-bold mb-2" {...props}>
                {children}
              </h1>
            ),
            p: ({ children, ...props }) => (
              <p className="mb-2" {...props}>
                {children}
              </p>
            ),
            // Outros componentes
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PersonInfo;
