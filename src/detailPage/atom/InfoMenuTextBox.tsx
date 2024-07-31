import InfoMenuText from "./InfoMenuText";

type InfoMenuTextBoxProps = {
  menuDes: string;
  menuText: string | number;
  menuUnit?: string;
};

const InfoMenuTextBox = ({
  menuDes,
  menuText,
  menuUnit,
}: InfoMenuTextBoxProps) => {
  return (
    <div className="size-fit flex gap-1">
      <div className="font-semibold w-px75">
        <InfoMenuText content={menuDes} />
      </div>
      <div className="flex">
        <InfoMenuText content={menuText} />
        <span>{menuUnit}</span>
      </div>
    </div>
  );
};

export default InfoMenuTextBox;
