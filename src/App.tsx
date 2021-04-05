import React from 'react';
import {BrowserRouter as Switch, Route} from "react-router-dom"
import './App.css';
import GuidePage from "./pages/GuidePage";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import ContentPage from "./pages/ContentPage";
import MyPage from "./pages/MyPage";
import PayPage from "./pages/PayPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <GuidePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/test">
          <TestPage />
        </Route>
        <Route exact path="/list">
          <ListPage />
        </Route>
        <Route exact path="/content">
          <ContentPage />
        </Route>
        <Route exact path="/mypage">
          <MyPage />
        </Route>
        <Route exact path="/pay">
          <PayPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
