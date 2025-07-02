import { type Card, iconsMap } from '../mockCards';

type Props = {
    card: Card;
};


function HomePageCard({ card }: Props) {
  const iconSrc = iconsMap[card.icon];

  return (
    <div
      className="flex justify-between max-w-[296px] w-full rounded-[20px] p-[24px] box-border"
      style={{ backgroundColor: card.background }}
    >
      <div className="w-full">
        <span className="flex text-[40px] font-[500]">
          {card.number}
        </span>
        <span>{card.text}</span>
      </div>
      <img src={iconSrc}
        alt={card.icon}
        className="mt-[8px] w-[64px] h-[64px]" />
    </div>
  );
}

export default HomePageCard;