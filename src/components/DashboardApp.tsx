import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { 
  HeartPulse, BookOpen, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { TopBar } from './TopBar';
import { BottomNavBar } from './BottomNavBar';
import { CountdownHero } from './CountdownHero';
import { SuccessGauge } from './SuccessGauge';
import { CommunityWidget } from './CommunityWidget';
import { TimelineNotificationBanner } from './TimelineNotificationBanner';
import { CHECKLIST_ITEMS, TIME_TRIGGERED_NOTIFICATIONS } from '../data/protocolData';
import { PhaseNumber, ImpulseLog, AccessLevel, TimeTriggeredNotification } from '../types/protocol';

// Lazy-loaded heavy tabs and modals to ensure instant initial dashboard mount
const ChecklistSection = lazy(() => import('./ChecklistSection').then(m => ({ default: m.ChecklistSection })));
const ImpulseJournal = lazy(() => import('./ImpulseJournal').then(m => ({ default: m.ImpulseJournal })));
const HubTab = lazy(() => import('./HubTab').then(m => ({ default: m.HubTab })));

const PanicModal = lazy(() => import('./PanicModal').then(m => ({ default: m.PanicModal })));
const PaywallModal = lazy(() => import('./PaywallModal').then(m => ({ default: m.PaywallModal })));
const AccessCodeModal = lazy(() => import('./AccessCodeModal').then(m => ({ default: m.AccessCodeModal })));
const ProfileModal = lazy(() => import('./ProfileModal').then(m => ({ default: m.ProfileModal })));
const MessagePreparationModal = lazy(() => import('./MessagePreparationModal').then(m => ({ default: m.MessagePreparationModal })));
const EncouragementModal = lazy(() => import('./EncouragementModal').then(m => ({ default: m.EncouragementModal })));
const DevBar = lazy(() => import('./DevBar').then(m => ({ default: m.DevBar })));

const STORAGE_PREFIX = 'protocolo_72h_v3_';

interface DashboardAppProps {
  userEmail: string;
  userName: string | null;
  onLogout: () => void;
  onUpdateUser: (name: string, email: string) => void;
}

export const DashboardApp: React.FC<DashboardAppProps> = ({
  userEmail,
  userName,
  onLogout,
  onUpdateUser,
}) => {
  // Developer mode flag: strictly isolated behind ?dev=1 query parameter, never exposed to users
  const isDevMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1';

  // --- 1. ACCESS SYSTEM ---
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const accessParam = params.get('access');
        if (accessParam && accessParam.toLowerCase() === 'protocolo') {
          localStorage.setItem('accessLevel', 'completo');
          localStorage.setItem(`${STORAGE_PREFIX}accessLevel`, 'completo');
          return 'completo';
        }
      } catch {
        // ignore
      }
    }
    try {
      const saved = localStorage.getItem('accessLevel') || localStorage.getItem(`${STORAGE_PREFIX}accessLevel`);
      return saved === 'completo' ? 'completo' : 'basico';
    } catch {
      return 'basico';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('accessLevel', accessLevel);
      localStorage.setItem(`${STORAGE_PREFIX}accessLevel`, accessLevel);
    } catch {
      // ignore
    }
  }, [accessLevel]);

  // --- 2. Persistent Protocol State ---
  const [startTime, setStartTime] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('startTime') || localStorage.getItem(`${STORAGE_PREFIX}startTime`);
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [simulatedElapsedSeconds, setSimulatedElapsedSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}simulatedSecs`);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('checklist') || localStorage.getItem(`${STORAGE_PREFIX}checklist`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [impulseJournal, setImpulseJournal] = useState<ImpulseLog[]>(() => {
    try {
      const saved = localStorage.getItem('impulseJournal') || localStorage.getItem(`${STORAGE_PREFIX}impulseJournal`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shownBanners, setShownBanners] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('shownBanners') || localStorage.getItem(`${STORAGE_PREFIX}shownBanners`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [seenPopups, setSeenPopups] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_PREFIX}seenPopups`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // --- 3. Ephemeral Navigation & Modals ---
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
  const [currentElapsedSeconds, setCurrentElapsedSeconds] = useState<number>(() => {
    if (!startTime) return simulatedElapsedSeconds;
    const realSeconds = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, realSeconds + simulatedElapsedSeconds);
  });

  // Persistence effects safely wrapped
  useEffect(() => {
    try {
      if (startTime !== null) {
        localStorage.setItem('startTime', String(startTime));
        localStorage.setItem(`${STORAGE_PREFIX}startTime`, String(startTime));
      } else {
        localStorage.removeItem('startTime');
        localStorage.removeItem(`${STORAGE_PREFIX}startTime`);
      }
    } catch {}
  }, [startTime]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}simulatedSecs`, String(simulatedElapsedSeconds));
    } catch {}
  }, [simulatedElapsedSeconds]);

  useEffect(() => {
    try {
      localStorage.setItem('checklist', JSON.stringify(checklist));
      localStorage.setItem(`${STORAGE_PREFIX}checklist`, JSON.stringify(checklist));
    } catch {}
  }, [checklist]);

  useEffect(() => {
    try {
      localStorage.setItem('impulseJournal', JSON.stringify(impulseJournal));
      localStorage.setItem(`${STORAGE_PREFIX}impulseJournal`, JSON.stringify(impulseJournal));
    } catch {}
  }, [impulseJournal]);

  useEffect(() => {
    try {
      localStorage.setItem('shownBanners', JSON.stringify(shownBanners));
      localStorage.setItem(`${STORAGE_PREFIX}shownBanners`, JSON.stringify(shownBanners));
    } catch {}
  }, [shownBanners]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}seenPopups`, JSON.stringify(seenPopups));
    } catch {}
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

  // Phase transition milestone triggers
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

  // Timeline Notification Banner trigger
  const activeTimelineNotification: TimeTriggeredNotification | null = useMemo(() => {
    if (!startTime && simulatedElapsedSeconds === 0) return null;

    const candidates = TIME_TRIGGERED_NOTIFICATIONS.filter(
      (n) => currentElapsedHours >= n.triggerHour && !shownBanners[n.id]
    );

    if (candidates.length === 0) return null;
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

  // Handlers
  const handleStartProtocol = () => {
    setStartTime(Date.now());
    setSimulatedElapsedSeconds(0);
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

  const displayName = userName || 'Carlos';

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Background ambient lighting - static CSS gradients (no GPU blur penalty) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.04) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.03) 0%, transparent 55%)'
        }}
      />

      {/* Mobile-first centered container (375px+ responsive width) */}
      <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col relative z-10 bg-[#070b14] border-x border-white/[0.06] shadow-2xl">
        {/* Top Header */}
        <TopBar
          userName={displayName}
          isProtocolActive={startTime !== null}
          currentPhase={currentPhase}
          isUnlocked={accessLevel === 'completo'}
          onOpenPanic={() => setIsPanicModalOpen(true)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />

        {/* In-App Timeline Notification Banner */}
        {activeTimelineNotification && (
          <TimelineNotificationBanner
            notification={activeTimelineNotification}
            accessLevel={accessLevel}
            onDismiss={handleDismissBanner}
            onActionClick={handleBannerAction}
          />
        )}

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
                  className="w-full min-h-[48px] py-4 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg shadow-rose-950/60 active:scale-[0.98] transition-transform glow-red border border-rose-400/30"
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
            <Suspense fallback={
              <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span>Cargando hábitos y diario...</span>
              </div>
            }>
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
            </Suspense>
          )}

          {/* TAB 3: HERRAMIENTAS (Hub: Lessons, Community, Central de Scripts Acelerador 89%, Audios, Code Unlock) */}
          {activeTab === 'herramientas' && (
            <Suspense fallback={
              <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span>Cargando Central de Scripts y Hub...</span>
              </div>
            }>
              <HubTab
                userName={displayName}
                accessLevel={accessLevel}
                onOpenPaywall={() => setIsPaywallModalOpen(true)}
                onOpenAccessCode={() => setIsAccessCodeModalOpen(true)}
                onOpenPanicBreathing={() => setIsPanicModalOpen(true)}
                initialPackageId={targetPackageId}
              />
            </Suspense>
          )}
        </main>

        {/* Bottom 3-Tab Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          unlocked={accessLevel === 'completo'}
        />
      </div>

      {/* Lazy Modals & Dialogs (mounted ONLY when opened) */}
      {isPanicModalOpen && (
        <Suspense fallback={null}>
          <PanicModal
            userName={displayName}
            accessLevel={accessLevel}
            isOpen={isPanicModalOpen}
            onClose={() => setIsPanicModalOpen(false)}
            onNavigateToHub={() => setActiveTab('herramientas')}
            onNavigateToPackage4={handleNavigateToPackage4}
            onLogImpulse={handleAddImpulseLog}
          />
        </Suspense>
      )}

      {isPaywallModalOpen && accessLevel !== 'completo' && (
        <Suspense fallback={null}>
          <PaywallModal
            userName={displayName}
            isOpen={isPaywallModalOpen}
            onClose={() => setIsPaywallModalOpen(false)}
            isUnlocked={false}
          />
        </Suspense>
      )}

      {isAccessCodeModalOpen && (
        <Suspense fallback={null}>
          <AccessCodeModal
            isOpen={isAccessCodeModalOpen}
            onClose={() => setIsAccessCodeModalOpen(false)}
            onCodeSuccess={() => {
              setAccessLevel('completo');
            }}
          />
        </Suspense>
      )}

      {isProfileModalOpen && (
        <Suspense fallback={null}>
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            userName={displayName}
            userEmail={userEmail}
            startTime={startTime}
            currentPhase={currentPhase}
            onUpdateUser={onUpdateUser}
            onLogout={onLogout}
          />
        </Suspense>
      )}

      {preparationModalPhase && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}

      {encouragementType && (
        <Suspense fallback={null}>
          <EncouragementModal
            type={encouragementType}
            userName={displayName}
            onClose={() => setEncouragementType(null)}
            onNavigateToHub={() => setActiveTab('herramientas')}
            onStartProtocol={handleStartProtocol}
          />
        </Suspense>
      )}

      {isDevMode && isDevBarOpen && (
        <Suspense fallback={null}>
          <DevBar
            isOpen={isDevBarOpen}
            onClose={() => setIsDevBarOpen(false)}
            onSimulateJump={handleSimulateJump}
            isUnlocked={accessLevel === 'completo'}
            onTriggerModal={(type) => setEncouragementType(type)}
            onResetAll={onLogout}
            currentElapsedHours={currentElapsedHours}
          />
        </Suspense>
      )}
    </div>
  );
};
