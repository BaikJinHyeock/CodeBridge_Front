import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Test />}></Route>

      </Routes>

    </div>
  );
}

export default App;
