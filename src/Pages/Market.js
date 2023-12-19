import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import './Design/marketdesign.css';
import image from "../images/steak_sample.png";
import {
    FaWarehouse
} from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const Market = (props) => {
    const [marketRequests, setMarketRequests] = useState([]);

    useEffect(() => {
        const fetchMarketRequests = async () => {
            try {
                const inventorySnapshot = await getDocs(collection(db, 'inventory'));
                const ingredientsHistorySnapshot = await getDocs(collection(db, 'ingredients_history'));
                const marketRequestsSnapshot = await getDocs(collection(db, 'market_request'));
        
                console.log('inventorySnapshot:', inventorySnapshot.docs.map(doc => doc.data()));
                console.log('ingredientsHistorySnapshot:', ingredientsHistorySnapshot.docs.map(doc => doc.data()));
                console.log('marketRequestsSnapshot:', marketRequestsSnapshot.docs.map(doc => doc.data()));
        
                const inventoryData = inventorySnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});
        
                const ingredientsHistoryData = ingredientsHistorySnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});
        
                const marketRequestsData = marketRequestsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
        
                console.log('inventoryData:', inventoryData);
                console.log('ingredientsHistoryData:', ingredientsHistoryData);
                console.log('marketRequestsData:', marketRequestsData);
        
                const mergedMarketRequests = marketRequestsData.map(request => {
                    const inventoryItem = inventoryData[request.itemId];
                    const ingredientsHistoryItem = ingredientsHistoryData[request.itemId];
        
                    return {
                        id: request.id,
                        Item_name: inventoryItem ? inventoryItem.Item_name : 'N/A',
                        Date_added: ingredientsHistoryItem ? ingredientsHistoryItem.Date_added : 'N/A',
                        Expiry_date: ingredientsHistoryItem ? ingredientsHistoryItem.Expiry_date : 'N/A',
                        item_quantity: request.item_quantity,
                    };
                });
        
                console.log('mergedMarketRequests:', mergedMarketRequests);
        
                setMarketRequests(mergedMarketRequests);
            } catch (error) {
                console.error('Error fetching market requests:', error);
            }
        };

        fetchMarketRequests();
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

        const openPopupElement = document.querySelector('.bttn-request');
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
            <div className="mark-container">
                <div className='mark-title'><h1>Market</h1></div>
                <div><button class='bttn-request'><h4>Requests</h4><h5>{marketRequests.length}</h5></button></div>
                    <div class='total-market'>
                        <h2>Total Ingredient</h2>
                        <br />
                        <FaWarehouse />
                        <h1>50</h1>
                    </div>
                    <div className='scrollable-market'>
                        <table>
                            <thead>
                                <tr>
                                    <th className="name">Name</th>
                                    <th className="price">Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div className='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="backdrop" style={{ display: 'none' }}></div>
                    <div className="popup" id="myPopup">
                        <div class="popup-content">
                            <span class="close" id="close-popup">&times;</span>
                            <div class='scrollable-request'>
                                <table class='table-market'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date Added</th>
                                            <th>Expiration Date</th>
                                            <th><div class='Total'>Total</div></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {marketRequests.map(request => (
                                    <tr key={request.id}>
                                        <td><img class='request-img' src={image} alt="ingredient" /><h2>{request.Item_name}</h2></td>
                                        <td><h3>{request.Date_added}</h3></td>
                                        <td><h3>{request.Expiry_date}</h3></td>
                                        <td><div class='Total'><h3>{request.item_quantity}kg</h3></div></td>
                                        <td class='bttns'>
                                            <button class='bttn-accpt'>ACCEPT</button>
                                            <button class='bttn-dec'>DECLINE</button>
                                        </td>
                                        </tr>
                                ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};
