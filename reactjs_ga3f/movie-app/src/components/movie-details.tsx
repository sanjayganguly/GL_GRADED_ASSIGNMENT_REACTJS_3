import { Col, Row, Image } from "react-bootstrap";
import IMovie from "../model/IMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faMasksTheater, faUserGroup, faCalendarDay, faScroll } from "@fortawesome/free-solid-svg-icons";
type MovieDetailsModel = {
    movie: IMovie;
}

const MovieDetails = ({ movie }: MovieDetailsModel) => {

    return (
        <>
            <Row>
                <Col lg={1} />
                <Col xs={12} lg={2}>
                    <Image src={movie.posterurl} alt={movie.title} fluid style={{ height: "30em" }} />
                </Col>
                <Col xs={12} lg={8}>
                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faScroll}
                                className="me-2"
                            ></FontAwesomeIcon>
                            Story Line
                        </Col>
                        <Col lg={8}>
                            {movie.storyline}
                        </Col>
                    </Row>


                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faMasksTheater}
                                className="me-2"
                            ></FontAwesomeIcon>
                            Genres
                        </Col>
                        <Col lg={8}>
                            {getArrayToStringWithComma(movie.genres)}
                        </Col>
                    </Row>


                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faUserGroup}
                                className="me-2"
                            ></FontAwesomeIcon>
                            Actors
                        </Col>
                        <Col lg={8}>
                            {getArrayToStringWithComma(movie.actors)}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faClock}
                                className="me-2"
                            ></FontAwesomeIcon>
                            Runing Time
                        </Col>
                        <Col lg={8}>
                            {getTime(movie.duration)}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                className="me-2"
                            ></FontAwesomeIcon>
                            Release Date
                        </Col>
                        <Col lg={8}>
                            {getDate(movie.releaseDate)}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className="me-2"
                                style={{ color: "gold" }}
                            ></FontAwesomeIcon>
                            IMDB Rating
                        </Col>
                        <Col lg={8}>
                            {movie.imdbRating}
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '.75em' }}>
                        <Col lg={2}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className="me-2"
                                style={{ color: "black" }}
                            ></FontAwesomeIcon>
                            Average Ratings
                        </Col>
                        <Col lg={8}>
                            {getAverageRating(movie.ratings)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

const getArrayToStringWithComma = (array: string[]) => {
    let arrayToString: string = "";
    for (let index: number = 0; index < array.length - 1; index++) {
        arrayToString = arrayToString + array[index] + ", ";
    }
    arrayToString = arrayToString + array[array.length - 1];
    return arrayToString;
}

const getTime = (time: string) => {

    let number = time.substring(2, time.indexOf('M'));

    let timeInMinutes: number = parseInt(number);
    let hrs: number = (timeInMinutes - (timeInMinutes % 60)) / 60;
    let mins: number = timeInMinutes % 60;

    let timeInMin: string = `${hrs} hrs ${mins} mins (total ${timeInMinutes} mins)`;
    return timeInMin;
}

const getDate = (date: string) => {
    let newDate = "";
    let year = date.substring(0, date.indexOf('-'))

    let month = date.substring(date.indexOf('-')).substring(0, date.indexOf('-'))
    let day = date.substring(date.length - 2);
    for (let index: number = date.length - 1; index >= 0; index--) {
        newDate = newDate + date.charAt(index);
    }

    return `${day}${month}${year}`;
}

const getAverageRating = (ratings: number[]) => {
    let totalRating: number = 0;

    for (let index: number = 0; index < ratings.length; index++) {
        totalRating = totalRating + ratings[index];
    }
    totalRating = (totalRating / ratings.length) * 100;
    totalRating = totalRating - (totalRating % 1);
    return `${(totalRating / 100)} (${ratings.length} ratings)`;
}

export default MovieDetails;