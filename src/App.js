import './App.css';
import Footer from './components/footer/Footer';
import Body from './components/body/Body';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline'>header</h1>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
