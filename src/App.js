import './App.css';
import Footer from './components/footer/Footer';
import Body from './components/body/Body';
import Header from './components/header/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import Contextprovider from './components/store/Contextprovider';
import { useDispatch } from 'react-redux';
import { authActions } from '../src/store/index.js'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const router = createBrowserRouter([
  {path:'/Expense-Tracker-2', element: <HomePage/>},
  {path:'/Expense-Tracker-2/profile', element: <ProfilePage/>},
  {path:'/Expense-Tracker-2/auth', element: <Body/>}
])
function App() {
  const userlocalId = localStorage.getItem('localId')
  const isDark = useSelector(state => state.theme.isDarkmode)
  const dispatch = useDispatch()

  useEffect(()=> {
    {userlocalId && dispatch(authActions.login())}
    {!userlocalId && dispatch(authActions.logout())}
  },[userlocalId])

  return (
    <Contextprovider>
    <div className={`App ${isDark && 'bg-black'}`}>
      <Header/>
      <RouterProvider router={router}/>
      <Footer/>
    </div>
    </Contextprovider>
  );
}

export default App;
