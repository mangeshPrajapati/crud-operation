import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import Create from './components/Create';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Update from './components/Update';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/edit/:id' element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;