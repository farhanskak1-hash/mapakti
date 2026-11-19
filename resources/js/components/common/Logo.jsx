import React from 'react';
import { useData } from '../../context/DataContext';

export const Logo = ({ size = 'md', lightText = true, showText = true, iconOnly = false, customLogoUrl }) => {
  let settingsLogo = null;
  try {
    const data = useData();
    if (data && data.settings && data.settings.logoUrl) {
      settingsLogo = data.settings.logoUrl;
    }
  } catch (e) {
    // Quiet fallback when rendered outside DataProvider
  }

  const logoSrc = customLogoUrl || settingsLogo || '/images/logo-mapakti.png';

  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10 sm:h-11 sm:w-11',
    lg: 'h-14 w-14',
    xl: 'h-18 w-18'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Official MAPAKTI Badge Image */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.md} flex-shrink-0 flex items-center justify-center`}>
        <img
          src={logoSrc}
          alt="Logo Resmi UKM MAPAKTI UPS Tegal"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,196,0,0.35)] transition-transform duration-300 hover:scale-110"
          loading="eager"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/logo-mapakti.png';
          }}
        />
      </div>

      {!iconOnly && showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-black tracking-wider text-xl sm:text-2xl text-[#F5C400] drop-shadow-sm font-sans">
              MAPAKTI
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 uppercase tracking-widest hidden sm:inline-block">
              UPS TEGAL
            </span>
          </div>
          <span className={`text-[10px] sm:text-[11px] font-medium tracking-tight ${
            lightText ? 'text-slate-300' : 'text-slate-600'
          } leading-tight mt-0.5`}>
            Mahasiswa Pencinta Alam
          </span>
        </div>
      )}
    </div>
  );
};
