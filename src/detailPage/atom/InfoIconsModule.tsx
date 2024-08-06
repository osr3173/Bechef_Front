import InfoIcon from "./InfoIcon";
import React from "react";
import {
  faStar as regularStar,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faStar as solidStar,
  faArrowLeft as solidArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export const InfoEmptyStarIcon = () => <InfoIcon icon={regularStar} />;
export const InfoHeartIcon = () => <InfoIcon icon={regularHeart} />;
export const InfoSolidHeartIcon = () => (
  <InfoIcon icon={solidHeart} className="text-blue-700" />
);
export const InfoSolidStarIcon = () => (
  <InfoIcon icon={solidStar} className="text-skipLB" />
);

export const InfoBackArrowIcon = () => (
  <InfoIcon icon={solidArrowLeft} className="text-white text-lg" />
);
