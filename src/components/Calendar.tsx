import React from 'react';
import { useContent } from '../context/ContentContext';
import { CalendarCheck, Users, Coins } from 'lucide-react';

export default function Calendar() {
  const { content } = useContent();
  const sortedEvents = [...content.events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div id="calendar-section" className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="section-title">מועדים קרובים</h2>
      <div className="grid gap-6">
        {sortedEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-medium text-[#4A5D45]">{event.title}</h3>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <CalendarCheck className="w-6 h-6 text-[#678860]" />
                  <div>
                    <div className="text-xl">{event.fullDate}</div>
                    <div className="text-gray-600">{event.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-[#678860]" />
                  <span className="text-sm">
                    נותרו {event.availableSpots} מקומות מתוך {event.maxParticipants}
                  </span>
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#678860]" />
                    <span className="text-lg font-medium">{event.price} ₪</span>
                  </div>
                </div>
                {event.payboxLink && (
                  <a
                    href={event.payboxLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#678860] text-white px-6 py-2 rounded-full hover:bg-[#4A5D45] transition-colors duration-300"
                  >
                    הרשמה למפגש
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}