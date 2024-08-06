import { InfoContentProps } from "./InfoProps";

const InfoMenuImage = ({ content }: InfoContentProps) => {
  return (
    <div className="w-px300 h-px300 rounded-lg">
      <img className="size-full object-cover" src={`${content}`}></img>
    </div>
  );
};

export default InfoMenuImage;
