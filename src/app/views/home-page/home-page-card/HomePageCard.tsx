import { type Card, iconsMap } from '../mockCards';


type Props = {
  card: Card;
};

function HomePageCard({ card }: Props) {
  const IconComponent = iconsMap[card.icon];

  return (
    <div
      className="flex justify-between max-w-74 w-full rounded-2xl p-6 box-border"
      style={{ backgroundColor: card.background }}
    >
      <div className="w-full">
        <span className="flex text-4xl font-medium">{card.number}</span>
        <span>{card.text}</span>
      </div>
      <IconComponent className="w-17 h-17" />
    </div>
  );
}

export default HomePageCard;
