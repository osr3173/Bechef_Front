import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoIconProps } from "./InfoProps";

const InfoIcon = ({ icon, className }: InfoIconProps) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default InfoIcon;
