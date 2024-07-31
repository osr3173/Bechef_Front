type InfoMenuImageProps = {
  content: string;
};

const InfoMenuImage = ({ content }: InfoMenuImageProps) => {
  return (
    <div className="w-px300 h-px300 rounded-lg">
      <img className="size-full object-cover" src={`${content}`}></img>
    </div>
  );
};

export default InfoMenuImage;
