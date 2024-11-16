import React, { createContext, useContext, useState, useEffect } from 'react';
import initialContent from '../data/content.json';

interface Instructor {
  name: string;
  bio: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  availableSpots: number;
  payboxLink: string;
  price: number;
}

interface Review {
  name: string;
  text: string;
  role: string;
}

interface Content {
  title: string;
  subtitle: string;
  aboutExperience: string;
  instructor: Instructor;
  events: Event[];
  schedule: {
    includes: string;
  };
  reviews: Review[];
}

interface ContentContextType {
  content: Content;
  updateContent: (newContent: Content) => Promise<void>;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'site_content';

const defaultContent: Content = {
  title: '',
  subtitle: '',
  aboutExperience: '',
  instructor: {
    name: '',
    bio: ''
  },
  events: [],
  schedule: {
    includes: ''
  },
  reviews: []
};

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>({ ...defaultContent, ...initialContent });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = () => {
      try {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          setContent({ ...defaultContent, ...parsedContent });
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setContent({ ...defaultContent, ...initialContent });
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const updateContent = async (newContent: Content): Promise<void> => {
    try {
      const contentToSave = { ...defaultContent, ...newContent };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contentToSave));
      setContent(contentToSave);
      window.dispatchEvent(new Event('content-updated'));
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}