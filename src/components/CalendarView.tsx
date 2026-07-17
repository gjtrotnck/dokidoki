import React, { useState } from 'react';
import { calendarEvents } from '../data';
import { CalendarEvent } from '../types';
import { Clock } from 'lucide-react';

type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';

interface CalendarEventWithId extends CalendarEvent {
  id: string;
}

export default function CalendarView() {
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('spring');

  const [allEvents] = useState<CalendarEventWithId[]>(() => {
    const savedV2 = localStorage.getItem('simkung_calendar_v2');
    if (savedV2) {
      try {
        const parsed = JSON.parse(savedV2);
        return parsed.map((e: any, idx: number) => ({
          ...e,
          id: e.id || `evt-${idx}-${Math.random()}`
        }));
      } catch (e) {
        console.error(e);
      }
    }
    const savedV1 = localStorage.getItem('simkung_calendar_v1');
    if (savedV1) {
      try {
        const parsed = JSON.parse(savedV1);
        localStorage.setItem('simkung_calendar_v2', JSON.stringify(parsed));
        return parsed.map((e: any, idx: number) => ({
          ...e,
          id: e.id || `evt-${idx}-${Math.random()}`
        }));
      } catch (e) {
        console.error(e);
      }
    }
    const defaultData = calendarEvents.map((e, idx) => ({
      ...e,
      id: `evt-${idx}`
    }));
    localStorage.setItem('simkung_calendar_v2', JSON.stringify(defaultData));
    return defaultData;
  });

  const filteredEvents = allEvents.filter(e => e.season === selectedSeason);

  const getSeasonInfo = (season: SeasonType) => {
    switch (season) {
      case 'spring':
        return {
          title: '봄 학기',
          icon: '🌸',
          color: 'from-pink-300 to-rose-400 text-pink-600 bg-pink-50 border-pink-100'
        };
      case 'summer':
        return {
          title: '여름 학기',
          icon: '☀️',
          color: 'from-sky-300 to-blue-400 text-sky-600 bg-sky-50 border-sky-100'
        };
      case 'autumn':
        return {
          title: '가을 학기',
          icon: '🍁',
          color: 'from-orange-300 to-amber-400 text-amber-600 bg-amber-50 border-amber-100'
        };
      case 'winter':
        return {
          title: '겨울 학기',
          icon: '❄️',
          color: 'from-indigo-300 to-violet-400 text-indigo-600 bg-indigo-50 border-indigo-100'
        };
    }
  };

  const currentSeason = getSeasonInfo(selectedSeason);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          청월고등학교 학사 일정
        </span>
      </div>

      {/* Season Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 bg-slate-100/80 p-1 rounded-2xl max-w-lg mx-auto border border-slate-200/55 font-sans">
        {(['spring', 'summer', 'autumn', 'winter'] as SeasonType[]).map((season) => {
          const info = getSeasonInfo(season);
          const isActive = selectedSeason === season;
          return (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`py-2 px-1 sm:py-3 sm:px-1.5 rounded-xl font-bold text-xs transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer ${
                isActive
                  ? `bg-white text-slate-800 scale-[1.03]`
                  : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{info.icon}</span>
              <span className="text-[10px] sm:text-xs truncate">{info.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Expanded Season Intro Card */}
      <div className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border ${currentSeason.color.split(' ').slice(2).join(' ')} flex items-center justify-center gap-4 text-center max-w-lg mx-auto`}>
        <div className="flex items-center gap-3 justify-center">
          <div className="text-2xl sm:text-3xl shrink-0 leading-none">
            {currentSeason.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg sm:text-xl leading-snug">
              {currentSeason.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Center Aligned Lists */}
      <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-10">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <span className="text-3xl">🗓️</span>
            <p className="text-xs text-slate-400 font-medium">이 학기에는 등록된 일정이 없습니다.</p>
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-6">
            {filteredEvents.map((event) => {
              return (
                <div key={event.id} className="group">
                  <div className="bg-white/60 border border-slate-100 p-5 rounded-2xl hover:border-indigo-100 transition-all duration-300 flex flex-col items-center text-center space-y-3">
                    {/* Date */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50/50 py-1.5 px-3 rounded-lg border border-blue-100 w-fit shrink-0">
                      <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      {event.date}
                    </span>
                    
                    {/* Title */}
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-relaxed">
                      {event.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
