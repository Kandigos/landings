import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { isAuthenticated } from '../utils/auth';
import { formatHebrewDateTime } from '../utils/dateUtils';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';

export default function AdminEdit() {
  const navigate = useNavigate();
  const { content, updateContent } = useContent();
  const [localContent, setLocalContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateContent(localContent);
      alert('השינויים נשמרו בהצלחה!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('אירעה שגיאה בשמירת השינויים');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToSite = () => {
    navigate('/');
  };

  const addEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      title: 'אירוע חדש',
      date: new Date().toISOString().split('T')[0],
      time: '20:00',
      location: 'מרחב אבאדמה, פרדס חנה',
      maxParticipants: 15,
      availableSpots: 15,
      payboxLink: '',
      price: 120
    };

    setLocalContent({
      ...localContent,
      events: [...localContent.events, newEvent]
    });
  };

  const updateEvent = (index: number, field: string, value: any) => {
    const updatedEvents = [...localContent.events];
    updatedEvents[index] = {
      ...updatedEvents[index],
      [field]: value
    };

    setLocalContent({
      ...localContent,
      events: updatedEvents
    });
  };

  const removeEvent = (index: number) => {
    const updatedEvents = localContent.events.filter((_, i) => i !== index);
    setLocalContent({
      ...localContent,
      events: updatedEvents
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToSite}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            חזרה לאתר
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isSaving ? 'שומר שינויים...' : 'שמור שינויים'}
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">כותרת ראשית</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">כותרת</label>
              <input
                type="text"
                value={localContent.title}
                onChange={(e) => setLocalContent({ ...localContent, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">תת כותרת</label>
              <input
                type="text"
                value={localContent.subtitle}
                onChange={(e) => setLocalContent({ ...localContent, subtitle: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* About Experience Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">אודות החוויה</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">תיאור החוויה</label>
              <textarea
                value={localContent.aboutExperience}
                onChange={(e) => setLocalContent({ ...localContent, aboutExperience: e.target.value })}
                className="w-full p-2 border rounded h-32"
                placeholder="תאר את החוויה..."
              />
            </div>
          </div>
        </div>

        {/* About Instructor Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">אודות המנחה</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">שם המנחה</label>
              <input
                type="text"
                value={localContent.instructor?.name || ''}
                onChange={(e) => setLocalContent({
                  ...localContent,
                  instructor: {
                    ...localContent.instructor,
                    name: e.target.value
                  }
                })}
                className="w-full p-2 border rounded"
                placeholder="שם המנחה"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">תיאור המנחה</label>
              <textarea
                value={localContent.instructor?.bio || ''}
                onChange={(e) => setLocalContent({
                  ...localContent,
                  instructor: {
                    ...localContent.instructor,
                    bio: e.target.value
                  }
                })}
                className="w-full p-2 border rounded h-48"
                placeholder="ספר על עצמך ועל הניסיון שלך..."
              />
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">מועדים קרובים</h2>
            <button
              onClick={addEvent}
              className="flex items-center text-blue-500 hover:text-blue-600"
            >
              <Plus className="w-5 h-5 mr-1" />
              הוסף מועד
            </button>
          </div>
          <div className="space-y-6">
            {localContent.events.map((event, index) => (
              <div key={event.id} className="border rounded p-4 relative">
                <button
                  onClick={() => removeEvent(index)}
                  className="absolute top-2 left-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">כותרת</label>
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => updateEvent(index, 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">תאריך</label>
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(index, 'date', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">שעה</label>
                    <input
                      type="time"
                      value={event.time.split(', ')[1] || event.time}
                      onChange={(e) => {
                        const date = new Date(event.date);
                        const { dayText } = formatHebrewDateTime(date, e.target.value);
                        updateEvent(index, 'time', `יום ${dayText}, ${e.target.value}`);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">מחיר</label>
                    <input
                      type="number"
                      value={event.price}
                      onChange={(e) => updateEvent(index, 'price', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">מספר משתתפים מקסימלי</label>
                    <input
                      type="number"
                      value={event.maxParticipants}
                      onChange={(e) => updateEvent(index, 'maxParticipants', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">מקומות פנויים</label>
                    <input
                      type="number"
                      value={event.availableSpots}
                      onChange={(e) => updateEvent(index, 'availableSpots', parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">קישור לתשלום בפייבוקס</label>
                    <input
                      type="text"
                      value={event.payboxLink}
                      onChange={(e) => updateEvent(index, 'payboxLink', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="הכנס קישור לתשלום..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">פרטים נוספים</h2>
          <div>
            <label className="block text-sm font-medium mb-1">מה כלול?</label>
            <input
              type="text"
              value={localContent.schedule.includes}
              onChange={(e) => setLocalContent({
                ...localContent,
                schedule: { ...localContent.schedule, includes: e.target.value }
              })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">חוות דעת</h2>
          <div className="space-y-4">
            {localContent.reviews.map((review, index) => (
              <div key={index} className="border rounded p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">שם</label>
                    <input
                      type="text"
                      value={review.name}
                      onChange={(e) => {
                        const updatedReviews = [...localContent.reviews];
                        updatedReviews[index] = { ...review, name: e.target.value };
                        setLocalContent({ ...localContent, reviews: updatedReviews });
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">תפקיד</label>
                    <input
                      type="text"
                      value={review.role}
                      onChange={(e) => {
                        const updatedReviews = [...localContent.reviews];
                        updatedReviews[index] = { ...review, role: e.target.value };
                        setLocalContent({ ...localContent, reviews: updatedReviews });
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">חוות דעת</label>
                    <textarea
                      value={review.text}
                      onChange={(e) => {
                        const updatedReviews = [...localContent.reviews];
                        updatedReviews[index] = { ...review, text: e.target.value };
                        setLocalContent({ ...localContent, reviews: updatedReviews });
                      }}
                      className="w-full p-2 border rounded h-24"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}