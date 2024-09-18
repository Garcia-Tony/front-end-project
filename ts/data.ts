/* exported data */
interface Data {
  view: 'movie-results' | 'search-form';
  movies: MovieResult[];
}

const dataKey = 'movie-search-data';

const data = readData();

function readData(): Data {
  const localData = localStorage.getItem(dataKey);
  if (localData) {
    return JSON.parse(localData) as Data;
  }
  return {
    view: 'search-form',
    movies: [],
  };
}

function writeData(): void {
  localStorage.setItem(dataKey, JSON.stringify(data));
}
