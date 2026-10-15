import React from 'react';
import { Home, CheckSquare, Wrench } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'inicio' | 'checklist' | 'herramientas';
  onChangeTab: (tab: 'inicio' | 'checklist' | 'herramientas') => void;
  unlocked: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  unlocked,
}) => {
  const tabs = [
    {
      id: 'inicio' as const,
      label: 'Inicio',
      icon: Home,
    },
    {
      id: 'checklist' as const,
      label: 'Checklist',
      icon: CheckSquare,
    },
    {
      id: 'herramientas' as const,
      label: 'Herramientas',
      icon: Wrench,
      badge: unlocked ? 'PRO' : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 safe-bottom">
      <div className="max-w-md mx-auto grid grid-cols-3 items-center h-16 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-3.5 px-1 py-0.2 rounded text-[8px] font-black leading-none bg-emerald-500 text-slate-950">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className={`text-[11px] tracking-tight mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
