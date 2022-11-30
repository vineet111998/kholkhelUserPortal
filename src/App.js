import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Header from './screens/Header';
import Footer from './screens/Footer';
import WordGame from './screens/WordGame';
import DragNDropPuzzle from './screens/dragNdropPuzzle';
import ImplementCardBoard from './components/ImplementCardBoard';
import ImplementQuiz from './components/ImplementQuiz'
import PicturePuzzle from './components/puzzlegame/PicturePuzzle';
import ImplementHangman from './components/hangman/ImplementHangman';
import Worlde from './dev/WordGame';
import Testpuzzle from './screens/testpuzzle';
import Jigsaw from './drag';



function App() {
  // const [modalShow, setModalShow] = React.useState(false);
    
  return (  
    <>
    <div>
      <Header />  
      <BrowserRouter>
        <Routes>
        <Route path='/t' element={<Testpuzzle/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />  
        <Route path='/' element={<Home/>} />
        <Route path='/wordle' element={<Worlde/>} />
        <Route path='/puzzle' element={<DragNDropPuzzle/>} />
        <Route path='/activityBoard' element={<ImplementCardBoard/>} />
        <Route path='/wordgame' element={<WordGame/>} />
         <Route path='/hangman' element={<ImplementHangman/>} />
        <Route path='/quiz' element={<ImplementQuiz/>} />
        <Route path='/d' element={<Jigsaw/>} />
        <Route path='/picturePuzzle' element={<PicturePuzzle/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
      </div>
      </>
  );
}

export default App;