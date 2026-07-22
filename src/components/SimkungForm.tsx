import React, { useState, useEffect } from 'react';
import { characters, SIMKUNG_BANNER_IMAGE } from '../data';
import { ConfessionRecord } from '../types';
import { Heart, Send, CheckCircle2, Phone, Sparkles, HelpCircle } from 'lucide-react';

interface SimkungFormProps {
  onSelectCharacter: (id: 'kanghan' | 'sihoo') => void;
  onAddConfession: (record: ConfessionRecord) => void;
}

export default function SimkungForm({ 
  onSelectCharacter, 
  onAddConfession
}: SimkungFormProps) {
  const [allCharacters, setAllCharacters] = useState<any[]>(characters);

  useEffect(() => {
    setAllCharacters(characters);
  }, []);

  const [crushPhone, setCrushPhone] = useState('');
  const [myPhone, setMyPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // 24-hour rotating encouraging quotes
  const quotes = [
    "망설임 끝에 용기를 내어 한 걸음 내딛는 순간, 기적이 시작될 거야. 네 진심은 분명 전해질 거야!",
    "고백하지 않으면 0%지만, 고백하면 단 1%라도 가능성이 생겨. 네 마음에 솔직해지는 용기를 응원해!",
    "네 눈빛이 머무는 그곳에, 너의 진심이 닿기를. 오늘 밤 너의 고백이 빛나는 별처럼 전해질 거야.",
    "사랑은 타이밍이 아니라 용기래. 네 마음에 숨겨둔 수줍은 고백을 오늘 꼭 전해보는 건 어떨까?",
    "지나고 보면 가장 후회되는 건 고백했던 순간이 아니라, 마음을 전하지 못하고 보낸 날들이래. 힘내!",
    "좋아한다는 말 한마디가 세상을 바꿀지도 몰라. 청월고 학생들의 풋풋한 모든 고백이 성공하길 기도할게.",
    "네 마음속 깊이 품은 그 사람을 떠올려봐. 네 진심 가득한 메시지가 그 사람의 마음을 두드릴 거야.",
    "두근거리는 마음은 숨기기 힘든 법이니까. 주저하지 말고 네 진심을 가득 담아 노크해봐!",
    "진심은 언제나 가장 큰 울림을 주니까, 멋지게 포장하지 않아도 돼. 있는 그대로의 네 마음을 전해봐!",
    "오늘이 너와 그 사람의 특별한 1일이 되는\n시작점일지도 몰라. 용기 내어 전송 버튼을 눌러봐!"
  ];

  // 1시간마다 랜덤하게 변경되는 응원 메시지 (시간 값을 해시하여 유사 랜덤 분배)
  const hoursSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60));
  const pseudoRandomIndex = (hoursSinceEpoch * 17 + 11) % quotes.length;
  const encouragingQuote = quotes[pseudoRandomIndex];

  // States for the submission flow
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [confessedName, setConfessedName] = useState<string | null>(null);
  const [reactionMsg, setReactionMsg] = useState<string | null>(null);

  // Validation error states
  const [crushPhoneError, setCrushPhoneError] = useState('');
  const [myPhoneError, setMyPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (num.startsWith('0000')) {
      if (num.length <= 4) return num;
      if (num.length <= 8) return `${num.slice(0, 4)}-${num.slice(4)}`;
      return `${num.slice(0, 4)}-${num.slice(4, 8)}-${num.slice(8, 12)}`;
    }
    if (num.length <= 3) return num;
    if (num.length <= 7) return `${num.slice(0, 3)}-${num.slice(3)}`;
    return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
  };

  const handleCrushPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = formatPhoneNumber(e.target.value);
    setCrushPhone(val);
    if (hasAttemptedSubmit) {
      if (!val.trim()) {
        setCrushPhoneError('상대 전화번호를 입력해 주세요!');
      } else if (val.replace(/\D/g, '').length < 10) {
        setCrushPhoneError('올바른 전화번호 형식이 아닙니다!');
      } else {
        setCrushPhoneError('');
      }
    }
  };

  const handleMyPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = formatPhoneNumber(e.target.value);
    setMyPhone(val);
    if (hasAttemptedSubmit) {
      if (!val.trim()) {
        setMyPhoneError('나의 전화번호를 입력해 주세요!');
      } else if (val.replace(/\D/g, '').length < 10) {
        setMyPhoneError('올바른 전화번호 형식이 아닙니다!');
      } else {
        setMyPhoneError('');
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMessage(val);
    if (hasAttemptedSubmit) {
      if (!val.trim()) {
        setMessageError('전하고 싶은 마음을 입력해 주세요!');
      } else {
        setMessageError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    let isValid = true;

    if (!crushPhone.trim()) {
      setCrushPhoneError('상대 전화번호를 입력해 주세요!');
      isValid = false;
    } else if (crushPhone.replace(/\D/g, '').length < 10) {
      setCrushPhoneError('올바른 전화번호 형식이 아닙니다!');
      isValid = false;
    } else {
      setCrushPhoneError('');
    }

    if (!myPhone.trim()) {
      setMyPhoneError('나의 전화번호를 입력해 주세요!');
      isValid = false;
    } else if (myPhone.replace(/\D/g, '').length < 10) {
      setMyPhoneError('올바른 전화번호 형식이 아닙니다!');
      isValid = false;
    } else {
      setMyPhoneError('');
    }

    if (!message.trim()) {
      setMessageError('전하고 싶은 마음을 입력해 주세요!');
      isValid = false;
    } else {
      setMessageError('');
    }

    if (!isValid) {
      return;
    }

    const cleanCrushPhone = crushPhone.replace(/\D/g, '');

    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Simulated multi-step loader for vintage/fun feel
    setTimeout(() => {
      setAnalysisStep(2);
      setTimeout(() => {
        setAnalysisStep(3);
        setTimeout(() => {
          setIsAnalyzing(false);

          if (cleanCrushPhone === '000036288296' || cleanCrushPhone === '01036288296') {
            const targetId = 'kanghan';
            const newRecord: ConfessionRecord = {
              id: Math.random().toString(36).substring(2, 9),
              senderNumber: myPhone,
              receiverNumber: crushPhone,
              message: message,
              targetId: targetId,
              timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            };
            onAddConfession(newRecord);
            onSelectCharacter(targetId);
          } else if (cleanCrushPhone === '000021973370' || cleanCrushPhone === '01021973370') {
            const targetId = 'sihoo';
            const newRecord: ConfessionRecord = {
              id: Math.random().toString(36).substring(2, 9),
              senderNumber: myPhone,
              receiverNumber: crushPhone,
              message: message,
              targetId: targetId,
              timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            };
            onAddConfession(newRecord);
            onSelectCharacter(targetId);
          } else {
            setShowRecipientModal(true);
          }
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const handleSelectRecipient = (targetId: 'kanghan' | 'sihoo') => {
    const target = allCharacters.find(c => c.id === targetId);
    if (!target) return;

    // Create confession record
    const newRecord: ConfessionRecord = {
      id: Math.random().toString(36).substring(2, 9),
      senderNumber: myPhone,
      receiverNumber: crushPhone,
      message: message,
      targetId: targetId,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    onAddConfession(newRecord);
    setShowRecipientModal(false);
    onSelectCharacter(targetId);
  };

  const handleReset = () => {
    setCrushPhone('');
    setMyPhone('');
    setMessage('');
    setConfessedName(null);
    setReactionMsg(null);
    setCrushPhoneError('');
    setMyPhoneError('');
    setMessageError('');
    setHasAttemptedSubmit(false);
  };

  return (
    <div id="simkung-container" className="max-w-3xl mx-auto">
      {/* Pink & Blue Pastel Header Hero */}
      <div className="relative overflow-hidden rounded-3xl md:rounded-[40px] bg-white/40 backdrop-blur-2xl border border-white/60 p-5 md:p-8 shadow-2xl shadow-pink-200/50 mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-800 tracking-tight text-center md:text-left font-sunflower">
            좋아하는 상대와의 궁합을 확인해보세요!
          </h1>
        </div>
        
        {/* Blinking 1,429 users badge */}
        <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
          <div className="px-3 py-1 bg-pink-100 border border-pink-200 text-pink-600 rounded-full text-[10px] sm:text-xs font-black shadow-xs flex items-center gap-1.5 animate-pulse font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
            현재 1,429명 이용 중
          </div>
        </div>
      </div>

      {/* 1시간마다 변경되는 응원 메시지 배너 */}
      <div className="mb-6 md:mb-8 p-5 md:p-6 rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/60 flex flex-col items-center text-center gap-2 shadow-xl shadow-pink-200/20">
        <div className="space-y-2 flex flex-col items-center">
          <span className="text-sm md:text-base text-pink-500 font-extrabold tracking-wider flex items-center justify-center gap-1.5 uppercase font-sunflower">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 fill-pink-500 animate-pulse shrink-0" />
            오늘의 응원 메시지
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500 fill-pink-500 animate-pulse shrink-0" />
          </span>
          <p className="text-sm sm:text-base md:text-lg font-bold text-slate-700 leading-relaxed font-sunflower whitespace-pre-line">
            "{encouragingQuote}"
          </p>
        </div>
      </div>

      {/* Main Feature Layout */}
      {!reactionMsg ? (
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl md:rounded-[48px] p-5 md:p-10 shadow-2xl shadow-pink-200/50 relative">

          {isAnalyzing ? (
            /* Analyzing Loading State */
            <div className="py-16 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-pink-100 border-t-pink-400 animate-spin"></div>
                <Heart className="w-10 h-10 text-pink-400 animate-pulse fill-pink-50" />
              </div>
              
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-slate-700 font-sunflower">
                  {analysisStep === 1 && '두 전화번호의 주파수 주파 연산 중...'}
                  {analysisStep === 2 && '청월고 기지국 매칭 신호 분석 중...'}
                  {analysisStep === 3 && '운명의 매칭 점수 집계 완료! 고백 문자 패킷 생성 중...'}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {analysisStep === 1 && 'Loading components: [0x8A79F] - Syncing frequencies...'}
                  {analysisStep === 2 && 'Calibrating local cellular bands [Cheongwol_LTE_Cell3]...'}
                  {analysisStep === 3 && 'CONFESSION PACKET CONVERTED SUCCESS. READY TO FORWARD.'}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-64 bg-slate-100 rounded-full h-2 mt-8 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-sky-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(analysisStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Crush Phone */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-blue-500 uppercase tracking-widest px-1 flex items-center gap-1.5 font-sunflower">
                    <Phone className="w-4 h-4 text-blue-500 fill-blue-500 shrink-0" />
                    상대 전화번호
                  </label>
                  <input
                    type="text"
                    value={crushPhone}
                    onChange={handleCrushPhoneChange}
                    placeholder="0000-XXXX-XXXX"
                    maxLength={14}
                    className="w-full bg-white/90 border-none rounded-2xl md:rounded-3xl px-4 py-3.5 md:px-6 md:py-5 text-base sm:text-lg md:text-xl font-mono shadow-inner focus:ring-4 ring-blue-100 outline-none transition-all text-center text-slate-800"
                  />
                  {crushPhoneError && (
                    <p className="text-xs text-rose-500 font-bold font-sunflower mt-1 animate-pulse px-1">
                      {crushPhoneError}
                    </p>
                  )}
                </div>

                {/* My Phone */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-blue-500 uppercase tracking-widest px-1 flex items-center gap-1.5 font-sunflower">
                    <Phone className="w-4 h-4 text-blue-500 fill-blue-500 shrink-0" />
                    나의 전화번호
                  </label>
                  <input
                    type="text"
                    value={myPhone}
                    onChange={handleMyPhoneChange}
                    placeholder="0000-YYYY-YYYY"
                    maxLength={14}
                    className="w-full bg-white/90 border-none rounded-2xl md:rounded-3xl px-4 py-3.5 md:px-6 md:py-5 text-base sm:text-lg md:text-xl font-mono shadow-inner focus:ring-4 ring-pink-100 outline-none transition-all text-center text-slate-800"
                  />
                  {myPhoneError && (
                    <p className="text-xs text-rose-500 font-bold font-sunflower mt-1 animate-pulse px-1">
                      {myPhoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Confession Text Area */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-blue-500 uppercase tracking-widest px-1 flex items-center gap-1.5 font-sunflower">
                  <Heart className="w-4 h-4 text-blue-500 fill-blue-500 shrink-0" />
                  당신의 마음을 표현해보세요!
                </label>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    rows={4}
                    placeholder=""
                    className="w-full bg-white/90 border-none rounded-2xl md:rounded-[32px] px-4 py-3.5 md:px-8 md:py-6 text-sm sm:text-base md:text-xl leading-relaxed resize-none shadow-inner outline-none focus:ring-4 ring-purple-100 text-slate-800 font-sans"
                  ></textarea>
                </div>
                {messageError && (
                  <p className="text-xs text-rose-500 font-bold font-sunflower mt-1 animate-pulse px-1">
                    {messageError}
                  </p>
                )}
                <div className="flex justify-end px-1 text-[10px] font-bold text-slate-400">
                  <span className={`${message.length > 200 ? 'text-rose-500' : 'text-slate-300'} whitespace-nowrap`}>
                    {message.length}자 입력됨
                  </span>
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black py-4 md:py-6 rounded-2xl md:rounded-[32px] text-sm sm:text-base md:text-2xl shadow-xl shadow-pink-200 uppercase tracking-widest hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 md:gap-2.5 cursor-pointer font-sunflower"
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 fill-white" />
                나와 상대방의 궁합 확인하기
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Final Action Reaction Response view */
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl md:rounded-[48px] p-5 md:p-10 shadow-2xl shadow-pink-200/50 animate-fade-in">
          <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl mb-6">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-bold text-sm">고백 강제 문자 전송이 완벽히 끝났습니다!</p>
              <p className="text-xs mt-0.5 text-slate-600">
                {confessedName}님에게 고백 문자가 전달되었으며, ⓤ는 돌이킬 수 없는 <strong>강제 고백 사건</strong>의 중심인물이 되었습니다.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8 whitespace-pre-line text-sm leading-relaxed text-slate-700 font-sans">
            {reactionMsg}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onSelectCharacter(confessedName === '권강한' ? 'kanghan' : 'sihoo')}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-sky-400 text-white font-bold text-sm shadow hover:opacity-90 transition active:scale-[0.99] text-center cursor-pointer"
            >
              {confessedName} 프로필 정보 보러 가기
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition cursor-pointer"
            >
              다시 다른 문장으로 장난치기
            </button>
          </div>
        </div>
      )}

      {/* Recipient Modal Dialog Overlay */}
      {showRecipientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 backdrop-blur-3xl w-full max-w-2xl rounded-3xl md:rounded-[40px] shadow-2xl p-5 md:p-8 border border-pink-100 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4 md:mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">
                SECRET CONFESSION ROUTING
              </span>
              <h2 className="text-xl sm:text-3xl font-black italic text-slate-800 mt-3 sm:mt-4 tracking-tight">
                누구에게 고백을 전송하시겠습니까?
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
                번호 매칭 시스템이 청월고 기지국에서 타겟 대상을 최종 확인했습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {allCharacters.map((char) => (
                <div
                  key={char.id}
                  onClick={() => handleSelectRecipient(char.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-[24px] border border-slate-100 bg-gradient-to-tr hover:border-pink-300 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Photo container */}
                  <div className="relative h-40 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={char.imagePath}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-black">{char.name}</span>
                        <span className="text-[10px] sm:text-xs opacity-80">{char.age}세 / {char.gender}</span>
                      </div>
                      <p className="text-[9px] sm:text-[11px] opacity-90 mt-1 line-clamp-1">
                        {char.classInfo}
                      </p>
                    </div>
                  </div>

                  {/* Quick info */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-slate-50/50">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                      {char.publicPersonality[0]}
                    </p>
                    
                    <button
                      className={`w-full py-2 mt-3 sm:py-2.5 sm:mt-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r ${char.id === 'kanghan' ? 'from-blue-500 to-cyan-500' : 'from-pink-500 to-rose-500'} group-hover:scale-[1.02] transition`}
                    >
                      {char.name}에게 문자 전송 ♡
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRecipientModal(false)}
              className="w-full py-3.5 rounded-2xl text-slate-500 bg-slate-50 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
            >
              취소하고 돌려보내기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
