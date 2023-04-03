import './App.css';
import Footer from './components/footer/Footer';
import Body from './components/body/Body';
import Header from './components/header/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProfilePage from './components/pages/ProfilePage';
import Contextprovider from './components/store/Contextprovider';

const router = createBrowserRouter([
  {path:'/', element:<Body/>},
  {path:'/home', element: <HomePage/>},
  {path:'/profile', element: <ProfilePage/>},
])
function App() {
  return (
    <div className="App">
      <Contextprovider>
      <Header/>
      <RouterProvider router={router}/>
      <Footer/>
      </Contextprovider>
    </div>
  );
}

export default App;
