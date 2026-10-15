/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';

// Code-split the entire dashboard so the initial boot path stays feather-light (< 40KB gzip)
const DashboardApp = lazy(() => import('./components/DashboardApp').then(m => ({ default: m.DashboardApp })));

const STORAGE_PREFIX = 'protocolo_72h_v3_';

export default function App() {
  // --- 1. User State ---
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('userEmail') || localStorage.getItem(`${STORAGE_PREFIX}userEmail`);
    } catch {
      return null;
    }
  });

  const [userName, setUserName] = useState<string | null>(() => {
    try {
      return localStorage.getItem('userName') || localStorage.getItem(`${STORAGE_PREFIX}userName`);
    } catch {
      return null;
    }
  });

  // Preload dashboard code in idle time while user is on login screen
  useEffect(() => {
    if (!userEmail) {
      const preloadTimer = setTimeout(() => {
        import('./components/DashboardApp');
      }, 1000);
      return () => clearTimeout(preloadTimer);
    }
  }, [userEmail]);

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem(`${STORAGE_PREFIX}userEmail`, userEmail);
      } else {
        localStorage.removeItem('userEmail');
        localStorage.removeItem(`${STORAGE_PREFIX}userEmail`);
      }
    } catch {}
  }, [userEmail]);

  useEffect(() => {
    try {
      if (userName) {
        localStorage.setItem('userName', userName);
        localStorage.setItem(`${STORAGE_PREFIX}userName`, userName);
      } else {
        localStorage.removeItem('userName');
        localStorage.removeItem(`${STORAGE_PREFIX}userName`);
      }
    } catch {}
  }, [userName]);

  // Onboarding complete handler - purely synchronous state update
  const handleOnboardingComplete = (email: string, derivedName: string) => {
    setUserEmail(email);
    setUserName(derivedName);
  };

  const handleUpdateUser = (newName: string, newEmail: string) => {
    setUserName(newName);
    setUserEmail(newEmail);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch {}
    setUserEmail(null);
    setUserName(null);
  };

  // If user has not entered email, render lightweight onboarding screen
  if (!userEmail) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Once authenticated, mount code-split Dashboard
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between">
        <div className="w-full max-w-[480px] mx-auto min-h-screen flex flex-col bg-[#070b14] border-x border-white/[0.06] p-4 space-y-4">
          <div className="h-12 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-16 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-60 bg-white/5 rounded-3xl animate-pulse" />
          <div className="h-14 bg-rose-500/10 rounded-2xl animate-pulse" />
          <div className="h-32 bg-white/5 rounded-3xl animate-pulse" />
        </div>
      </div>
    }>
      <DashboardApp
        userEmail={userEmail}
        userName={userName}
        onLogout={handleLogout}
        onUpdateUser={handleUpdateUser}
      />
    </Suspense>
  );
}
