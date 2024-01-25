import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://shazam-core.p.rapidapi.com/v1/charts/world";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c3840cee0mshfae3b724a45990cp1c8d45jsn60eeac48d444",
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "5c3840cee0mshfae3b724a45990cp1c8d45jsn60eeac48d444");
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      return headers;
    },
}),
endpoints: (builder) => ({
  getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
  getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
  getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
  getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
  getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
  getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
  getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
}),
});

export const {
useGetTopChartsQuery,
useGetSongsByGenreQuery,
useGetSongsByCountryQuery,
useGetSongsBySearchQuery,
useGetArtistDetailsQuery,
useGetSongDetailsQuery,
useGetSongRelatedQuery,
} = shazamCoreApi;