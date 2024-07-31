type InfoMenuTitleProps = {
  content: string;
};

const InfoMenuTitle = ({ content }: InfoMenuTitleProps) => {
  return <div className="text-px26 font-semibold mb-4">{content}</div>;
};

export default InfoMenuTitle;
