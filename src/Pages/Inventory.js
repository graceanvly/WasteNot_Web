import React, { useEffect, useState } from "react";
import "firebase/firestore";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import image from "../images/steak_sample.png";
import './Design/inventdesign.css';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
    FaWarehouse,
    FaArrowCircleDown
} from 'react-icons/fa';

export const Inventory = (props) => {
    const [inventoryData, setInventoryData] = useState([]);
    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const inventoryCollection = collection(db, 'inventory');
                const inventorySnapshot = await getDocs(inventoryCollection);
                const inventoryList = [];

                inventorySnapshot.forEach((doc) => {
                    inventoryList.push({ id: doc.id, ...doc.data() });
                });

                setInventoryData(inventoryList);
            } catch (error) {
                console.error('Error fetching inventory data: ', error);
            }
        };

        fetchInventoryData();
    }, []);


    useEffect(() => {
        function openPopup() {
            document.getElementById('myPopup').style.display = 'block';
            document.querySelector('.backdrop').style.display = 'block';
        }
    
        function closePopup() {
            document.getElementById('myPopup').style.display = 'none';
            document.querySelector('.backdrop').style.display = 'none';
        }
    
        const openPopupElement = document.querySelector('.open-popup');
        const closePopupElement = document.getElementById('close-popup');
    
        if (openPopupElement) {
            openPopupElement.addEventListener('click', openPopup);
        }
    
        if (closePopupElement) {
            closePopupElement.addEventListener('click', closePopup);
        }
    
        return () => {
            if (openPopupElement) {
                openPopupElement.removeEventListener('click', openPopup);
            }
    
            if (closePopupElement) {
                closePopupElement.removeEventListener('click', closePopup);
            }
        };
    }, []);


    return (
        <>
            <Navbar2 />
            <Sidebar />
            <div className="inventory-cont">
                <div class='invent-title'>
                    <h1>Ingredients</h1>
                </div>

                <div class='total-invent'>
                    <h2>Total Ingredient</h2>
                    <br />
                    <FaWarehouse />
                    <h1>inventoryData.length</h1>
                </div>

                <div class='stock-title'><h1>Stocks</h1></div>

                <div className='scrollable-cont'>
                    {inventoryData.map((item) => (
                        <div key={item.id} className='ingredient'>
                            {/* Display inventory data here */}
                            <img className='ingred-sample' src={image} alt="ingredient" />
                            <h2>{item.Item_name}</h2>
                            <div className="percent-bar">
                                <div className='percent-bar-fill'></div>
                                <div className='remaining'>{item.quantity} Remaining</div>
                                <div className='total'> Total: {item.item_quantity}</div>
                        </div>
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                        <span class="close" id="close-popup">&times;</span>
                        <div class='scrollable-approval'>
                                <table class='table-market'>
                                    <thead>
                                        <tr>
                                            <th>Date Added</th>
                                            <th>Expiration Date</th>
                                            <th><div class='Total'>Total</div></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 10, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>Add to Market</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                ))}
                </div>
            </div >
        </>
    );
};
