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
    const ensureNewImages = (list: Character[]) => {
      return list.map((c: Character) => {
        if (c.id === 'kanghan') {
          return {
            ...c,
            imagePath: 'https://i.postimg.cc/G2nrg1gH/from-Pix-AI-2034149918937036432-1.png',
            secretPersonality: ['의존적', '불안정 애착형']
          };
        }
        if (c.id === 'sihoo') {
          return {
            ...c,
            imagePath: 'https://i.postimg.cc/c4kWy3kj/from-Pix-AI-2034149625405942310-1.png'
          };
        }
        return c;
      });
    };

    const sanitizeCharacteristics = (list: Character[]) => {
      return list.map((c: Character) => {
        if (c.id === 'kanghan' && c.characteristics) {
          const updated = c.characteristics.map(char => {
            if (char.includes('매일 훈련에 매지는 습관 있음') || char.includes('훈련에 매지는 습관') || char.includes('훈련에 매지는 습관 있음')) {
              return '훈련에 매진하는 습관 있음';
            }
            return char;
          });
          return { ...c, characteristics: updated };
        }
        return c;
      });
    };

    // 1. Check v7
    const savedV7 = localStorage.getItem('simkung_characters_v7');
    if (savedV7) {
      try {
        const parsed = JSON.parse(savedV7);
        const sanitized = sanitizeCharacteristics(parsed);
        localStorage.setItem('simkung_characters_v7', JSON.stringify(sanitized));
        return sanitized;
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Check older v6 and migrate if possible
    const savedV6 = localStorage.getItem('simkung_characters_v6');
    if (savedV6) {
      try {
        const parsed = JSON.parse(savedV6);
        const updated = sanitizeCharacteristics(ensureNewImages(parsed));
        localStorage.setItem('simkung_characters_v7', JSON.stringify(updated));
        localStorage.removeItem('simkung_characters_v6');
        localStorage.removeItem('simkung_characters_v5');
        localStorage.removeItem('simkung_characters_v4');
        return updated;
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Check older v5
    const savedV5 = localStorage.getItem('simkung_characters_v5');
    if (savedV5) {
      try {
        const parsed = JSON.parse(savedV5);
        const updated = sanitizeCharacteristics(ensureNewImages(parsed));
        localStorage.setItem('simkung_characters_v7', JSON.stringify(updated));
        localStorage.removeItem('simkung_characters_v5');
        localStorage.removeItem('simkung_characters_v4');
        return updated;
      } catch (e) {
        console.error(e);
      }
    }

    // Default: return hardcoded characters but save them to v7
    const defaultSanitized = sanitizeCharacteristics(characters);
    localStorage.setItem('simkung_characters_v7', JSON.stringify(defaultSanitized));
    return defaultSanitized;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Character | null>(null);

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
    if (isEditing) {
      if (window.confirm('작성 중인 변경 사항이 유실됩니다. 캐릭터를 전환하시겠습니까?')) {
        setIsEditing(false);
        setEditForm(null);
        onSelectCharacter(id);
      }
    } else {
      onSelectCharacter(id);
    }
  };

  const startEditing = () => {
    setEditForm(JSON.parse(JSON.stringify(currentCharacter))); // deep clone
    setIsEditing(true);
  };

  const saveChanges = () => {
    if (!editForm) return;
    const updated = allCharacters.map(c => c.id === editForm.id ? editForm : c);
    setAllCharacters(updated);
    localStorage.setItem('simkung_characters_v7', JSON.stringify(updated));
    setIsEditing(false);
    setEditForm(null);
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setEditForm(null);
  };

  const resetToDefault = () => {
    if (window.confirm('모든 인물 정보를 원래 기본값으로 복원하시겠습니까?')) {
      localStorage.removeItem('simkung_characters_v7');
      localStorage.removeItem('simkung_characters_v6');
      localStorage.removeItem('simkung_characters_v5');
      localStorage.removeItem('simkung_characters_v4');
      const reset = JSON.parse(JSON.stringify(characters));
      setAllCharacters(reset);
      setIsEditing(false);
      setEditForm(null);
    }
  };

  const renderArrayField = (
    label: string, 
    items: string[], 
    onChange: (newItems: string[]) => void
  ) => {
    return (
      <div className="space-y-2">
        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider font-sans">{label}</label>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx] = e.target.value;
                  onChange(updated);
                }}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 ring-pink-100 outline-none transition text-slate-850"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = items.filter((_, i) => i !== idx);
                  onChange(updated);
                }}
                className="px-2 py-1 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 text-xs font-bold transition shrink-0 cursor-pointer"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="w-full py-2 bg-white/60 border border-dashed border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
        >
          + 항목 추가
        </button>
      </div>
    );
  };

  const renderPastTimelineField = (
    past: CharacterPast[],
    onChange: (newPast: CharacterPast[]) => void
  ) => {
    return (
      <div className="space-y-4">
        <div className="space-y-4">
          {past.map((item, idx) => (
            <div key={idx} className="p-4 bg-white/55 border border-slate-150 rounded-2xl space-y-3 relative shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-extrabold text-slate-400">사건 #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = past.filter((_, i) => i !== idx);
                    onChange(updated);
                  }}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-500 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  삭제
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold mb-1">나이</label>
                  <input
                    type="number"
                    value={item.age}
                    onChange={(e) => {
                      const updated = [...past];
                      updated[idx] = { ...item, age: parseInt(e.target.value) || 0 };
                      onChange(updated);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 ring-pink-100 outline-none transition text-slate-850"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 font-bold mb-1">사건 제목</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...past];
                      updated[idx] = { ...item, title: e.target.value };
                      onChange(updated);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 ring-pink-100 outline-none transition text-slate-850"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-bold mb-1">상세 사건 내용</label>
                <textarea
                  value={item.event}
                  onChange={(e) => {
                    const updated = [...past];
                    updated[idx] = { ...item, event: e.target.value };
                    onChange(updated);
                  }}
                  rows={2}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:ring-2 ring-pink-100 outline-none transition resize-none text-slate-850"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`isSecret-${idx}`}
                  checked={item.isSecret}
                  onChange={(e) => {
                    const updated = [...past];
                    updated[idx] = { ...item, isSecret: e.target.checked };
                    onChange(updated);
                  }}
                  className="w-3.5 h-3.5 text-pink-500 border-slate-300 rounded focus:ring-pink-500"
                />
                <label htmlFor={`isSecret-${idx}`} className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
                  🔒 비공개 과거 (비밀 잠금해제 시에만 공개)
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...past, { age: 17, title: '', event: '', isSecret: false }])}
          className="w-full py-2.5 bg-white/60 border border-dashed border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
        >
          + 새로운 사건 추가
        </button>
      </div>
    );
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
