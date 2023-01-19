import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new-user" component={AddUser} />
        <Route exact path="/update-user/:userId" component={UpdateUser} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
