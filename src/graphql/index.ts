import { buildSchema } from 'graphql';

export const Schema = buildSchema(`
  type Movie {
    id: Int
    title: String
    poster_path: String
    overview: String
    vote_average: Float
    release_date: String
  }

  type PaginationShape {
    page: Int
    total_pages: Int
    total_results: Int
  }

  type ListResponse {
    results: [Movie]
    pagination: PaginationShape
  }
  
  type Query {
    getAllPopularMovies: ListResponse
    searchMovies(searchTerm: String, page: Int): ListResponse
    getMovieById(id: Int): Movie
  }
`);
