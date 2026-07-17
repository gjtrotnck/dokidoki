import React, { useState, useEffect } from 'react';
import SimkungForm from './components/SimkungForm';
import CharacterProfiles from './components/CharacterProfiles';
import PlacesList from './components/PlacesList';
import CalendarView from './components/CalendarView';
import { ConfessionRecord } from './types';
import { Heart, User, MapPin, Calendar, HelpCircle, History, Trash2, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simkung' | 'profiles' | 'places' | 'calendar'>('simkung');
  const [selectedCharId, setSelectedCharId] = useState<'kanghan' | 'sihoo'>('kanghan');
  const [confessions, setConfessions] = useState<ConfessionRecord[]>([]);

  // Load confessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('simkung_confessions');
    if (saved) {
      try {
        setConfessions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved confessions', e);
      }
    }
  }, []);

  const handleAddConfession = (record: ConfessionRecord) => {
    const updated = [record, ...confessions];
    setConfessions(updated);
    localStorage.setItem('simkung_confessions', JSON.stringify(updated));

    // Pre-select the confessed character
    if (record.targetId) {
      setSelectedCharId(record.targetId as 'kanghan' | 'sihoo');
    }

    // Switch to profiles tab after a short realistic delay (1.0 second) without showing toast
    setTimeout(() => {
      setActiveTab('profiles');
    }, 1000);
  };

  const handleClearHistory = () => {
    if (window.confirm('모든 고백 전송 기록을 완전히 초기화하시겠습니까? (이전의 반응 데이터가 소멸됩니다)')) {
      setConfessions([]);
      localStorage.removeItem('simkung_confessions');
    }
  };

  const navigateToProfile = (charId: 'kanghan' | 'sihoo') => {
    setSelectedCharId(charId);
    setActiveTab('profiles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 font-sans antialiased text-slate-700 pb-24 md:pb-16">
      
      {/* GLOBAL TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('simkung')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-blue-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            </div>
            <span className="font-black text-lg sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent tracking-tight font-sunflower">
              두근두근 심쿵 주의보
            </span>
          </div>

          {/* Tab buttons - Hidden on mobile, shown on desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('simkung')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'simkung'
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span className="hidden md:inline">심쿵 </span>사이트
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profiles'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                인물<span className="hidden md:inline"> 프로필</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('places')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                주요<span className="hidden md:inline"> 장소</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                학사<span className="hidden md:inline"> 일정</span>
              </span>
            </button>
          </nav>

        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR - Visible on mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-white/50 flex justify-around items-center py-2.5 pb-safe shadow-xl shadow-pink-200/10">
        <button
          onClick={() => setActiveTab('simkung')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'simkung' ? 'text-pink-500 font-extrabold scale-105' : 'text-slate-400 font-medium'
          }`}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'simkung' ? 'fill-current text-pink-500' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">궁합</span>
        </button>

        <button
          onClick={() => setActiveTab('profiles')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'profiles' ? 'text-blue-500 font-extrabold scale-105' : 'text-slate-400 font-medium'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profiles' ? 'text-blue-500' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">인물정보</span>
        </button>

        <button
          onClick={() => setActiveTab('places')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'places' ? 'text-sky-500 font-extrabold scale-105' : 'text-slate-400 font-medium'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeTab === 'places' ? 'text-sky-500' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">주요장소</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'calendar' ? 'text-indigo-500 font-extrabold scale-105' : 'text-slate-400 font-medium'
          }`}
        >
          <Calendar className={`w-5 h-5 ${activeTab === 'calendar' ? 'text-indigo-500' : 'text-slate-400'}`} />
          <span className="text-[10px] tracking-tight">학사일정</span>
        </button>
      </div>

      {/* MAIN SCREEN PORTAL CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'simkung' && (
          <div className="space-y-12">
            {/* Core simulation form */}
            <SimkungForm 
              onSelectCharacter={navigateToProfile} 
              onAddConfession={handleAddConfession} 
            />
          </div>
        )}

        {activeTab === 'profiles' && (
          <CharacterProfiles 
            selectedId={selectedCharId} 
            onSelectCharacter={setSelectedCharId} 
          />
        )}

        {activeTab === 'places' && <PlacesList />}

        {activeTab === 'calendar' && <CalendarView />}
      </main>

      {/* Footer / Copyright - EXCLUDED from sunflower font */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 text-[11px] text-slate-400 font-sans tracking-wider border-t border-slate-100/30 mt-16 pb-28 md:pb-12">
        <p>© 2007 두근두근 심쿵 주의보 · All rights reserved.</p>
      </footer>
    </div>
  );
}
