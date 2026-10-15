/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  HeartPulse, Shield, BookOpen, Clock, CheckSquare, 
  ArrowRight, CheckCircle2, Lock, Unlock, Sparkles, Zap 
} from 'lucide-react';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { CountdownHero } from './components/CountdownHero';
import { SuccessGauge } from './components/SuccessGauge';
import { PanicModal } from './components/PanicModal';
import { ChecklistSection } from './components/ChecklistSection';
import { ImpulseJournal } from './components/ImpulseJournal';
import { HubTab } from './components/HubTab';
import { CommunityWidget } from './components/CommunityWidget';
import { EncouragementModal } from './components/EncouragementModal';
import { PaywallModal } from './components/PaywallModal';
import { AccessCodeModal } from './components/AccessCodeModal';
import { TimelineNotificationBanner } from './components/TimelineNotificationBanner';
import { MessagePreparationModal } from './components/MessagePreparationModal';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ProfileModal } from './components/ProfileModal';
import { DevBar } from './components/DevBar';
import { CHECKLIST_ITEMS, TIME_TRIGGERED_NOTIFICATIONS } from './data/protocolData';
import { PhaseNumber, ImpulseLog, AccessLevel, TimeTriggeredNotification } from './types/protocol';
import { neuroAudio } from './utils/audioSynthesizer';

const STORAGE_PREFIX = 'protocolo_72h_v3_';

export default function App() {
  // --- 1. ACCESS SYSTEM (Two states, same app: "completo" | "basico") ---
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(() => {
    // 1. Check URL query param ?access=protocolo on load
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const accessParam = params.get('access');
      if (accessParam && accessParam.toLowerCase() === 'protocolo') {
        localStorage.setItem('accessLevel', 'completo');
        localStorage.setItem(`${STORAGE_PREFIX}accessLevel`, 'completo');
        return 'completo';
      }
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('accessLevel') || localStorage.getItem(`${STORAGE_PREFIX}accessLevel`);
    return saved === 'completo' ? 'completo' : 'basico';
  });

  // Sync accessLevel across keys
  useEffect(() => {
    localStorage.setItem('accessLevel', accessLevel);
    localStorage.setItem(`${STORAGE_PREFIX}accessLevel`, accessLevel);
  }, [accessLevel]);

  // --- 2. Personalization / Onboarding State ---
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail') || localStorage.getItem(`${STORAGE_PREFIX}userEmail`);
  });

  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('userName') || localStorage.getItem(`${STORAGE_PREFIX}userName`);
  });

  // Sync user state
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem(`${STORAGE_PREFIX}userEmail`, userEmail);
    } else {
      localStorage.removeItem('userEmail');
      localStorage.removeItem(`${STORAGE_PREFIX}userEmail`);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
      localStorage.setItem(`${STORAGE_PREFIX}userName`, userName);
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem(`${STORAGE_PREFIX}userName`);
    }
  }, [userName]);

  // --- 3. Persistent Protocol State ---
  const [startTime, setStartTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('startTime') || localStorage.getItem(`${STORAGE_PREFIX}startTime`);
    return saved ? Number(saved) : null;
  });

  const [simulatedElapsedSeconds, setSimulatedElapsedSeconds] = useState<number>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}simulatedSecs`);
    return saved ? Number(saved) : 0;
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('checklist') || localStorage.getItem(`${STORAGE_PREFIX}checklist`);
    return saved ? JSON.parse(saved) : {};
  });

  const [impulseJournal, setImpulseJournal] = useState<ImpulseLog[]>(() => {
    const saved = localStorage.getItem('impulseJournal') || localStorage.getItem(`${STORAGE_PREFIX}impulseJournal`);
    return saved ? JSON.parse(saved) : [];
  });

  const [shownBanners, setShownBanners] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('shownBanners') || localStorage.getItem(`${STORAGE_PREFIX}shownBanners`);
    return saved ? JSON.parse(saved) : {};
  });

  const [seenPopups, setSeenPopups] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}seenPopups`);
    return saved ? JSON.parse(saved) : {};
  });

  // --- 4. Ephemeral Navigation & Modals ---
  const [activeTab, setActiveTab] = useState<'inicio' | 'checklist' | 'herramientas'>('inicio');
  const [targetPackageId, setTargetPackageId] = useState<string | undefined>(undefined);
  const [isPanicModalOpen, setIsPanicModalOpen] = useState(false);
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDevBarOpen, setIsDevBarOpen] = useState(false);
  const [preparationModalPhase, setPreparationModalPhase] = useState<PhaseNumber | null>(null);
  const [encouragementType, setEncouragementType] = useState<'welcome' | 'phase1_done' | 'phase2_done' | 'milestone_phase1' | null>(null);

  // Time in seconds
  const [currentElapsedSeconds, setCurrentElapsedSeconds] = useState<number>(0);

  // Persistence effects
  useEffect(() => {
    if (startTime !== null) {
      localStorage.setItem('startTime', String(startTime));
      localStorage.setItem(`${STORAGE_PREFIX}startTime`, String(startTime));
    } else {
      localStorage.removeItem('startTime');
      localStorage.removeItem(`${STORAGE_PREFIX}startTime`);
    }
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}simulatedSecs`, String(simulatedElapsedSeconds));
  }, [simulatedElapsedSeconds]);

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checklist));
    localStorage.setItem(`${STORAGE_PREFIX}checklist`, JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('impulseJournal', JSON.stringify(impulseJournal));
    localStorage.setItem(`${STORAGE_PREFIX}impulseJournal`, JSON.stringify(impulseJournal));
  }, [impulseJournal]);

  useEffect(() => {
    localStorage.setItem('shownBanners', JSON.stringify(shownBanners));
    localStorage.setItem(`${STORAGE_PREFIX}shownBanners`, JSON.stringify(shownBanners));
  }, [shownBanners]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}seenPopups`, JSON.stringify(seenPopups));
  }, [seenPopups]);

  // Main real-time clock loop
  useEffect(() => {
    const computeElapsed = () => {
      if (!startTime) {
        return simulatedElapsedSeconds;
      }
      const realSeconds = Math.floor((Date.now() - startTime) / 1000);
      return Math.max(0, realSeconds + simulatedElapsedSeconds);
    };

    setCurrentElapsedSeconds(computeElapsed());

    const interval = setInterval(() => {
      setCurrentElapsedSeconds(computeElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, simulatedElapsedSeconds]);

  const currentElapsedHours = currentElapsedSeconds / 3600;

  const currentPhase: PhaseNumber = useMemo(() => {
    if (currentElapsedHours < 24) return 1;
    if (currentElapsedHours < 48) return 2;
    return 3;
  }, [currentElapsedHours]);

  // Phase transition encouraging notifications (non-sales, one soft line only)
  useEffect(() => {
    if (!startTime && simulatedElapsedSeconds === 0) return;

    if (currentElapsedHours >= 24 && !seenPopups['24h']) {
      setEncouragementType('phase1_done');
      setSeenPopups((prev) => ({ ...prev, '24h': true }));
    }

    if (currentElapsedHours >= 48 && !seenPopups['48h']) {
      setEncouragementType('phase2_done');
      setSeenPopups((prev) => ({ ...prev, '48h': true }));
    }
  }, [currentElapsedHours, startTime, simulatedElapsedSeconds, seenPopups]);

  // Timeline Notification Banner trigger (highest reached milestone not dismissed)
  const activeTimelineNotification: TimeTriggeredNotification | null = useMemo(() => {
    if (!startTime && simulatedElapsedSeconds === 0) return null;

    // Filter notifications whose triggerHour <= currentElapsedHours and !shownBanners[id]
    const candidates = TIME_TRIGGERED_NOTIFICATIONS.filter(
      (n) => currentElapsedHours >= n.triggerHour && !shownBanners[n.id]
    );

    if (candidates.length === 0) return null;
    // Return the highest milestone
    return candidates[candidates.length - 1];
  }, [currentElapsedHours, startTime, simulatedElapsedSeconds, shownBanners]);

  // Success Probability Calculation
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const totalChecklistCount = CHECKLIST_ITEMS.length;

  const successPercentage = useMemo(() => {
    if (accessLevel === 'completo') {
      return 89;
    }
    const boost = Math.round((completedChecklistCount / totalChecklistCount) * 16);
    return Math.min(70, 54 + boost);
  }, [completedChecklistCount, totalChecklistCount, accessLevel]);

  // Onboarding complete handler
  const handleOnboardingComplete = (email: string, derivedName: string) => {
    setUserEmail(email);
    setUserName(derivedName);
    // Show welcome popup right after onboarding
    setEncouragementType('welcome');
  };

  // Handlers
  const handleStartProtocol = () => {
    setStartTime(Date.now());
    setSimulatedElapsedSeconds(0);
    neuroAudio.playVictoryChime();
  };

  const handleResetProtocol = () => {
    if (window.confirm('¿Reiniciar el cronómetro de 72 horas?')) {
      setStartTime(null);
      setSimulatedElapsedSeconds(0);
      setCurrentElapsedSeconds(0);
    }
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddImpulseLog = (intensity: number, trigger: string, note?: string) => {
    const newEntry: ImpulseLog = {
      id: `log_${Date.now()}`,
      timestamp: Date.now(),
      intensity,
      trigger,
      note,
    };
    setImpulseJournal((prev) => [...prev, newEntry]);
  };

  const handleSimulateJump = (targetHours: number) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setSimulatedElapsedSeconds(Math.round(targetHours * 3600));
  };

  const handleUpdateUser = (newName: string, newEmail: string) => {
    setUserName(newName);
    setUserEmail(newEmail);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail(null);
    setUserName(null);
    setStartTime(null);
    setSimulatedElapsedSeconds(0);
    setChecklist({});
    setAccessLevel('basico');
    setImpulseJournal([]);
    setShownBanners({});
    setSeenPopups({});
    setCurrentElapsedSeconds(0);
    setIsProfileModalOpen(false);
  };

  const handleDismissBanner = (bannerId: string) => {
    setShownBanners((prev) => ({
      ...prev,
      [bannerId]: true,
    }));
  };

  const handleBannerAction = (notification: TimeTriggeredNotification) => {
    handleDismissBanner(notification.id);
    setActiveTab(notification.targetTab);
    if (notification.targetScriptPackageId) {
      setTargetPackageId(notification.targetScriptPackageId);
    }
  };

  const handleNavigateToPackage4 = () => {
    setActiveTab('herramientas');
    setTargetPackageId('pkg_conflictos');
  };

  // If user has not entered email, render full-screen onboarding
  if (!userEmail) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  const displayName = userName || 'Carlos';

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-500/[0.03] rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-amber-500/[0.02] rounded-full blur-[120px]" />
      </div>

      {/* Mobile-first centered container */}
      <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col relative z-10 bg-[#070b14] border-x border-white/[0.06] shadow-2xl">
        {/* Top Header */}
        <TopBar
          userName={displayName}
          isProtocolActive={startTime !== null}
          currentPhase={currentPhase}
          isUnlocked={accessLevel === 'completo'}
          onOpenPanic={() => setIsPanicModalOpen(true)}
          onToggleDevBar={() => setIsDevBarOpen((prev) => !prev)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        {/* In-App Timeline Notification Banner (4h, 12h, 24h, 36h, 48h, 66h) */}
        {activeTimelineNotification && (
          <TimelineNotificationBanner
            notification={activeTimelineNotification}
            accessLevel={accessLevel}
            onDismiss={handleDismissBanner}
            onActionClick={handleBannerAction}
          />
        )}

        {/* Dev / Testing Toolbar */}
        <DevBar
          isOpen={isDevBarOpen}
          onClose={() => setIsDevBarOpen(false)}
          onSimulateJump={handleSimulateJump}
          onToggleUnlocked={() => setAccessLevel((prev) => (prev === 'completo' ? 'basico' : 'completo'))}
          isUnlocked={accessLevel === 'completo'}
          onTriggerModal={(type) => setEncouragementType(type)}
          onResetAll={handleLogout}
          currentElapsedHours={currentElapsedHours}
        />

        {/* Main Content by Tab */}
        <main className="flex-1 px-4 py-4 space-y-5 pb-28">
          {/* TAB 1: INICIO (Dashboard: Linear Guided Journey, Timer, Community, Panic, Gauge) */}
          {activeTab === 'inicio' && (
            <>
              {/* Simulated Live Community (Weekly Scale) */}
              <CommunityWidget
                variant="dashboard"
                onOpenPaywall={accessLevel === 'completo' ? () => {} : () => setIsPaywallModalOpen(true)}
              />

              {/* Pillar 1: Cronómetro Neuroquímico y Tarjeta de Fase con "Próximo Paso" */}
              <CountdownHero
                startTime={startTime}
                elapsedSeconds={currentElapsedSeconds}
                currentPhase={currentPhase}
                onStart={handleStartProtocol}
                onReset={handleResetProtocol}
                onOpenPreparation={(phase) => setPreparationModalPhase(phase)}
              />

              {/* Pillar 3: Botón de Emergencia Anti-Pánico */}
              <div className="pt-1">
                <button
                  onClick={() => setIsPanicModalOpen(true)}
                  className="w-full min-h-[48px] py-4 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-rose-950/60 hover:shadow-rose-600/30 active:scale-[0.98] transition-all glow-red border border-rose-400/30"
                >
                  <HeartPulse className="w-5 h-5 text-rose-200 animate-pulse" />
                  <span className="uppercase">😰 Siento Ansiedad / Quiero Mandar Mensaje</span>
                </button>
              </div>

              {/* Pillar 2: Medidor de Probabilidad de Éxito */}
              <SuccessGauge
                percentage={successPercentage}
                completedItemsCount={completedChecklistCount}
                totalItemsCount={totalChecklistCount}
                accessLevel={accessLevel}
              />

              {/* Quick Checklist Progress Card */}
              <div className="glass-panel rounded-3xl p-4 sm:p-5 text-left flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Checklist de Disciplina 72H</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {completedChecklistCount} de {totalChecklistCount} micro-acciones registradas
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="min-h-[40px] py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 flex items-center gap-1 shrink-0 transition-colors active:scale-95"
                >
                  <span>Ver Hábitos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Impulse Journal Card */}
              <div className="glass-panel rounded-3xl p-4 sm:p-5 text-left flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Diario de Impulsos</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {impulseJournal.length > 0 
                      ? `${impulseJournal.length} episodios procesados con templanza`
                      : 'Registra tus impulsos para calmar el sistema nervioso'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="min-h-[40px] py-1.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center gap-1 shrink-0 transition-colors active:scale-95"
                >
                  <span>Abrir Diario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {/* TAB 2: CHECKLIST (Daily Habits & Therapeutic Impulse Journal) */}
          {activeTab === 'checklist' && (
            <>
              <ChecklistSection
                checklist={checklist}
                currentPhase={currentPhase}
                onToggleItem={handleToggleChecklistItem}
                onMilestonePhase1Trigger={() => setEncouragementType('milestone_phase1')}
              />

              <ImpulseJournal
                logs={impulseJournal}
                onAddLog={handleAddImpulseLog}
              />
            </>
          )}

          {/* TAB 3: HERRAMIENTAS (Hub: Lessons, Community, Central de Scripts Acelerador 89%, Audios, Code Unlock) */}
          {activeTab === 'herramientas' && (
            <HubTab
              userName={displayName}
              accessLevel={accessLevel}
              onOpenPaywall={() => setIsPaywallModalOpen(true)}
              onOpenAccessCode={() => setIsAccessCodeModalOpen(true)}
              onOpenPanicBreathing={() => setIsPanicModalOpen(true)}
              initialPackageId={targetPackageId}
            />
          )}
        </main>

        {/* Bottom 3-Tab Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          unlocked={accessLevel === 'completo'}
        />
      </div>

      {/* Modals & Dialogs */}
      <PanicModal
        userName={displayName}
        accessLevel={accessLevel}
        isOpen={isPanicModalOpen}
        onClose={() => setIsPanicModalOpen(false)}
        onNavigateToHub={() => setActiveTab('herramientas')}
        onNavigateToPackage4={handleNavigateToPackage4}
        onLogImpulse={handleAddImpulseLog}
      />

      <PaywallModal
        userName={displayName}
        isOpen={isPaywallModalOpen && accessLevel !== 'completo'}
        onClose={() => setIsPaywallModalOpen(false)}
        onUnlockCompleted={() => {
          setAccessLevel('completo');
          neuroAudio.playVictoryChime();
        }}
        isUnlocked={accessLevel === 'completo'}
      />

      <AccessCodeModal
        isOpen={isAccessCodeModalOpen}
        onClose={() => setIsAccessCodeModalOpen(false)}
        onCodeSuccess={() => {
          setAccessLevel('completo');
        }}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userName={displayName}
        userEmail={userEmail}
        startTime={startTime}
        currentPhase={currentPhase}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout}
      />

      {preparationModalPhase && (
        <MessagePreparationModal
          phase={preparationModalPhase}
          isOpen={!!preparationModalPhase}
          onClose={() => setPreparationModalPhase(null)}
          onOpenProtocolOffer={() => {
            setPreparationModalPhase(null);
            if (accessLevel !== 'completo') {
              setIsPaywallModalOpen(true);
            } else {
              setActiveTab('herramientas');
            }
          }}
        />
      )}

      <EncouragementModal
        type={encouragementType}
        userName={displayName}
        onClose={() => setEncouragementType(null)}
        onNavigateToHub={() => setActiveTab('herramientas')}
        onStartProtocol={handleStartProtocol}
      />
    </div>
  );
}
