import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ReviewsSectionProps {
  productId: string;
  averageRating: number;
  reviewCount: number;
}

export const ReviewsSection = ({ productId, averageRating, reviewCount }: ReviewsSectionProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2025-01-15",
      comment: "Absolutely love this shirt! The quality is outstanding and the fit is perfect. Worth every penny.",
      verified: true
    },
    {
      id: "2",
      author: "Michael R.",
      rating: 4,
      date: "2025-01-10",
      comment: "Great quality fabric and the design is unique. Sizing is accurate. Would recommend!",
      verified: true
    },
    {
      id: "3",
      author: "Emma L.",
      rating: 5,
      date: "2025-01-05",
      comment: "This is my third purchase from ONYXIA. Consistently excellent quality and the customer service is top-notch.",
      verified: true
    }
  ];

  const handleSubmitReview = () => {
    toast.success("Thank you for your review!");
    setShowReviewForm(false);
    setComment("");
    setRating(5);
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-muted-foreground">({reviewCount} reviews)</span>
          </div>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          Write a Review
        </Button>
      </div>

      {showReviewForm && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Write Your Review</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Your Review</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSubmitReview}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-foreground/90">{review.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
