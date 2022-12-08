import React from "react";
import { Button } from "react-bootstrap";
import IMovie from "../model/IMovie";
import { FAVOURITE_MOVIES } from "../constants/constants"
import { removeMovieById } from "../services/movies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

type MovieModel = {
    movie: IMovie;
    url: string;
    removeMovieFromFavourite:() => void;
}

function RemoveFavourite({ movie, removeMovieFromFavourite }: MovieModel) {

    const msg = `"${movie.title}" movie successfully removed from favourites !!!`;
    return (
        <React.Fragment>
            <div style={({ marginBottom: '0.8rem', fontSize: '1em' })}>
                <Button onClick={() => { removeFavMovieAndUpdate(movie.id, FAVOURITE_MOVIES, msg, removeMovieFromFavourite) }} key={movie.title} style={{ width: '13em', backgroundColor: 'red', borderColor: 'red' }}>
                 <FontAwesomeIcon
                                icon={faRemove}
                                className="me-2"
                                style={{ color: "Black" }}
                            ></FontAwesomeIcon>{` Remove Favourite`} </Button>
            </div>
        </React.Fragment>

    )
};

const removeFavMovieAndUpdate = async (movieID : number, movieCat: string, msg: string, removeMovieFromFavourite : () => void) => {
    const removedMovie= await removeMovieById(movieID, movieCat, msg);
    removeMovieFromFavourite();
}

export default RemoveFavourite;