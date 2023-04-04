import './App.css';
import Footer from './components/footer/Footer';
import Body from './components/body/Body';
import Header from './components/header/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import Contextprovider from './components/store/Contextprovider';
import ForgotpassForm from './components/body/ForgotpassForm';

const router = createBrowserRouter([
  {path:'/', element:<Body/>},
  {path:'/home', element: <HomePage/>},
  {path:'/profile', element: <ProfilePage/>},
  {path:'/forgotpass', element: <ForgotpassForm/>},
])
function App() {
  return (
    <Contextprovider>
    <div className="App">
      <Header/>
      <RouterProvider router={router}/>
      <Footer/>
    </div>
    </Contextprovider>
  );
}

export default App;
