import { Card } from 'react-bootstrap';
import { FAVOURITE_MOVIES } from '../constants/constants';
import IMovie from '../model/IMovie';
import AddToFavourite from './add-to-favourite';
import RemoveFavourite from './remove-favourite';
import MovieMoreInfo from './movie-more-info';

type MovieModel = {
  movie: IMovie;
  url: string;
  removeMovieFromFavourite : () => void;
}

function MovieCard({ movie, url, removeMovieFromFavourite }: MovieModel) {
  let isFavourite: Boolean = false;
  if ((url) === FAVOURITE_MOVIES) {
    isFavourite = true;
  }

  return (
    <Card style={{ width: '17rem', height: '26rem' }}>
      <Card.Img variant="top" src={movie.posterurl} style={{ height: '17rem' }} key={movie.id} alt={movie.title} onClick={() => alert({movie})} />
      <Card.Body>
        <div className="d-flex align-items-start" style={{ gap: '20px' }}>
          <div>
            <Card.Title onClick={() => MovieMoreInfo({movie})}>
              {movie.title}
            </Card.Title>
          </div>
          <MovieMoreInfo movie={movie} />
        </div>

        <div className="position-absolute bottom-0">
          {
            isFavourite && (<RemoveFavourite movie={movie} url={url} removeMovieFromFavourite={removeMovieFromFavourite} />)
          }
          {
            !isFavourite && (<AddToFavourite movie={movie} movieCategory={url} />)
          }
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;