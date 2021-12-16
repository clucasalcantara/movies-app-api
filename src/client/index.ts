import fetch from 'node-fetch';
import type { ParsedQs } from 'node-fetch';
import { redisClient } from '../../redis';

import { BASE_API_URL, API_KEY } from '../constants';

import type { TMDBResponse } from '../domains/movies/types';

redisClient.connect();

const Client = ({
    getPopular: async () => {
        const requestedUrl = `${BASE_API_URL}/movie/popular`;

        const redisData = await redisClient.get(requestedUrl);

        if (redisData) return JSON.parse(redisData);

        const response = await fetch(requestedUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            }
        })
        
        const result = await response.json();
        
        redisClient.set(requestedUrl, JSON.stringify(result));

        return result;
    },
    search: async ({ searchTerm, requestedPage}) => {
        const requestedUrl = `${BASE_API_URL}/search/movie?query=${searchTerm}&page=${requestedPage}`;

        const redisData = await redisClient.get(requestedUrl);

        if (redisData) return JSON.parse(redisData);

        const response = await fetch(requestedUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        })
        
        const result = await response.json();
        
        redisClient.set(requestedUrl, JSON.stringify(result));

        return result;

    },
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
            const {
                results,
                total_pages,
                total_results,
                page,
            } = await Client.getPopular();

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
    searchMovies: async ({ searchTerm, requestedPage }) => {
        try {
            const  {
                results,
                total_pages,
                total_results,
                page,
            } = await Client.search({ searchTerm, requestedPage });
             
            
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
