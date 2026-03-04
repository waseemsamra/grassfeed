import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultHomeContent, type HomeContent } from '../data/homeContent';

const STORAGE_KEY = 'agrofeed_home_content_v1';

interface HomeContentContextValue {
  homeContent: HomeContent;
  updateHomeContent: (updates: Partial<HomeContent>) => void;
  resetHomeContent: () => void;
}

const HomeContentContext = createContext<HomeContentContextValue | undefined>(undefined);

function loadHomeContent(): HomeContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultHomeContent;
    return { ...defaultHomeContent, ...(JSON.parse(raw) as Partial<HomeContent>) };
  } catch {
    return defaultHomeContent;
  }
}

export const HomeContentProvider = ({ children }: { children: ReactNode }) => {
  const [homeContent, setHomeContent] = useState<HomeContent>(() => loadHomeContent());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homeContent));
  }, [homeContent]);

  const updateHomeContent = (updates: Partial<HomeContent>) => {
    setHomeContent((current) => ({ ...current, ...updates }));
  };

  const resetHomeContent = () => setHomeContent(defaultHomeContent);

  const value = useMemo(
    () => ({ homeContent, updateHomeContent, resetHomeContent }),
    [homeContent]
  );

  return <HomeContentContext.Provider value={value}>{children}</HomeContentContext.Provider>;
};

export const useHomeContent = () => {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error('useHomeContent must be used within HomeContentProvider');
  }
  return context;
};
