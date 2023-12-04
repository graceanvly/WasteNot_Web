import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
    setDoc,
  doc,    
} from 'firebase/firestore';
import './Design/registerdesign.css';
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {


  const [input, setInput] = useState({
    restaurantname: '',
    email: '',
    restoAdd: '',
    contactnum: '',
    restoPermit: '',
    password: '',
    confirmPassword: '',
    restocity: '',
    restocode: ''
  });

  const [error, setError] = useState({
    restaurantname: '',
    email: '',
    restoAdd: '',
    contactnum: '',
    restoPermit: '',
    password: '',
    confirmPassword: '',
    estocity: '',
    restocode: ''
  })

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      const updatedInput = { ...prev, [name]: value };
      validateInput({ target: { name, value } }); // Pass the updated input to validateInput
      return updatedInput;
    });
  };

  const [selectedImageName2, setSelectedImageName2] = useState('');
  const [, setSelectedImage2] = useState(null);

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    setSelectedImage2(file);
    setSelectedImageName2(file ? file.name : ''); // Update selected image name
  }


  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "restaurantname":
          if (!value) {
            stateObj[name] = "Please enter Restaurant Name.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          } else if (!isValidEmail(value)) {
            stateObj[name] = "Please enter a valid Email.";
          }
          break;

        case "restoAdd":
          if (!value) {
            stateObj[name] = "Please enter Restaurant Address.";
          }
          break;

        case "contactnum":
          if (!value) {
            stateObj[name] = "Please enter Contact Number.";
          }
          break;

        case "restoPermit":
          if (!value) {
            stateObj[name] = "Please enter Restaurant Permit.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";

          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        case "restocity":
          if (!value) {
            stateObj[name] = "Please enter Restaurant City.";
          }
          break;
        case "restocode":
          if (!value) {
            stateObj[name] = "Please enter Zip Code.";
          }
          break;



        default:
          break;
      }

      return stateObj;
    });
  }

  const isValidEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const auth = getAuth(); // Initialize Firebase Authentication
  const db = getFirestore(); // Initialize Firestore
  const history = useNavigate(); // Initialize useHistory

  const registerUser = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    const isAnyFieldEmpty = Object.values(input).some((val) => val.trim() === '');
    if (isAnyFieldEmpty) {
      window.alert('Please fill up the fields.');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      const usersCollectionRef = collection(db, 'admin_users');
      console.log('before adding the firestore')

      // Add additional user data to Firestore
       await setDoc(doc(usersCollectionRef, userCredential.user.uid), {
        restaurantName: input.restaurantname,
        restaurantEmail: input.email,
        restaurantAddress: input.restoAdd,
        contactNum: input.contactnum,
        restaurantPermit: input.restoPermit,
        restaurantCity: input.restocity,
        zipCode: input.restocode,
        role: 'admin',
      });

      console.log('User registered successfully:', userCredential.user.uid);

      window.alert('Registered successfully!');

      history('/profile');

    } catch (error) {
      console.error('Error registering user:', error.code, error.message);
    }
  };


  return (
    <>
      <Navbar />
      <div className='register-container'>
        <div className="header ">Registration</div>

        <div className="app1">
          <form onSubmit={registerUser}>
            <label>Restaurant Name</label>
            <br />
            <input
              type="text"
              name="restaurantname"
              placeholder='Enter Restaurant Name'
              value={input.restaurantname}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.restaurantname && <span className='err'>{error.restaurantname}</span>}
            <br />

            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder='Enter Email'
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.email && <span className='err'>{error.email}</span>}
            <br />

            <label>Restaurant Street Address</label>
            <br />
            <input
              type="text"
              name="restoAdd"
              placeholder='Enter Resturant Street Address'
              value={input.restoAdd}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.restoAdd && <span className='err'>{error.restoAdd}</span>}
            <br />

            <label>Restaurant City</label>
            <br />
            <input
              type="text"
              name="restocity"
              placeholder='Enter Resturant Street Address'
              value={input.restocity}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.restocity && <span className='err'>{error.restocity}</span>}
            <br />

            <label>Contact Number</label>
            <br />
            <input
              type="number"
              name="contactnum"
              placeholder='Enter Contact Number'
              value={input.contactnum}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.contactnum && <span className='err'>{error.contactnum}</span>}
            <br />
            <Link to="/login"><button className="Back">Back</button></Link>
          </form>
        </div>

        <div className='app2'>
          <form onSubmit={registerUser}>
            <label>Restaurant Permit Number</label>
            <br />
            <input
              type="text"
              name="restoPermit"
              placeholder='Enter Restaurant Permit Number'
              value={input.restoPermit}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.restoPermit && <span className='err'>{error.restoPermit}</span>}
            <br />
            <label>Select Restaurant Permit Image</label>

            <input
              type="file"
              accept="image/*"
              id="restaurantPermitImageButton"
              className="file-upload-input"
              onChange={handleImageChange2}
              style={{ display: "none" }}
            />
            <br />
            <label htmlFor="restaurantPermitImageButton" className="file-upload-button">
              {selectedImageName2 || "No Files Chosen"}
            </label>
            <br />
            <br />

            <label>Zip Code</label>
            <br />
            <input
              type="number"
              name="restocode"
              placeholder='Enter Zip Code'
              value={input.restocode}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.restocode && <span className='err'>{error.restocode}</span>}
            <br />

            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder='Enter Password'
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.password && <span className='err'>{error.password}</span>}
            <br />

            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              placeholder='Enter Confirm Password'
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}></input><br />
            {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
            <br />
            <Link to="/profile"><button onClick={registerUser} type="submit" className="Register">Register</button></Link>
            {/* <button onClick={registerUser} type="submit" className="Register">Register</button> */}
          </form>
        </div>
      </div>
    </>
  )
}