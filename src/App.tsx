import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route exact path="/new-book" component={AddBook} />
        <Route exact path="/update-book/:bookId" component={UpdateBook} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
