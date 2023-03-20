import './App.css';
import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Header from './screens/Header';
import Footer from './screens/Footer';
import WordGame from './screens/WordGame';
import DragNDropPuzzle from './components/dragNdrop/BigSquare';
import ImplementCardBoard from './components/ImplementCardBoard';
import ImplementQuiz from './components/ImplementQuiz'
import PicturePuzzle from './components/puzzlegame/PicturePuzzle';
import ImplementHangman from './components/hangman/ImplementHangman';
import Worlde from './dev/WordGame';
import Testpuzzle from './screens/testpuzzle';
import Jigsaw from './components/scramble/ImplementScramble';
import Electro from './components/electro/BigSquare';



function App() {
  // const [modalShow, setModalShow] = React.useState(false);
    
  return (  
    <>
      
      <BrowserRouter>
      <Header />  
        <Routes>
        <Route path='/t' element={<Testpuzzle/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />  
        <Route path='/' element={<Home/>} />
        <Route path='/wordle' element={<Worlde/>} />
        <Route path='/puzzle' element={<DragNDropPuzzle/>} />
        <Route path='/electro' element={<Electro/>} />
        <Route path='/activityBoard' element={<ImplementCardBoard/>} />
        <Route path='/wordgame' element={<WordGame/>} />
         <Route path='/hangman' element={<ImplementHangman/>} />
        <Route path='/quiz' element={<ImplementQuiz/>} />
        <Route path='/scramble' element={<Jigsaw/>} />
        <Route path='/picturePuzzle' element={<PicturePuzzle/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
  );
}

export default App;