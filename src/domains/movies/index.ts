import MovieClient from '../../client';

import type { Response } from './types';

interface IMovies {
    getAllPopularMovies: () => Response;
    searchMovies: (query: { query: string }) => Response;
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

const searchMovies = async ({ query }: { query: string }) => {
    const { results, page, total_pages, total_results  } = await MovieClient.searchMovies({ query });

    return {
        results,
        pagination: {
            page,
            total_pages,
            total_results,
        }
    };
};

export default {
    getAllPopularMovies,
    searchMovies,
} as IMovies;
