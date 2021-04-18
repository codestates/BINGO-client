import React, { useState, useEffect } from "react";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import GuidePage from "./pages/GuidePage";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import ContentPage from "./pages/ContentPage";
import MyPage from "./pages/MyPage";
import PayPage from "./pages/PayPage";
import TestPage from "./pages/TestPage";
import axios from "axios";
import store from "./store";

function App() {

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <GuidePage />
        </Route>
        <Route exact path='/index.html/login'>
          <LoginPage />
        </Route>
        <Route exact path='/index.html'>
          <TestPage />
        </Route>
        <Route exact path='/index.html/list'>
          <ListPage />
        </Route>
        <Route exact path='/content'>
          <ContentPage />
        </Route>
        <Route exact path='/mypage'>
          <MyPage />
        </Route>
        <Route exact path='/pay'>
          <PayPage />
        </Route>
      </Switch>
      <script src="../src/main.js"></script>
    </div>
  );
}

export default App;
