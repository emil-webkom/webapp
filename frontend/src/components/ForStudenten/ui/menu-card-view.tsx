"use client";

import MenuCard, {
  MenuCardProps,
} from "@/components/ForStudenten/ui/menu-card";

type MenuCardViewProps = {
  cards: MenuCardProps[];
};

const MenuCardView = ({ cards }: MenuCardViewProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, index) => {
          return <MenuCard key={index} {...card} />;
        })}
      </div>
    </div>
  );
};

export default MenuCardView;
