export type PanelTitleProps = {
  title: string;
};

const PanelTitle = ({ title }: PanelTitleProps) => {
  return (
    <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-300">
      {title}
    </h3>
  );
};

export default PanelTitle;
