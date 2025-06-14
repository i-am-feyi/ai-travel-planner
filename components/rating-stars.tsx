import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  className?: string;
}

const RatingStars = ({ rating, className }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Gradient definition for partial fill */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="partial-fill" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="size-4 fill-yellow-500 text-yellow-500" />
      ))}

      {/* Partial star */}
      {partialStar > 0 && (
        <div className="relative">
          <Star className="size-4 text-yellow-500 stroke-0" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="size-4 text-yellow-500" />
      ))}
    </div>
  );
};

export default RatingStars;
