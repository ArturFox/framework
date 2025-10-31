import type { AxiosError } from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface QueryParams {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: unknown
  params?: unknown
}

function axiosBaseQuery({ baseUrl }: { baseUrl: string } = { baseUrl: '' }) {
  return async ({ url, method = 'GET', data, params }: QueryParams) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })

      return { data: result.data, meta: result }
    }
    catch (axiosError) {
      const err = axiosError as AxiosError

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
}

export interface Painting {
  id: number
  name: string
  created: string
  imageUrl: string
  authorId: number
  locationId: number
}

export interface Author {
  id: number
  name: string
}

export interface Location {
  id: number
  location: string
}

export const getPaintingsApi = createApi({
  reducerPath: 'getPaintingsApi',

  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),

  keepUnusedDataFor: 120,

  endpoints: builder => ({
    getAllPaintings: builder.query<
      { data: Painting[], totalCount: number },
      { page: number, limit: number, q: string }
    >({
      query: ({ page = 1, limit = 6, q = '' }) => ({
        url: `/paintings?_page=${page}&_limit=${limit}${q ? `&q=${q}` : ''}`,
      }),
      transformResponse: (response: Painting[], meta) => {
        const totalHeader = meta?.headers?.['x-total-count'] || meta?.headers?.['X-Total-Count']
        const totalCount = totalHeader ? Number(totalHeader) : response.length

        return { data: response, totalCount }
      },
    }),
  }),
})

export const getAuthorsApi = createApi({
  reducerPath: 'getAuthorsApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getAllAuthors: builder.query<Author[], void>({
      query: () => ({ url: '/authors' }),
    }),
  }),
})

export const getLocationsApi = createApi({
  reducerPath: 'getLocationsApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getAllLocations: builder.query<Location[], void>({
      query: () => ({ url: '/locations' }),
    }),
  }),
})

export const { useGetAllPaintingsQuery } = getPaintingsApi
export const { useGetAllAuthorsQuery } = getAuthorsApi
export const { useGetAllLocationsQuery } = getLocationsApi
