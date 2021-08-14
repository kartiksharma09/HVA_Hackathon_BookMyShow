import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/navbar';
import Landing from './component/layout/landing';
import Cards from './component/layout/card';
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken' 
import Footer from './component/layout/footer';
import { AdminDashBoard } from './component/Admin/adminDashBoard';
import Alerts from "./component/layout/Alerts";
import HomePage from './component/User/HomePage';
import {getAllMovies} from './actions/movie';
import Adminlanding  from './component/Admin/Adminlandin';
import AdminRegister  from './component/admin-auth/AdminRegister'
import AdminLogin from './component/admin-auth/AdminLogin';
import AddMovie from './component/Admin/AddMovie';
import AdminRoute from "./component/routing/AdminRoute";
import Movie from './component/movies/Movie';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getAllMovies());
  },[])

  return (
    <Provider store={store}>
    <Router>
      <Fragment>
      <Alerts />
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/' component={Cards} />
        <Switch>
          <Route exact path='/admin-landing' component={Adminlanding} />
          <Route exact path='/admin-register' component={AdminRegister} />
          <Route exact path='/admin-login' component={AdminLogin} />
          <Route exact path="/movie/:movieName" component={Movie} />
          <Route exact path="/homepage" component={HomePage} />
          <AdminRoute exact path='/addMovie' component={AddMovie} />
          <AdminRoute exact path='/adminDashBoard' component={AdminDashBoard} />
        </Switch>
        <Footer/>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
