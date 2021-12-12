## TMDB GraphQL API Example

## Getting Started

First, configure the ENV file adding a .env following the env.example. (NOTE: If you don't specify a port the API will be running on the 3001 port)

After that you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001/graphql](http://localhost:3001/graphql) with your browser to see the graphiQL interface.

All the docs are added in the GraphiQL environment.

## Available Queries

```graphql
query getAllPopularMovies {
  getAllPopularMovies {
    results {
      id
      title
      poster_path
    }
  }
}

query searchMovies {
  searchMovies(query: "venom") {
    results {
      id
      title
      poster_path
    }
    pagination {
      total_results
    }
  }
}

query getMovieById {
  getMovieById(id: 580489) {
     	id
      title
      poster_path
      overview
      vote_average
      release_date
  }
}
```