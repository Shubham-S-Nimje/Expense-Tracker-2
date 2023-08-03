import './App.css';
import Footer from './components/footer/Footer';
import Body from './components/body/Body';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/body/ProfilePage';
import Contextprovider from './components/store/Contextprovider';
import { useDispatch } from 'react-redux';
import { authActions } from '../src/store/index.js';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const userlocalId = localStorage.getItem('localId');
  const isDark = useSelector(state => state.theme.isDarkmode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userlocalId) {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  }, []);

  return (
    <Contextprovider>
      <div className={`App ${isDark ? 'bg-black' : ''}`}>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/Expense-Tracker-2" component={HomePage} />
            <Route path="/Expense-Tracker-2/profile" component={ProfilePage} />
            <Route path="/Expense-Tracker-2/auth" component={Body} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </Contextprovider>
  );
}

export default App;
