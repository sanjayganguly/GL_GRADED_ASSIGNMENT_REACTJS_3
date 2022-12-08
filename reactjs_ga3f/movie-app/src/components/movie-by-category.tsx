import { Component } from "react";
import { Alert, Row, Col, Spinner } from 'react-bootstrap';
import { RouteComponentProps } from "react-router-dom";
import { FAVOURITE_MOVIES, MOVIES_COMING, MOVIES_IN_THEATERS, TOP_RATED_MOVIES, TOP_RATED_MOVIES_INDIA } from "../constants/constants";
import IMovie from "../model/IMovie";
import { getMoviesByCategory } from "../services/movies";
import { LoadingStatus } from "../utils/types";
import MovieCard from "./movie-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type State = {
    status: LoadingStatus,
    movies?: IMovie[],
    moviesToShow?: IMovie[],
    error?: Error,
    searchString: string
}

type Props = {
    moviesCategory: string
}

class MoviesByCategory extends Component<RouteComponentProps<Props>, State> {

    state: State = {
        status: 'LOADING',
        searchString: ''
    };

    updateValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;

        this.setState(
            state => {
                return {
                    searchString: value
                }
            },
            () => {
                this.searchMovie(this.state.searchString);
            }
        )
    }

    searchMovie(searchString: string) {
        this.setState({
            status: 'LOADING'
        });

        const moviesToShow = this.state.movies?.filter(x => {
            return x.title.toLowerCase().includes(searchString.toLowerCase());
        })
        this.setState({
            status: 'LOADED',
            moviesToShow
        });
    }

    async componentDidMount() {
        await this.reloadMovieList();
    }

    async componentDidUpdate(prevProps: RouteComponentProps<Props>) {
        if (this.props.match.params.moviesCategory !== prevProps.match.params.moviesCategory) {
            await this.reloadMovieList();
        }
    }

    reloadMovieList = async () => {
        this.setState({
            status: 'LOADING'
        });

        try {
            const movies = await getMoviesByCategory(this.props.match.params.moviesCategory);
            const moviesToShow = movies;
            this.setState({
                status: 'LOADED',
                movies,
                moviesToShow
            });
        } catch (error) {
            this.setState({
                status: 'ERROR',
                error: error as Error
            });
        }
    }

    moviePageTitleByCategory = (url: string) => {
        switch (url) {
            case MOVIES_IN_THEATERS:
                return "Movies in thaters";

            case MOVIES_COMING:
                return "Coming soon movies";

            case TOP_RATED_MOVIES_INDIA:
                return "Top rated Indian movies";

            case TOP_RATED_MOVIES:
                return "Top reated movies";

            case FAVOURITE_MOVIES:
                return "Favourite movies";
        }
    }

    removeMovieFromFavourite = async () => {
        this.setState({
            status: 'LOADING'
        });
        const moviesToShow = await getMoviesByCategory(FAVOURITE_MOVIES);
        this.setState({
            status: 'LOADED',
            moviesToShow
        });
     }

    render() {
        const { status, moviesToShow, error, searchString } = this.state;
        let el;
        switch (status) {
            case 'LOADING':
                el = (
                    <>
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Fetching {this.moviePageTitleByCategory(this.props.match.params.moviesCategory)?.toLowerCase()}...</span>
                            </Spinner>
                        </div>
                    </>
                );
                break;

            case 'ERROR':
                <>
                    <Alert variant="danger">{error?.message}</Alert>
                </>
                break;

            case 'LOADED':
                el = (
                    <>
                        <Row>
                            <Col>
                                <h1> {this.moviePageTitleByCategory(this.props.match.params.moviesCategory)}</h1>
                            </Col>
                            <Col>
                       
                            </Col>

                            <Col>
                            
                                <input
                                    placeholder={`Search movies in ${this.moviePageTitleByCategory(this.props.match.params.moviesCategory)}`}
                                    className='me-6'
                                    value={searchString}
                                    onChange={this.updateValue}
                                    style={{ width: '25em', height: '2.5em', marginTop:'10px'}}
                                />
                            </Col>
                        </Row>


                        <hr />
                        <Row xs={1} md={3} lg={5}>
                            {
                                moviesToShow?.map(
                                    (movie) => (
                                        <Col key={movie.id} className="d-flex my-2">
                                            <MovieCard movie={movie} url={this.props.match.params.moviesCategory} removeMovieFromFavourite={this.removeMovieFromFavourite}/>
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
                );
                break;

            default:
                break;
        }

        return el;
    };
}

export default MoviesByCategory; 