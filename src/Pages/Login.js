import logo from '../images/logo.png';
import './Design/logindesign.css';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export const Login = (props) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const history = useNavigate(); // Initialize useHistory

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, Email, Password);
      console.log('Logged in:', userCredential.user);

      // Redirect to the homepage after successful login
      history('/homepage'); // Call the function returned by useNavigate
    } catch (error) {
      console.log('Error logging in:', error.message);

      // Show an alert message when login fails
      window.alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <div className="containers">
          <div className="logo">
            <img alt="bodylogo" src={logo} />
          </div>
          <div className="word">
            <p>WELCOME</p>
          </div>
          <div className="login">
            <form onSubmit={signIn}>
              <label className="emailLabel" htmlFor="Email">Email</label>
              <br />
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                id="Email"
                name="Email"
                className="emailInput"
              />
              <br />
              <label htmlFor="Password">Password</label>
              <br />
              <input
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="**********"
                id="Password"
                name="Password"
                className="passwordInput"
              />
              <button type="submit" className="LogIn">Log In</button>
            </form>
            <Link to="/register"><button className="Register">Register</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
