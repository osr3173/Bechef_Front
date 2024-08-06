import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type InfoBtnProps = {
  content: string;
  clickEvent: () => void;
};

export type InfoContentProps = {
  content: string | number;
};

export type InfoDayDetailProps = {
  dayInfo: string;
  dayOpenTime: string;
  dayCloseTime: string;
  isClosed: boolean;
};

export type InfoMenuIngredientProps = {
  content: string[];
};

export type InfoMenuIngredientBoxProps = {
  menuContent: string[];
  menuText: string;
};

export type InfoMenuTextBoxProps = {
  menuDes: string;
  menuText: string | number;
  menuUnit?: string;
};

export type InfoReviewInputProps = {
  setComment: React.Dispatch<React.SetStateAction<string>>;
  reset?: boolean;
};

export type InfoSubmitBtnProps = {
  clickEvent: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  content: string;
};

export type InfoDetailProps = {
  content: string;
  detailIcon: IconDefinition;
};

export type InfoIconProps = {
  icon: IconDefinition;
  className?: string;
};
