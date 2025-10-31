import { configureStore } from '@reduxjs/toolkit'
import { getAuthorsApi, getLocationsApi, getPaintingsApi } from '@/api/api-cards'

export const store = configureStore({
  reducer: {
    [getPaintingsApi.reducerPath]: getPaintingsApi.reducer,
    [getAuthorsApi.reducerPath]: getAuthorsApi.reducer,
    [getLocationsApi.reducerPath]: getLocationsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(getPaintingsApi.middleware)
      .concat(getAuthorsApi.middleware)
      .concat(getLocationsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
