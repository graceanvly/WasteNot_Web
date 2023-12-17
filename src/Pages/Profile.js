import React, { useState, useEffect } from 'react';
import './Design/profiledesign.css';
// import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import {
  FaPlusCircle
} from 'react-icons/fa';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



export const Profile = (props) => {

  const history = useNavigate()

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    restaurantname: '',
    email: '',
    restoAdd: '',
    contactnum: '',
    restoPermit: '',
    restocity: '',
    restocode: '',
    restodescrip: '',
    profileImage:'',
  });


  useEffect(() => {
    let signOutTriggered = false; // Local variable to track sign-out

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !signOutTriggered) {
        history('/');
      } else {
        fetchUserData(user?.uid);
      }
    });

    return () => unsubscribe();
  }, [history]);
  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        // Check 'admin_users' collection
        const adminUserDoc = await getDoc(doc(db, 'admin_users', userId));
        if (adminUserDoc.exists()) {
          const adminUserData = adminUserDoc.data();
          setUserData(adminUserData);
          setFormData({
            restaurantname: adminUserData.restaurantName,
            email: adminUserData.restaurantEmail,
            restoAdd: adminUserData.restaurantAddress,
            contactnum: adminUserData.contactNum,
            restoPermit: adminUserData.restaurantPermit,
            restocity: adminUserData.restaurantCity,
            restocode: adminUserData.zipCode,
            restodescrip: adminUserData.restaurantDesc,
            profileImage: adminUserData.restaurantLogo,
          });
        } else {
          console.log('Admin user not found');
        }
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };




  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const handleClick = () => {
    signOut(auth).then(val => {
      console.log(val, "Log Out!");
      history('/');
    });
  }

  const [isEditable, setIsEditable] = useState(false);


  const handleCancel = () => {
    // Reset the form data
    setFormData({
      restaurantname: userData ? userData.restaurantName : '',
      email: userData ? userData.restaurantEmail : '',
      restoAdd: userData ? userData.restaurantAddress : '',
      contactnum: userData ? userData.contactNum : '',
      restoPermit: userData ? userData.restaurantPermit : '',
      restocity: userData ? userData.restaurantCity : '',
      restocode: userData ? userData.zipCode : '',
      restodescrip: userData ? userData.restautantDesc : '', // Add other fields as needed
      profileImage: formData.selectedImage || userData.restaurantLogo,
    });

    // Exit edit mode
    setIsEditable(false);
  };


  const toggleEdit = () => {
    setIsEditable(!isEditable);
  }

  const onInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, 'admin_users', userId);

        // Create an object with the updated profile information
        const updatedData = {
          restaurantName: formData.restaurantname,
          restaurantEmail: formData.email,
          restaurantAddress: formData.restoAdd,
          contactNum: formData.contactnum,
          restaurantPermit: formData.restoPermit,
          restaurantCity: formData.restocity,
          zipCode: formData.restocode,
          restautantDesc: formData.restodescrip,
          restaurantLogo: formData.selectedImage,
        };

        // Update the document in the 'admin_users' collection
        await setDoc(userDocRef, updatedData, { merge: true });

        // Fetch updated user data to reflect changes in the UI
        fetchUserData();

        // Exit edit mode
        setIsEditable(false);
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  
    // Generate a unique name for the file
    const fileName = `Admin_Profile/${auth.currentUser.uid}_${file.name}`;
  
    // Get a reference to the storage location
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
  
    // Upload the file to Firebase Storage
    try {
      await uploadBytes(storageRef, file);
  
      // Update formData with the selected image URL
      const downloadURL = await getDownloadURL(storageRef);
      setFormData({
        ...formData,
        selectedImage: downloadURL,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const handleSelectImageClick = () => {
    // Trigger the file input when the "Select Image" button is clicked
    document.getElementById('profileImage').click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter new Password.";

          } else if (formData.confirmPassword && value !== formData.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = formData.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm new Password.";
          } else if (formData.password && value !== formData.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };


  return (
    <>
      <Navbar2 />
      <Sidebar />
      <div className='profile'>
        <form>
          <img
            src={formData.profileImage}
            alt=""
            className="profile-image"
            onClick={isEditable ? handleSelectImageClick : undefined}
          />

          {/* File input */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            name="profileImage"
            onChange={handleImageUpload}
            disabled={!isEditable}
            style={{ display: 'none' }}
          />
          {isEditable && (
            <button
              type="button"
              className="btn-select-image"
              onClick={handleSelectImageClick}
            >
              <FaPlusCircle />
            </button>
          )}

          <div className='form-prof'>
            <label>Resturant Name</label>
            <br />
            <input
              type="text"
              name="restaurantname"
              value={formData.restaurantname}
              onChange={onInputChange}
              disabled={!isEditable}
            />
            <br />
            <br />

            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              disabled={true} // Use !isEditable to conditionally disable the input
            // disabled={someCondition ? true : false} // Disable based on someCondition
            />
            <br />
            <br />

            <label>Restaurant Street Address</label>
            <br />
            <input
              type="text"
              name="restoAdd"
              value={formData.restoAdd}
              onChange={handleInputChange}
              disabled={!isEditable} // Use !isEditable to conditionally disable the input
            />
            <br />
            <br />

            <label>Restaurant City</label>
            <br />

            <input
              type="text"
              name="restocity"
              value={formData.restocity}
              onChange={handleInputChange}
              disabled={!isEditable} // Use !isEditable to conditionally disable the input
            />
            <br />
            <br />

            <label>Zip Code</label>
            <br />

            <input
              type="number"
              name="restocode"
              value={formData.restocode}
              onChange={handleInputChange}
              disabled={!isEditable} // Use !isEditable to conditionally disable the input
            />
          </div>


          <div className='form-prof2'>

            <label>Contact number</label>
            <br />
            <input
              type="tel"
              name="contactnum"
              value={formData.contactnum}
              onChange={handleInputChange}
              pattern="^09\d{9}$"
              title="Please enter a valid Philippine contact number starting with 09"
              disabled={!isEditable}
            />
            <br />
            <br />




            <label>Restaurant Description</label>
            <br />

            <div className='description'><input
              type="text"
              name="restodescrip"
              value={formData.restodescrip}
              onChange={handleInputChange}
              placeholder="Update Restaurant Description"
              disabled={!isEditable} // Use !isEditable to conditionally disable the input
            />
            </div>
            <br />

            {/* {showChangePassword && isEditable && (
              <>
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder='Enter Password'
                  disabled={!isEditable}
                  value={formData.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                <br />
                {error.password && <span className='err'>{error.password}</span>}
                <br />
                <br />
                <label>Confirm Password</label>
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder='Enter Confirm Password'
                  disabled={!isEditable}
                  value={formData.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                />
                {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
              </>
            )} */}

          </div>
        </form>
      </div>
      <div>
        {isEditable ? (
          <>
            <button className="bttnsave" onClick={handleSave}>Save</button>
            <button className="bttnedit2" onClick={handleCancel}>Cancel</button>
            {/* <button className="bttnchapass" onClick={toggleChangePassword}>Change Password</button> */}
          </>
        ) : (
          <>
            <button className="bttnedit" onClick={toggleEdit}>Edit Profile</button>
            {/* <Link to="/login"><button className="Backs">LOG OUT</button></Link> */}
            <button onClick={handleClick} className="Backs">LOG OUT</button>
            <button className="bttndeact">DEACTIVATE</button>
          </>
        )}
      </div>
    </>
  )
}