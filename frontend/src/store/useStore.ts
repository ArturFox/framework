import { create } from 'zustand'

interface StoreType {
  limit: number
  page: number
  setPage: (page: number) => void
  search: string
  setSearch: (search: string) => void
  isImagesLoading: boolean
  setIsImagesLoading: (isImagesLoading: boolean) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const myStore = create<StoreType>(set => ({
  page: 1,
  setPage: value => set({ page: value }),
  limit: 6,
  search: '',
  setSearch: value => set({ search: value }),
  isImagesLoading: true,
  setIsImagesLoading: value => set({ isImagesLoading: value }),
  theme: 'dark',
  setTheme: value => set({ theme: value }),
}))
