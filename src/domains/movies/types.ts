export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

type PaginationShape = {
    page: number;
    total_pages: number;
    total_results: number;
}

export type Response = Promise<{ results: Movie[]; pagination: PaginationShape }>;

export type TMDBResponse = Promise<{ results: Movie[]; } & PaginationShape>;
