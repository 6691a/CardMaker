import { useState } from 'react';
import './app.css';
import Login from './components/login/login';

function App( {authService} ) {
  const [cards,setCards] = useState([]);
  const [name, setName] = useState();

  return (
    <div className="App">
      <Login authService={authService}/>
    </div>
  );
}

export default App;

