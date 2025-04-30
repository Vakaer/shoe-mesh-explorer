import { ShoeItems, ShoePart } from '@/types/shoe-part';
import { create } from 'zustand'

export interface ShoeStore {
  current: ShoePart | null;
  items: ShoeItems;
  setCurrent: (part: ShoePart | null) => void;
  setItemColor: (part: ShoePart, color: string) => void;
}

export const useShoeStore = create((set) => ({
  current: null,
  items: {
    laces: "#fff",
    mesh: "#fff",
    caps: "#fff",
    inner: "#fff",
    sole: "#fff",
    stripes: "#fff",
    band: "#fff",
    patch: "#fff",
  },
  setCurrent: (part: ShoePart) => set({ current: part }),
  setItemColor: (part: ShoePart, color: string) =>
    set((state: ShoeStore) => ({
      items: { ...state.items, [part]: color },
    })),
}))
