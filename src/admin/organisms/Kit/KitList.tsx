
import React from "react";
import KitItem from "./KitItem";
import { Kit } from "../../atom/Kit/Kit";

type KitListProps = {
  kits: Kit[];
  onUpdateKit: (updatedKit: Kit) => void;
};

const KitList = ({ kits, onUpdateKit }: KitListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {kits.map((kit) => (
      <KitItem key={kit.menu_id} kit={kit} onUpdate={onUpdateKit} />
    ))}
  </div>
);

export default KitList;
