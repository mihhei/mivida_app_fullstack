import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LahjakorttiKauppa } from './components/lahjakorttikauppa';
import { KauppaTulos } from './components/kauppatulos';
import { ScrollingPage } from './components/scrollingpage';
import { ErrorTulos} from './components/errortulos';

export const useRoutes = () => {
  return (

    <Switch>
      <Route path="/" exact>
        <ScrollingPage />
      </Route>
      <Route path="/lahjakortti/kauppa" exact>
        <LahjakorttiKauppa />
      </Route>
      <Route path="/lahjakortti/kauppa/tulos/:code/:order/:message" exact>
        <KauppaTulos />
      </Route>
      <Route path="/lahjakortti/kauppa/tulos/error/:message" exact>
        <ErrorTulos />
      </Route>
      <Redirect to="/" />
    </Switch>

  );
};
