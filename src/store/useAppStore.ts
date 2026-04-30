import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  lang: 'fr' | 'en'
  setLang: (lang: 'fr' | 'en') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'ema-store' }
  )
)