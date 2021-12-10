import fetch from 'node-fetch';
import type { ParsedQs } from 'node-fetch';

import { BASE_API_URL, API_KEY } from '../constants';

import type { TMDBResponse } from '../domains/movies/types';

const Client = ({
    getPopular: () => fetch(`${BASE_API_URL}/movie/popular`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        }
    }),
    search: (query) => fetch(`${BASE_API_URL}/search/movie?query=${query}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    }),
});

interface IMovieClient {
    getPopularMovies: () => TMDBResponse
    searchMovies: (query: ParsedQs) =>TMDBResponse
}

export default {
    getPopularMovies: async () => {
        try {
            const response = await Client.getPopular();
            
            const {
                results,
                total_pages,
                total_results,
                page,
            } = await response.json();
            
            return {
                results,
                total_pages,
                total_results,
                page
            };
        } catch (error) {
            throw new Error(error);
        }
    },
    searchMovies: async ({ query }) => {
        try {
            const response = await Client.search(query);
            
            const {
                results,
                total_pages,
                total_results,
                page,
            } = await response.json();
            
            return {
                results,
                total_pages,
                total_results,
                page
            };
        } catch (error) {
            throw new Error(error);
        }
    },
} as IMovieClient;
