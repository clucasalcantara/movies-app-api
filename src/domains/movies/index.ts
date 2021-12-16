import MovieClient from '../../client';

import type { Response, SearchRequestShape } from './types';

interface IMovies {
    getAllPopularMovies: () => Response;
    searchMovies: (searchRequest: SearchRequestShape) => Response;
}

const getAllPopularMovies = async () => {
    const { results, page, total_pages, total_results  } = await MovieClient.getPopularMovies();

    return {
        results,
        pagination: {
            page,
            total_pages,
            total_results,
        }
    };
};

const searchMovies = async ({ searchTerm, page: requestedPage }: SearchRequestShape) => {
    const { results, page, total_pages, total_results  } = await MovieClient.searchMovies({ searchTerm, requestedPage });

    return {
        results,
        pagination: {
            page,
            total_pages,
            total_results,
        }
    };
};

const getMovieById = async (id: number) => {
    const data = await MovieClient.getMovieById(id);

    return data;
};

export default {
    getAllPopularMovies,
    searchMovies,
    getMovieById,
} as IMovies;
