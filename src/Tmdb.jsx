const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

const TMDBApi = {
  getHomeList: async () => {
    const homeList = [
      {
        slug: 'originals',
        title: 'Netflix Originals',
        items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: 'Popular on Netflix',
        items: await basicFetch(`/trending/all/week?language=en&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Trending Now',
        items: await basicFetch(`/movie/top_rated?language=en&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Action',
        items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comedies',
        items: await basicFetch(`/discover/movie?with_genres=35&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Horror',
        items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&api_key=${API_KEY}`)
      },
      {
        slug: 'documentaries',
        title: 'Documentaries',
        items: await basicFetch(`/discover/movie?with_genres=99&api_key=${API_KEY}`)
      }
    ];
    return homeList;
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=en-USA&api_key=${API_KEY}`);
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=en-USA&api_key=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  }
}

export default TMDBApi;