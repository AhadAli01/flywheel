import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Dashboard from './screens/DashboardScreen';
import SellVehicle from './screens/SellVehicleScreen';
//import Dashboard from './screens/Dashboard';
const userStorageExists = localStorage.length;

// !MAKE SURE YOU GUYS GIT PULL BEFORE AND AFTER EVERYTIME YOU MAKE A CHANGE

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/auction/:id' component={VehicleScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/sell' component={SellVehicle} />
          <Route
            path='/dashboard'
            component={() => <Dashboard auth={userStorageExists} />}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
