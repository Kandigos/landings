import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useContent();
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        videoId: '6gpC557Ciyk',
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: '6gpC557Ciyk',
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          quality: 'hd1080',
          start: 0,
          suggestedQuality: 'hd1080'
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            event.target.playVideo();
            event.target.setPlaybackQuality('hd1080');
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const scrollToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    const calendarSection = document.getElementById('calendar-section');
    if (calendarSection) {
      calendarSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-section relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          <div 
            id="youtube-player" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
            style={{
              minWidth: '200%',
              minHeight: '200%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        </div>
      </div>

      {/* Sound Control */}
      <button
        onClick={toggleMute}
        className="video-control"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Content */}
      <div className="hero-content">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {content.title}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 font-light">
          {content.subtitle}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {content.about}
        </p>
        <button
          onClick={scrollToCalendar}
          className="primary-button"
        >
          שריינו מקום עכשיו &gt;&gt;
        </button>
      </div>
    </div>
  );
}