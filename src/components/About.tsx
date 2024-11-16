import React from 'react';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content } = useContent();
  
  return (
    <div className="section-container">
      <h2 className="section-title">אודות החוויה</h2>
      <p className="text-xl leading-relaxed mb-16 max-w-4xl mx-auto text-center">
        {content.aboutExperience}
      </p>
    </div>
  );
}