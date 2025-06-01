
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp, Heart, Award } from 'lucide-react';

interface RatingsSectionProps {
  userId?: string;
}

const RatingsSection: React.FC<RatingsSectionProps> = ({ userId }) => {
  const [ratings, setRatings] = useState({
    average: 4.8,
    total: 127,
    breakdown: {
      5: 85,
      4: 32,
      3: 8,
      2: 2,
      1: 0
    }
  });

  const [reviews] = useState([
    {
      id: 1,
      rating: 5,
      comment: "Amazing experience! Highly recommended.",
      reviewer: "Sarah Johnson",
      date: "2024-01-15",
      type: "event"
    },
    {
      id: 2,
      rating: 4,
      comment: "Great service, very professional.",
      reviewer: "Mike Chen",
      date: "2024-01-10",
      type: "service"
    },
    {
      id: 3,
      rating: 5,
      comment: "Exceeded all expectations!",
      reviewer: "Emily Davis",
      date: "2024-01-05",
      type: "event"
    }
  ]);

  const renderStars = (rating: number, size: string = "h-4 w-4") => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getProgressWidth = (count: number) => {
    return (count / ratings.total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-400" />
            Ratings & Reviews
          </CardTitle>
          <CardDescription>Your reputation and feedback from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gray-900">{ratings.average}</div>
              {renderStars(ratings.average, "h-6 w-6")}
              <p className="text-gray-600">{ratings.total} total reviews</p>
              
              <div className="flex justify-center space-x-6 mt-4">
                <div className="text-center">
                  <ThumbsUp className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <div className="text-sm font-medium">98%</div>
                  <div className="text-xs text-gray-500">Positive</div>
                </div>
                <div className="text-center">
                  <Heart className="h-6 w-6 text-red-500 mx-auto mb-1" />
                  <div className="text-sm font-medium">89%</div>
                  <div className="text-xs text-gray-500">Recommend</div>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-medium">Top 10%</div>
                  <div className="text-xs text-gray-500">Ranking</div>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressWidth(ratings.breakdown[rating as keyof typeof ratings.breakdown])}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratings.breakdown[rating as keyof typeof ratings.breakdown]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>What people are saying about you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {renderStars(review.rating)}
                      <span className="text-sm font-medium">{review.reviewer}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        review.type === 'event' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {review.type}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingsSection;
