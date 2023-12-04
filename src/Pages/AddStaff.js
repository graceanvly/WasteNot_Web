import React, { useState,useEffect } from "react";
import Navbar2 from '../components/NavBar2';
import { Link } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import './Design/addstaffdesign.css';

export const AddStaff = () => {
    const history = useNavigate();
    
    const [formData, setFormData] = useState({
        idNumber: '',
        firstName: '',
        lastName: '',
        gender: '',
        strAddress: '',
        cityAddress: '',
        zipCode: '',
        email: '',
        position: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        idNumber: '',
        firstName: '',
        lastName: '',
        gender: '',
        strAddress: '',
        cityAddress: '',
        zipCode: '',
        email: '',
        position: '',
        password: '',
        confirmPassword: ''
    });
    const [adminId, setAdminId] = useState('');
    const genders = ['Male', 'Female'];
    const positions = ['Head Staff', 'Staff', 'Manager'];
     const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                // Access the UID of the currently authenticated admin user
                const adminId = user.uid;
                setAdminId(adminId); // Set adminId in state for later use
            } else {
                console.log("No user is signed in.");
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, [auth]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.idNumber) {
            newErrors.idNumber = '*';
        }

        if (!formData.firstName) {
            newErrors.firstName = '*';
        }

        if (!formData.lastName) {
            newErrors.lastName = '*';
        }

        if (!formData.gender) {
            newErrors.gender = '*';
        }

        if (!formData.position) {
            newErrors.position = '*';
        }

        if (!formData.strAddress) {
            newErrors.strAddress = '*';
        }

        if (!formData.cityAddress) {
            newErrors.cityAddress = '*';
        }

        if (!formData.zipCode) {
            newErrors.zipCode = '*';
        }

        if (!formData.email) {
            newErrors.email = '*';
        }

        if (!formData.password) {
            newErrors.password = '*';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async () => {
        try {
            if (!validateForm()) {
                return;
            }
            
    
            const auth = getAuth();
            const { email, password } = formData;
            
            // Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Access the user ID from the userCredential
            const userId = user.uid;
    
            // Save additional user data in Firestore
            const usersCollection = collection(db, 'users');
            await addDoc(usersCollection, {
                idNumber: formData.idNumber,
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender,
                strAddress: formData.strAddress,
                cityAddress: formData.cityAddress,
                zipCode: formData.zipCode,
                email: formData.email,
                position: formData.position,
                adminId: adminId,
                role: 'staff',
                userId: userId, // Save the UID of the user in Firestore
            });
    
            window.alert('Staff Added Successfully');
            console.log('Staff data saved to Firestore');
    
            // Do not log in the user in the web app
    
            history('/staff');
        } catch (error) {
            console.error("Error adding user: ", error.message);
        }
    };
    
    return (
        <>
            <Navbar2 />
            <div className="addstaff-container">
                <div className='scrollable-addstaff'>
                    <div className='thead'>Information</div>
                    <form className='addstaff-info'>
                        <div className='form1'>
                            <div className="input-container">
                                <label htmlFor="idNumber">ID Number:</label>
                                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="Sample ID Number " />{errors.idNumber && <p className="error">{errors.idNumber}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="firstName">First Name:</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" />{errors.firstName && <p className="error">{errors.firstName}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" />{errors.lastName && <p className="error">{errors.lastName}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="gender">Gender:</label>
                                <select id="gender" name="gender" onChange={handleChange} value={formData.gender}>
                                    <option value="" disabled>Select Gender</option>
                                    {genders.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>{errors.gender && <p className="error">{errors.gender}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="position">Position:</label>
                                <select id="position" name="position" onChange={handleChange} value={formData.position}>
                                    <option value="" disabled>Select Position</option>
                                    {positions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select> {errors.position && <p className="error">{errors.position}</p>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="strAddress">Street Address:</label>
                                <input type="text" name="strAddress" value={formData.strAddress} onChange={handleChange} placeholder="Enter Street Address" />{errors.strAddress && <p className="error">{errors.strAddress}</p>}
                            </div>
                        </div>

                        <div className='form2'>
                            <div className="input-container">
                                <label htmlFor="cityAddress">City Address:</label>
                                <input type="text" name="cityAddress" value={formData.cityAddress} onChange={handleChange} placeholder="Enter City Address" />
                                {errors.cityAddress && <p className="error">{errors.cityAddress}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="zipCode">Zip Code:</label>
                                <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Enter Zip Code" />
                                {errors.zipCode && <p className="error">{errors.zipCode}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                    </form>
                    <button onClick={handleSubmit} className='bttn-confirm'>Confirm</button>
                    <Link to="/staff"><button className='bttn-cancel'>Cancel</button></Link>
                </div>
            </div>
        </>
    );
};

export default AddStaff;
