import React, { useEffect, useState } from "react";
import "firebase/firestore";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import image from "../images/steak_sample.png";
import './Design/inventdesign.css';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { FaWarehouse, FaArrowCircleDown } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';  // Import getAuth function

export const Inventory = (props) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inventoryHistory, setInventoryHistory] = useState([]);
    
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const inventoryCollection = collection(db, 'inventory');
                const inventorySnapshot = await getDocs(inventoryCollection);
                const inventoryList = [];

                inventorySnapshot.forEach((doc) => {
                    const inventoryData = doc.data();

                    // Check if Restaurant_id matches user.uid
                    if (inventoryData.Restaurant_id === user?.uid) {
                        inventoryList.push({ id: doc.id, ...doc.data() });
                    }
                });

                setInventoryData(inventoryList);
            } catch (error) {
                console.error('Error fetching inventory data: ', error);
            }
        };

        fetchInventoryData();
    }, [user]);

    useEffect(() => {
        const fetchInventoryHistory = async () => {
            if (selectedItem) {
                const historyQuery = query(
                    collection(db, 'ingredients_history'),
                    where('ItemId', '==', selectedItem.ItemId)
                );
                const historySnapshot = await getDocs(historyQuery);
                const historyList = [];

                historySnapshot.forEach((doc) => {
                    historyList.push({ id: doc.id, ...doc.data() });
                });

                setInventoryHistory(historyList);
            }
        };

        fetchInventoryHistory();
    }, [selectedItem]);


    const openPopup = (item) => {
        setSelectedItem(item);
    };

    const closePopup = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <Navbar2 />
            <Sidebar />
            <div className="inventory-cont">
                <div className='invent-title'>
                    <h1>Ingredients</h1>
                </div>

                <div className='total-invent'>
                    <h2>Total Ingredient</h2>
                    <br />
                    <FaWarehouse />
                    <h1>{inventoryData.length}</h1>
                </div>

                <div className='stock-title'><h1>Stocks</h1></div>

                <div className='scrollable-cont'>
                    {inventoryData.map((item) => (
                        <div key={item.id} className='ingredient'>
                            <img className='ingred-sample' src={image} alt="ingredient" />
                            <h2>{item.Item_name}</h2>
                            <div className="percent-bar">
                                <div className='percent-bar-fill'></div>
                                <div className='remaining'>
                                    Remaining:
                                </div>
                                <div className='total'> Total: {item.item_quantity}</div>
                            </div>
                            <button className="open-popup" onClick={() => openPopup(item)}>
                                <FaArrowCircleDown />
                            </button>
                        </div>
                    ))}
                </div>

                {selectedItem && (
                <div>
                    <div className="backdrop" style={{ display: 'block' }} onClick={closePopup}></div>
                    <div className="popup-inventory" id="myPopup">
                        <span className="close" id="close-popup" onClick={closePopup}>&times;</span>
                        <div className='scrollable-approval'>
                            <table className='table-market'>
                                <thead>
                                    <tr>
                                        <th>Date Added</th>
                                        <th>Expiration Date</th>
                                        <th><div className='Total'>Total</div></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryHistory.map((historyItem) => (
                                        <tr key={historyItem.id}>
                                            <td><h3>{historyItem.Date_added}</h3></td>
                                            <td><h3>{historyItem.Expiry_date}</h3></td>
                                            <td><div className='Total'><h3>{historyItem.item_quantity}</h3></div></td>
                                            <td className='bttns'>
                                                <button className='bttn-addtomarket'>Add to Market</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};