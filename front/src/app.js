import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App( {authService} ) {
  const [cards,setCards] = useState([]);
  const [name, setName] = useState();

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService}/>
          </Route>

          <Route path="/maker">
            <Maker/>
          </Route>
          
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;

