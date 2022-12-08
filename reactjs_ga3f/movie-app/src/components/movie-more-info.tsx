import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IMovie from '../model/IMovie';
import MovieDetails from './movie-details';

type MovieMoreInfoModel = {
  movie : IMovie;
}

function MovieMoreInfo( {movie} : MovieMoreInfoModel) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={({ marginBottom: '0.8rem', fontSize: '.9em' })}>
        <Button  onClick = { handleShow} style={{ width: '4em' }} className="btn btn-primary btn-sm">more</Button>
      </div>

      <Modal show={show} onHide={handleClose} fullscreen ={true}>
        <Modal.Header closeButton>
        <Modal.Title style={{marginLeft:'2.2em', fontSize:'5em'}}>{movie.title} ({movie.year})</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:'1em'}}>
          <MovieDetails movie={movie} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} style={{position:'relative', left:'-45%', width: '13em', backgroundColor:'red', borderColor:'red'}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MovieMoreInfo;