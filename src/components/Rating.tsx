import { RatingProps } from "@/lib/types";
import { Star } from "lucide-react";

export default function Rating({ rating, count, maxRating = 5 }: RatingProps) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      <div className="flex">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            size={20}
            className={`${
              index < filledStars
                ? "text-yellow-400 fill-yellow-400"
                : index === filledStars && hasHalfStar
                ? "text-yellow-400"
                : "text-gray-300"
            } transition-colors duration-200`}
            fill={index < filledStars ? "currentColor" : "none"}
            strokeWidth={2}
            style={
              index === filledStars && hasHalfStar
                ? {
                    backgroundImage:
                      "linear-gradient(90deg, currentColor 50%, transparent 50%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }
                : undefined
            }
          />
        ))}
      </div>
      <span className="text-sm text-gray-600" aria-label={`${count} reviews`}>
        ({count})
      </span>
    </div>
  );
}
