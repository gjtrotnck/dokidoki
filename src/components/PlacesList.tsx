import React, { useState } from 'react';
import { Place } from '../types';
import { places } from '../data';
import { MapPin, School, ShieldAlert, Award, Home, Landmark, FileText, X } from 'lucide-react';

export default function PlacesList() {
  const [allPlaces] = useState<Place[]>(() => {
    const savedV2 = localStorage.getItem('simkung_places_v2');
    if (savedV2) {
      try {
        return JSON.parse(savedV2);
      } catch (e) {
        console.error(e);
      }
    }
    const savedV1 = localStorage.getItem('simkung_places_v1');
    if (savedV1) {
      try {
        const parsed = JSON.parse(savedV1);
        localStorage.setItem('simkung_places_v2', JSON.stringify(parsed));
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    const defaultData = places;
    localStorage.setItem('simkung_places_v2', JSON.stringify(defaultData));
    return defaultData;
  });
  const [activePlace, setActivePlace] = useState<Place | null>(null);

  // Map icons and colors to place ids for vibrant, distinct visuals
  const getPlaceColors = (id: string) => {
    switch (id) {
      case 'school':
        return {
          bg: 'bg-indigo-50 border-indigo-100 group-hover:bg-indigo-100/50',
          text: 'text-indigo-600',
          icon: <School className="w-5 h-5" />
        };
      case 'judo':
        return {
          bg: 'bg-amber-50 border-amber-100 group-hover:bg-amber-100/50',
          text: 'text-amber-600',
          icon: <Award className="w-5 h-5" />
        };
      case 'student_council':
        return {
          bg: 'bg-rose-50 border-rose-100 group-hover:bg-rose-100/50',
          text: 'text-rose-600',
          icon: <Landmark className="w-5 h-5" />
        };
      case 'kanghan_house':
        return {
          bg: 'bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100/50',
          text: 'text-emerald-600',
          icon: <Home className="w-5 h-5" />
        };
      case 'sihoo_house':
        return {
          bg: 'bg-sky-50 border-sky-100 group-hover:bg-sky-100/50',
          text: 'text-sky-600',
          icon: <Home className="w-5 h-5" />
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-100 group-hover:bg-slate-100/50',
          text: 'text-slate-600',
          icon: <MapPin className="w-5 h-5" />
        };
    }
  };

  const activeColors = activePlace ? getPlaceColors(activePlace.id) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      
      {/* Title & Concept Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-sky-500 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full font-sans">
          주요 장소
        </span>
      </div>

      {/* Horizontal Grid of Places */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allPlaces.map((place) => {
          const colors = getPlaceColors(place.id);
          return (
            <div
              key={place.id}
              onClick={() => {
                setActivePlace(place);
              }}
              className="group cursor-pointer p-6 rounded-3xl border border-slate-100 bg-white/60 backdrop-blur-md hover:bg-slate-50/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center justify-between h-full relative overflow-hidden min-h-[160px]"
            >
              {/* Subtle hover background decoration */}
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              <div className="flex flex-col items-center w-full">
                {/* Icon Emblem */}
                <div className={`p-3.5 rounded-2xl ${colors.bg} border group-hover:scale-105 transition-all duration-300 shrink-0 shadow-xs mb-4 ${colors.text}`}>
                  {colors.icon}
                </div>

                {/* Text Details */}
                <div className="space-y-1.5 w-full">
                  <h4 className="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {place.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              {/* View details CTA */}
              <div className="mt-5 pt-4 border-t border-slate-100/60 flex justify-center items-center w-full">
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1.5 group-hover:bg-indigo-500 group-hover:text-white transition duration-300">
                  자세히 보기
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Detail Window Overlay */}
      {activePlace && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden my-8 max-h-[90vh] flex flex-col animate-scale-in">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start gap-4 shrink-0 bg-slate-50/50">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  {activeColors && (
                    <span className={`p-1.5 rounded-lg border ${activeColors.bg} ${activeColors.text}`}>
                      {activeColors.icon}
                    </span>
                  )}
                  <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">MAP DIRECTORY</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mt-1">
                  {activePlace.name}
                </h3>
              </div>
              
              <button
                onClick={() => {
                  setActivePlace(null);
                }}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
              
              {/* Core Description Text */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  설명
                </h4>
                <div className="text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
                  {activePlace.description}
                </div>
              </div>

              {/* Structures & Sections */}
              {activePlace.structure && activePlace.structure.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    구조
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePlace.structure.map((struct, idx) => (
                      <div key={idx} className="bg-white/80 border border-slate-100 p-3 rounded-xl flex items-center gap-2 shadow-xs">
                        <span className="text-xs text-slate-700 leading-normal">{struct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Behind stories/Details */}
              {activePlace.details && activePlace.details.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    특징
                  </h4>
                  <div className="space-y-2.5">
                    {activePlace.details.map((detail, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-slate-50/30 p-3.5 rounded-xl border border-slate-100/50 leading-relaxed">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center shrink-0 px-6">
              <button
                onClick={() => setActivePlace(null)}
                className="px-5 py-2.5 bg-slate-800 text-white hover:bg-slate-900 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
