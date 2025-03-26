import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface Props{
  rating: number
}

export const Star = ({ rating }: Props) => {
  const renderStar = (type: 'full' | 'half' | 'empty') => {
    switch (type) {
      case 'full':
        return <IoStar className="w-5 h-5 text-yellow-300" />;
      case 'half':
        return <IoStarHalf className="w-5 h-5 text-yellow-300" />;
      default:
        return <IoStarOutline className="w-5 h-5 text-gray-300" />;
    }
  };

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<div key={i}>{renderStar('full')}</div>);
    } else if (rating > i && rating < i + 1) {
      stars.push(<div key={i}>{renderStar('half')}</div>);
    } else {
      stars.push(<div key={i}>{renderStar('empty')}</div>);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
}