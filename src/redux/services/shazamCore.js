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
    getTopSongs: builder.query({
      query: () => "v1/charts/world",
    }),
  }),
});
 export const {
    useGetTopSongsQuery,
 } = shazamCoreApi;