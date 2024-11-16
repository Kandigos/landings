import React from 'react';
import { Star } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Reviews() {
  const { content } = useContent();

  return (
    <div className="section-container">
      <h2 className="section-title">חוות דעת משתתפים</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {content.reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="flex mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-lg mb-6 leading-relaxed">{review.text}</p>
            <div className="font-medium text-lg">
              <span>{review.name}</span>
              <span className="text-gray-600"> | {review.role}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          מספר המקומות מוגבל! הצטרפו למסע של אדמה וצליל במרחב אבאדמה, וחוו חיבור מחודש לעצמכם דרך צלילים מדויקים ואווירה עוטפת.
        </p>
        <a
          href={content.payboxLink}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button"
        >
          שריינו מקום עכשיו &gt;&gt;
        </a>
      </div>
    </div>
  );
}