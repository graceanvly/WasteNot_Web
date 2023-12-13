import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import './Design/homedesign.css';
import {
    FaUsers,
    FaBookOpen,
    FaWarehouse,
    FaChartBar,
    FaChartPie
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import image from "../images/steak_sample.png";
import ingredient from "../images/ingredient_sample.png";
import staff from "../images/Staff_sample.png";
import market from "../images/potato.jpg";
// import BarGraph from './BarGraph';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Homepage = (props) => {
    const [menuItems, setMenuData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [adminId, setAdminId] = useState('');



    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menuCollection = collection(db, 'menu_dish');
                const menuSnapshot = await getDocs(menuCollection);
                const menuList = [];

                menuSnapshot.forEach((doc) => {
                    const menuData = doc.data();

                    // Check if the menu item belongs to the logged-in user
                    if (adminId && menuData.userId === adminId) {
                        menuList.push({ id: doc.id, ...menuData });
                    }
                });

                setMenuData(menuList);
            } catch (error) {
                console.error('Error fetching menu data: ', error);
            }
        };

        fetchMenuData();
    }, [adminId]);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                // Access the UID of the currently authenticated admin user
                const adminId = user.uid;
                setAdminId(adminId); // Set adminId in state for later use
            } else {
                console.log('No user is signed in.');
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!adminId) {
                // Admin is not authenticated, do not fetch data
                return;
            }

            try {
                // Fetch staff data only for the authenticated admin
                const staffCollection = collection(db, 'users');
                const q = query(staffCollection, where('adminId', '==', adminId));
                const staffSnapshot = await getDocs(q);

                const staffData = staffSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setStaffData(staffData);
            } catch (error) {
                console.error('Error fetching staff data: ', error.message);
            }
        };

        fetchData();
    }, [adminId]);

    return (
        <>
            <Navbar2 />
            <Sidebar />
            <div className="container">
                <div>
                    <Link to="/staff"><button class="icon-button">
                        <div className="title"><h4>Total Staff</h4></div>
                        <br />
                        <FaUsers />
                        {staffData.length}
                    </button>
                    </Link>
                    <Link to="/menu"><button class="icon-button2">
                        <div className="title2"><h4>Total Dishes</h4></div>
                        <br />
                        <FaBookOpen />
                        25
                    </button>
                    </Link>
                    <Link to="/inventory"><button class="icon-button3">
                        <div className="title3"><h4>Total Ingredients</h4></div>
                        <br />
                        <FaWarehouse />
                        18
                    </button>
                    </Link>

                    <button class="icon-button4">
                        <div className="title4">
                            <h3>Sales</h3>
                        </div>
                        <br />
                        <FaChartBar />
                    </button>

                    <button class="icon-button5">
                        <div className="title4">
                            <h3>Consumed</h3>
                        </div>
                        <br />
                        <FaChartPie />
                    </button>
                </div>
            </div>

            <div className="notify">
                <h1>Notifications</h1>
                <div class="notify-container">
                    <div class="notify1"><img class='sample' src={staff} alt="staff1" /><h3>New Staff Have Been Added!</h3></div>
                    <div class="notify1"><img class='sample' src={image} alt="staff1" /><h3>New Dish has been Added!</h3></div>
                    <div class="notify1"><img class='sample' src={staff} alt="staff1" /><h3>New Staff Have Been Added!</h3></div>
                    <div class="notify1"><img class='sample' src={ingredient} alt="staff1" /><h3>Beef has been Added to Market!</h3></div>
                    <div class="notify1"><img class='sample' src={market} alt="staff1" /><h3>New Ingredient has been Added to Inventory!</h3></div>
                </div>
            </div>

            <div className="scrollable-container">
                {/* Menu section */}
                <h1>Menu</h1>
                <Link to="/menu">
                    <button className="click">See All</button>
                </Link>
                <div className="menu-cont">
                    {menuItems.slice(0, 5).map((item, index) => (
                        <div key={index} className="item">
                            <img className="sample" src={menuItems} alt={`menuItems${index + 1}`} />
                            <h3>{item.dishName}</h3>
                            {/* <h4>₱{item.price}</h4> */}
                        </div>
                    ))}
                </div>
                <br />
                <h1>Staff</h1>
                <Link to="/staff">
                    <button className='click'>See All</button>
                </Link>
                <div className='staff-cont'>
                    {staffData.slice(0, 5).map((member, index) => (
                        <div key={index} className="item">
                            {/* Use your sample staff image */}
                            <img className="sample" src={staff} alt={`staff${index + 1}`} />
                            <h3>{`${member.firstName} ${member.lastName}`}</h3>
                        </div>
                    ))}
                </div>
                <br />


                <h1>Market</h1>
                <Link to="/market"><button class='click'>See All</button></Link>
                <div class='market-cont'>
                    <div class="item"><img class='sample' src={ingredient} alt="item1" /><h3>Item 1</h3><h4>₱2,500</h4><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={ingredient} alt="item1" /><h3>Item 2</h3><h4>₱2,500</h4><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={ingredient} alt="item1" /><h3>Item 3</h3><h4>₱2,500</h4><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={ingredient} alt="item1" /><h3>Item 4</h3><h4>₱2,500</h4><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={ingredient} alt="item1" /><h3>Item 5</h3><h4>₱2,500</h4><h5>Available: 10Kg</h5></div>
                </div>
                <br />

                <h1>Ingredients</h1>
                <Link to="/inventory"><button class='click'>See All</button></Link>
                <div class='invent-cont'>
                    <div class="item"><img class='sample' src={market} alt="item1" /><h3>Item 1</h3><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={market} alt="item1" /><h3>Item 2</h3><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={market} alt="item1" /><h3>Item 3</h3><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={market} alt="item1" /><h3>Item 4</h3><h5>Available: 10Kg</h5></div>
                    <div class="item"><img class='sample' src={market} alt="item1" /><h3>Item 5</h3><h5>Available: 10Kg</h5></div>
                </div>
            </div>

            {/* <div className="backdrop" style={{ display: 'none' }}></div>
            <div className="popup" id="myPopup">
                <div className="popup-content">
                    <span className="close" id="close-popup">&times;</span>
                    <BarGraph data={graphData} />
                </div>
            </div> */}
        </>
    );
};
