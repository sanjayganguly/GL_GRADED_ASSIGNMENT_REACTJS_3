import React from "react";
import { Button } from "react-bootstrap";
import IMovie from "../model/IMovie";
import { FAVOURITE_MOVIES } from "../constants/constants"
import { getIdOfLastMovie, getMovieByCategoryAndID, getMovieByTitleAndYear, addMovieByCategory } from "../services/movies";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type MovieModel = {
    movie: IMovie;
    movieCategory: string;
}

function AddToFavourite({ movie, movieCategory }: MovieModel) {

    return (
        <React.Fragment>
            <div style={({ marginBottom: '0.8rem', fontSize: '.9em' })}>
                <Button onClick={() => { addFavouriteMovie(movie.id, movieCategory) }} key={movie.title} style={{ width: '13em' }}> <FontAwesomeIcon
                    icon={faHeart}
                    className="me-2"
                    style={{ color: "red" }}
                ></FontAwesomeIcon> {` Add to Favourite`}</Button>
            </div>
        </React.Fragment>

    )
};

async function addFavouriteMovie(id: number, movieCategory: string) {
    try {

        const favouriteMovie: IMovie = await getMovieByCategoryAndID(movieCategory, id);
        const movieByTitleAndYear = await getMovieByTitleAndYear(favouriteMovie.title, favouriteMovie.year);

        if (movieByTitleAndYear !== null) {
            toast.error(`"${favouriteMovie.title}" movie already added to favourites !!!`);
            return;
        }

        const lastMovieID: number = await getIdOfLastMovie(FAVOURITE_MOVIES);
        favouriteMovie.id = lastMovieID + 1;
        await addMovieByCategory(favouriteMovie, FAVOURITE_MOVIES);
        toast.success(`${favouriteMovie.title}" movie successfully added to favourites !!!`);
    }
    catch (error: any) {
        toast.error(`Error while adding movie to favourites !!!`);
    }
}

export default AddToFavourite;