import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=23440499f9098805224f522526920786';
// get popular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/popular?${apiKey}&language=en-US&page=1`,
  );
  return resp.data.results;
};
// get upcoming movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/upcoming?${apiKey}&language=en-US&page=1`,
  );
  return resp.data.results;
};
export const getPopularTv = async () => {
  const resp = await axios.get(
    `${apiUrl}/tv/popular?${apiKey}&language=en-US&page=1`,
  );
  return resp.data.results;
};
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};
export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};
