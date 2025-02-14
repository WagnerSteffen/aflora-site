import React from "react";

interface PersonInfoProps {
  imageUrl: string;
  name: string;
  text: string;
  imgAlign: "start" | "end" | "center";
  imageOnLeft: boolean;
}

const PersonInfo: React.FC<PersonInfoProps> = ({
  imageUrl,
  name,
  text,
  imgAlign,
  imageOnLeft,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${!imageOnLeft && "md:flex-row-reverse"} items-center mt-16 mb-16`}
    >
      <div
        className={`w-full md:w-1/2 px-4 mb-4 md:mb-0 flex justify-${imgAlign} items-center`}
      >
        {" "}
        {/* Adicionando flexbox */}
        <img
          src={imageUrl}
          alt={name}
          className="w-auto h-fit object-cover rounded-lg max-h-96"
        />
      </div>
      <div className="w-full md:w-1/2 px-4">
        <p className="text-center">{text}</p>
      </div>
    </div>
  );
};

export default PersonInfo;
