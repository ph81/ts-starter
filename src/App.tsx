import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/new-book" element={<AddBook />} />
        <Route path="/update-book/:id" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
