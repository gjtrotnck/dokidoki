import React, { useState } from 'react';
import { Character, CharacterPast } from '../types';
import { characters } from '../data';
import { 
  Heart, Flame, Sparkles, User, Info, Calendar, HandMetal,
  Shirt, Laugh, Skull, MessageCircle, RefreshCw, Star, ArrowRight,
  Edit, Save, Plus, Trash, X, RotateCcw, ThumbsUp, ThumbsDown,
  Lock, Unlock
} from 'lucide-react';

interface CharacterProfilesProps {
  selectedId: 'kanghan' | 'sihoo';
  onSelectCharacter: (id: 'kanghan' | 'sihoo') => void;
}

export default function CharacterProfiles({ selectedId, onSelectCharacter }: CharacterProfilesProps) {
  const [allCharacters, setAllCharacters] = useState<Character[]>(() => {
    const sanitizeCharacters = (list: Character[]) => {
      return list.map((c: Character) => {
        if (c.id === 'sihoo') {
          return { ...c, hair: '갈발', age: 18 };
        }
        return c;
      });
    };

    // 1. First, check the most secure, stable key 'simkung_characters_v8'
    const savedV8 = localStorage.getItem('simkung_characters_v8');
    if (savedV8) {
      try {
        return sanitizeCharacters(JSON.parse(savedV8));
      } catch (e) {
        console.error('Failed to parse simkung_characters_v8', e);
      }
    }

    // 2. Fallback to older versions if they somehow survived (just in case)
    const keys = ['simkung_characters_v7', 'simkung_characters_v6', 'simkung_characters_v5', 'simkung_characters_v4'];
    for (const key of keys) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const sanitized = sanitizeCharacters(parsed);
          localStorage.setItem('simkung_characters_v8', JSON.stringify(sanitized));
          return sanitized;
        } catch (e) {
          console.error(`Failed to parse ${key}`, e);
        }
      }
    }

    // 3. Absolute fallback to hardcoded default data from data.ts
    const defaultData = sanitizeCharacters(JSON.parse(JSON.stringify(characters)));
    localStorage.setItem('simkung_characters_v8', JSON.stringify(defaultData));
    return defaultData;
  });

  const [unlockedInner, setUnlockedInner] = useState<{ [key: string]: boolean }>({
    kanghan: false,
    sihoo: false,
  });

  const [unlockedPast, setUnlockedPast] = useState<{ [key: string]: boolean }>({
    kanghan: false,
    sihoo: false,
  });

  const currentCharacter = allCharacters.find(c => c.id === selectedId) || allCharacters[0];
  
  const handleCharacterSelect = (id: 'kanghan' | 'sihoo') => {
    onSelectCharacter(id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in font-sans">
      {/* Quick Toggle bar between Kwon Kang-han and Jung Si-hoo */}
      <div className="flex justify-center items-center gap-4 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
        {allCharacters.map((char) => {
          const isActive = char.id === currentCharacter.id;
          return (
            <button
              key={char.id}
              onClick={() => handleCharacterSelect(char.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isActive
                  ? `bg-gradient-to-r ${char.themeColor.primary} text-white shadow`
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{char.name}</span>
            </button>
          );
        })}
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Side: Large Portrait & Core Specs Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-3xl md:rounded-[40px] overflow-hidden relative group">
              {/* Theme visual glow */}
              <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${currentCharacter.themeColor.primary}`}></div>
              
              {/* Profile image with subtle overlay */}
              <div className="relative h-[280px] sm:h-[480px] bg-slate-50 overflow-hidden">
                <img
                  src={currentCharacter.imagePath}
                  alt={currentCharacter.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-102"
                />
              </div>

              {/* Quick specifications */}
              <div className="p-4 sm:p-6 bg-slate-50/40 border-t border-white/50 space-y-5">
                
                {/* 1. 인물 정보 별도 분리 칸 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2 font-sans">
                    <User className="w-4 h-4 text-slate-500" />
                    인물 정보
                  </h3>
                  <div className="bg-white/80 rounded-2xl border border-slate-100 p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">특징</span>
                      <strong className="text-slate-800">
                        {currentCharacter.specialty}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">학급 정보</span>
                      <strong className="text-slate-800">
                        {currentCharacter.classInfo}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">인적 사항</span>
                      <strong className="text-slate-800">
                        {currentCharacter.age}세 | {currentCharacter.gender}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 2. 외형 */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2 font-sans">
                    <Sparkles className="w-4 h-4 text-slate-500" />
                    외형
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs">
                    <div className="p-3 bg-white/80 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1">머리 | 눈</span>
                      <span className="text-slate-700">{currentCharacter.hair} | {currentCharacter.eyes}</span>
                    </div>
                    <div className="p-3 bg-white/80 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1">신장</span>
                      <span className="text-slate-700">{currentCharacter.height}cm</span>
                    </div>
                  </div>
                </div>

                {/* Unique parts - 하얀 둥근 칸으로 감싸기 */}
                <div className="bg-white/80 rounded-xl border border-slate-100 p-3.5 space-y-2 shadow-xs">
                  <span className="text-[11px] text-slate-400 font-bold block font-sans">특징</span>
                  <ul className="space-y-1.5">
                    {currentCharacter.uniqueFeatures.map((feat, idx) => (
                      <li key={idx} className="text-xs text-slate-800 flex items-start leading-relaxed">
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 의상 - 외모처럼 칸 바로 위쪽에 뺄 것. 기존의 글자는 삭제. 하단 항목의 검은 점 삭제. */}
                <div className="space-y-4 pt-1">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2 font-sans">
                    <Shirt className="w-4 h-4 text-slate-500" />
                    의상
                  </h3>
                  <ul className="space-y-2 font-sans">
                    {currentCharacter.clothing.school.map((cloth, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50/80 py-2 px-3.5 rounded-xl border border-slate-100 leading-relaxed">
                        <span>{cloth}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Profile */}
          <div className="lg:col-span-7 space-y-6">

            {/* TAB CONTENT: Personalities & Likes/Dislikes stacked vertically with flat borders */}
            <div className="space-y-6">
              
              {/* 1. 표면 성격 */}
              <div className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-2xl md:rounded-[32px] p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-3 font-sans">
                  <Laugh className="w-5 h-5 text-slate-600" />
                  표면 성격
                </h3>
                <ul className="space-y-2.5 font-sans">
                  {currentCharacter.publicPersonality.map((p, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50/80 py-2 px-3.5 rounded-xl border border-slate-100 leading-relaxed">
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. 내면 성격 */}
              {unlockedInner[currentCharacter.id] ? (
                <div className="bg-white/40 backdrop-blur-2xl border border-blue-100 rounded-2xl md:rounded-[32px] p-5 sm:p-6 space-y-4 animate-fade-in relative">
                  <h3 className="text-base font-bold text-blue-600 flex items-center justify-between border-b border-blue-100 pb-3 font-sans">
                    <span className="flex items-center gap-1.5">
                      <Laugh className="w-5 h-5 text-blue-500" />
                      내면 성격
                    </span>
                    <button 
                      onClick={() => setUnlockedInner(prev => ({ ...prev, [currentCharacter.id]: false }))}
                      className="text-[10px] text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 hover:bg-blue-100 transition cursor-pointer"
                    >
                      🔒 다시 잠그기
                    </button>
                  </h3>
                  <ul className="space-y-2.5 font-sans">
                    {currentCharacter.secretPersonality && currentCharacter.secretPersonality.length > 0 ? (
                      currentCharacter.secretPersonality.map((p, idx) => (
                        <li key={idx} className="text-xs text-blue-700 flex items-start gap-2 bg-blue-50/80 py-2.5 px-3.5 rounded-xl border border-blue-100/50 leading-relaxed">
                          <span>{p}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-slate-400 italic">내면 성격 정보가 비어 있습니다.</li>
                    )}
                  </ul>
                </div>
              ) : (
                <div 
                  onClick={() => setUnlockedInner(prev => ({ ...prev, [currentCharacter.id]: true }))}
                  className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-2xl md:rounded-[32px] p-6 text-center cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] group animate-fade-in"
                >
                  <Lock className="w-8 h-8 text-blue-500 animate-pulse mb-3 group-hover:scale-110 transition duration-300" />
                  <h3 className="text-base font-bold text-blue-600 font-sans mb-1">내면 성격</h3>
                  <p className="text-xs text-blue-400 font-sans">클릭하여 내면 성격 확인하기</p>
                </div>
              )}

              {/* 3. 호 (Likes) */}
              <div className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-2xl md:rounded-[32px] p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-3 font-sans">
                  <ThumbsUp className="w-5 h-5 text-rose-500 fill-rose-50" />
                  호
                </h3>
                
                {/* Public Likes */}
                <div className="space-y-2 font-sans">
                  <ul className="space-y-2.5 font-sans">
                    {currentCharacter.likes.public.map((like, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100">
                        <span>{like}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secret Likes */}
                {currentCharacter.likes.secret && currentCharacter.likes.secret.length > 0 && (
                  <div className="pt-2 space-y-2 font-sans border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-bold block flex items-center gap-1 font-sans">
                      비밀 취향
                    </span>
                    <ul className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      {currentCharacter.likes.secret.map((like, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-lg border border-slate-100 shadow-xs">
                          <span className="text-xs text-rose-500">❤️</span>
                          <span>{like}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 4. 불호 (Dislikes) */}
              <div className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-2xl md:rounded-[32px] p-5 sm:p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-3 font-sans">
                  <ThumbsDown className="w-5 h-5 text-rose-500 fill-rose-50" />
                  불호
                </h3>
                <ul className="space-y-2.5 font-sans">
                  {currentCharacter.dislikes.map((dis, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-2 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100">
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* 3. Deep Character Characteristics Details List */}
            <div className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-[32px] p-6 space-y-4 mt-6">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-3 font-sans">
                <Info className="w-5 h-5 text-slate-600" />
                인물 집중 탐구
              </h3>
              <ul className="space-y-2.5">
                {currentCharacter.characteristics.map((char, idx) => {
                  return (
                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50/80 py-2.5 px-3.5 rounded-xl border border-slate-100 leading-relaxed">
                      <span className="font-sans">{char}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 4. Past Story Timeline */}
            {unlockedPast[currentCharacter.id] ? (
              <div className="bg-white/40 backdrop-blur-2xl border border-blue-100 rounded-2xl md:rounded-[32px] p-6 space-y-6 mt-6 animate-fade-in">
                <h3 className="text-base font-bold text-blue-600 flex items-center justify-between border-b border-blue-100 pb-3 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    과거
                  </span>
                  <button 
                    onClick={() => setUnlockedPast(prev => ({ ...prev, [currentCharacter.id]: false }))}
                    className="text-[10px] text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 hover:bg-blue-100 transition cursor-pointer"
                  >
                    🔒 다시 잠그기
                  </button>
                </h3>

                <div className="relative pl-6 border-l-2 border-blue-100 space-y-8">
                  {[...currentCharacter.past]
                    .sort((a, b) => a.age - b.age)
                    .map((p, idx) => (
                      <div key={idx} className="relative">
                        {/* Timeline bullet dot */}
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white transition duration-300 border-blue-500 shadow">
                        </div>

                        <div className="space-y-1.5 font-sans">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white">
                              {p.age}세
                            </span>
                            <h4 className="text-xs font-extrabold text-blue-800 flex items-center gap-1 font-sans">
                              {p.title}
                            </h4>
                          </div>

                          <p className="text-xs text-blue-700 leading-relaxed bg-blue-50/30 p-3 rounded-2xl border border-blue-100/30">
                            {p.event}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setUnlockedPast(prev => ({ ...prev, [currentCharacter.id]: true }))}
                className="bg-white/40 backdrop-blur-2xl border border-slate-200 rounded-2xl md:rounded-[32px] p-6 text-center cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center min-h-[140px] group mt-6 animate-fade-in"
              >
                <Lock className="w-8 h-8 text-blue-500 animate-pulse mb-3 group-hover:scale-110 transition duration-300" />
                <h3 className="text-base font-bold text-blue-600 font-sans mb-1">과거</h3>
                <p className="text-xs text-blue-400 font-sans">클릭하여 과거 확인하기</p>
              </div>
            )}

          </div>

        </div>
    </div>
  );
}
