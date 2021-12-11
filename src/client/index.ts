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
    getMovieById: (id) => fetch(`${BASE_API_URL}/movie/${id}`, {
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
    getMovieById: (query: ParsedQs) =>TMDBResponse
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
    getMovieById: async ({ id }) => {
        try {  
            const response = await Client.getMovieById(id);
            
            const data = await response.json();
            
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
} as IMovieClient;
