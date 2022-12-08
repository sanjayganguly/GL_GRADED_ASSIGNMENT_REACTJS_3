
import NavigationBar from './components/navigation-bar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import MoviesByCategory from './components/movie-by-category';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar />

      <Container className="my-2" >
        <Switch>
          <Route path="/:moviesCategory" component={MoviesByCategory} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}

export default App;