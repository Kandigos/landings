import React from 'react';
import { MapPin, Coffee, Users } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Features() {
  const { content } = useContent();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="section-title">פרטים חשובים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <MapPin className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">איפה?</h3>
            <p className="text-lg text-gray-600">
              {content.schedule.location}
              <a 
                href="https://waze.com/ul/hsvbbsj4vy"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                פתח ב-Waze &gt;
              </a>
            </p>
          </div>
          <div className="feature-card">
            <Coffee className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">כולל</h3>
            <p className="text-lg text-gray-600">{content.schedule.includes}</p>
          </div>
          <div className="feature-card">
            <Users className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">למי זה מתאים?</h3>
            <p className="text-lg text-gray-600">
              לכל מי שמחפש להקשיב פנימה, לשחרר מתחים ולהתחבר לשלווה ולנפש.
              אין צורך בידע קודם – רק להגיע עם רצון להקשיב ולהתמסר לצלילים.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}