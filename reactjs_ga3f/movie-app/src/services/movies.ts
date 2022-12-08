import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API_URL, FAVOURITE_MOVIES } from "../constants/constants";
import IMovie from "../model/IMovie";

const getMoviesByCategory = async (movieCategory : string) => {
    const movieURL = BASE_API_URL + "/" + movieCategory;
    const favouritMovies = await axios.get< IMovie [] >(movieURL);
    return favouritMovies.data;
}

const getMovieByCategoryAndID = async (movieCategory : string, id: number) => {
    const movieURL = BASE_API_URL + "/" + movieCategory + "/" + id;
    const movie = await axios.get< IMovie>(movieURL);
    return movie.data;
}

const getMoviesByCategoryAndID = async (movieCategory : string, id: number) => {
    const movieURL = BASE_API_URL + "/" + movieCategory + "/" + id;
    const movies = await axios.get< IMovie [] >(movieURL);
    return movies.data;
}

const getMovieByTitleAndYear = async (title: string, year : number) => {
    const response = await axios.get<IMovie[]>(
      `${BASE_API_URL}/${FAVOURITE_MOVIES}?title=${title}&year=${year}`
    );
    if (response.data === null || response.data.length === 0) {
      return null;
    }
    return response.data[0];
};

const getIdOfLastMovie = async (moviesCategory: string) => {

    const response = await axios.get<IMovie[]>(
      `${BASE_API_URL}/${moviesCategory}?_sort=id&_order=desc`
    );
  
    if (response.data === null || response.data.length === 0) {
      return 0;
    }
    return response.data[0].id ?? 0;
};

const addMovieByCategory = async (movie : IMovie, moviesCategory : string ) => {
    const favoriteMovies = await axios.post< IMovie> (
        `${BASE_API_URL}/${moviesCategory}`,
        movie, 
        {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
    );
    return favoriteMovies.data;
}

const removeMovieById = async (id: string | number, movieCategory:string, msg: string) => {
    const response = await axios.delete<IMovie>(
        `${BASE_API_URL}/${movieCategory}/${id}`
    );
    toast.success(msg);
    return response.data;
};

export {
    addMovieByCategory,
    getMoviesByCategory,
    getMovieByTitleAndYear,
    getMovieByCategoryAndID,
    getIdOfLastMovie,
    getMoviesByCategoryAndID,
    removeMovieById
};