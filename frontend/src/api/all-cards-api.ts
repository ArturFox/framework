import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface Painting {
    id: number;
    name: string;
    created: string;
    imageUrl: string;
    authorId: number;
    locationId: number;
};

export interface Author {
    id: number;
    name: string;
};

export interface Location {
    id: number;
    location: string;
};

export const getPaintingsApi = createApi({
    reducerPath: 'getPaintingsApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    keepUnusedDataFor: 120,
    endpoints: (builder) => ({
        getAllPaintings: builder.query
        < 
            {data: Painting[]; totalCount: number},
            {page?: number; limit?: number; q?: string} 
        >
        ({
            query: ({page = 1, limit = 4, q = ''}) => ({
                url: `/paintings?_page=${page}&_limit=${limit}${q ? `&q=${q}` : ''}`,
            }),
            transformResponse: (response: Painting[], meta) => {
                const totalCount = Number(meta?.response?.headers.get('X-Total-Count') ?? 0);
                return { data: response, totalCount };
            },
            
        }),
    }),
});

export const getAuthorsApi = createApi({
    reducerPath: 'getAuthorsApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getAllAuthors: builder.query<Author[], void>({
            query: () => '/authors',
        }),
    }),
});

export const getLocationsApi = createApi({
    reducerPath: 'getLocationsApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        getAllLocations: builder.query<Location[], void>({
            query: () => '/locations',
        }),
    }),
});

export const { useGetAllPaintingsQuery } = getPaintingsApi;
export const { useGetAllAuthorsQuery} = getAuthorsApi;
export const { useGetAllLocationsQuery} = getLocationsApi;