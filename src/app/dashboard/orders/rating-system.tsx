import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingSystemProps {
  onRate: (rating: number) => void;
  givenRating: number;
}

export function RatingSystem({ onRate, givenRating }: RatingSystemProps) {
  const [rating, setRating] = useState(givenRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="p-0 w-8 h-8"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                setRating(ratingValue);
                onRate(ratingValue);
              }}
            >
              <Star
                className={`h-6 w-6 ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </Button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        {rating > 0
          ? `You rated ${rating} star${rating > 1 ? "s" : ""}`
          : "Rate the vendor"}
      </p>
    </div>
  );
}
