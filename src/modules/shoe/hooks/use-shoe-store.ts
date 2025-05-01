import { ShoeItems, ShoePart } from '@/types/shoe-part';
import { create } from 'zustand'

export interface ShoeStore {
  intro: boolean,
  current: ShoePart | null;
  items: ShoeItems;
  setCurrent: (part: ShoePart | null) => void;
  setItemColor: (part: ShoePart, color: string) => void;
  color: string,
  colors: string[],
  setIntro: (flag: boolean) => void
}



export const useShoeStore = create((set) => ({
  intro: true,
  setIntro: (flag: boolean) => {
    set({intro: flag})
  },
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
  color: '#EFBD4E',
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  setCurrent: (part: ShoePart) => set({ current: part }),
  setItemColor: (part: ShoePart, color: string) =>
    set((state: ShoeStore) => ({
      items: { ...state.items, [part]: color },
    })),
}))
