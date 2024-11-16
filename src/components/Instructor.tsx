import React from 'react';
import { useContent } from '../context/ContentContext';

export default function Instructor() {
  const { content } = useContent();
  
  // Early return if instructor data is not available
  if (!content?.instructor) {
    return null;
  }
  
  return (
    <div className="section-container">
      <h2 className="section-title">אודות המנחה</h2>
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">{content.instructor.name}</h3>
        <div className="space-y-4 text-lg leading-relaxed">
          {content.instructor.bio.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}