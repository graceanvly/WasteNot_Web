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
import { getAuth } from 'firebase/auth';

export const Market = (props) => {
    // const [marketRequests, setMarketRequests] = useState([]);
    const [saleItems, setSaleItems] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        // const fetchMarketRequests = async () => {
        //     try {
        //         const inventorySnapshot = await getDocs(collection(db, 'inventory'));
        //         const ingredientsHistorySnapshot = await getDocs(collection(db, 'ingredients_history'));
        //         const marketRequestsSnapshot = await getDocs(collection(db, 'market_request'));

        //         console.log('inventorySnapshot:', inventorySnapshot.docs.map(doc => doc.data()));
        //         console.log('ingredientsHistorySnapshot:', ingredientsHistorySnapshot.docs.map(doc => doc.data()));
        //         console.log('marketRequestsSnapshot:', marketRequestsSnapshot.docs.map(doc => doc.data()));

        //         const inventoryData = inventorySnapshot.docs.reduce((acc, doc) => {
        //             acc[doc.id] = doc.data();
        //             return acc;
        //         }, {});

        //         const ingredientsHistoryData = ingredientsHistorySnapshot.docs.reduce((acc, doc) => {
        //             acc[doc.id] = doc.data();
        //             return acc;
        //         }, {});

        //         const marketRequestsData = marketRequestsSnapshot.docs.map(doc => ({
        //             id: doc.id,
        //             ...doc.data(),
        //         }));

        //         console.log('inventoryData:', inventoryData);
        //         console.log('ingredientsHistoryData:', ingredientsHistoryData);
        //         console.log('marketRequestsData:', marketRequestsData);

        //         const mergedMarketRequests = marketRequestsData.map(request => {
        //             const inventoryItem = inventoryData[request.itemId];
        //             const ingredientsHistoryItem = ingredientsHistoryData[request.itemId];

        //             return {
        //                 id: request.id,
        //                 Item_name: inventoryItem ? inventoryItem.Item_name : 'N/A',
        //                 Date_added: ingredientsHistoryItem ? ingredientsHistoryItem.Date_added : 'N/A',
        //                 Expiry_date: ingredientsHistoryItem ? ingredientsHistoryItem.Expiry_date : 'N/A',
        //                 item_quantity: request.item_quantity,
        //             };
        //         });

        //         console.log('mergedMarketRequests:', mergedMarketRequests);

        //         setMarketRequests(mergedMarketRequests);
        //     } catch (error) {
        //         console.error('Error fetching market requests:', error);
        //     }
        // };
        const fetchSaleItems = async () => {
            try {
                const saleItemsSnapshot = await getDocs(collection(db, 'sale_items'));
                const saleItemsData = saleItemsSnapshot.docs
                    .filter(doc => doc.data().Restaurant_Id === user?.uid)
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                setSaleItems(saleItemsData);
            } catch (error) {
                console.error('Error fetching sale items:', error);
            }
        };

        // fetchMarketRequests();
        fetchSaleItems();
    }, [user]);


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
                <div><button class='bttn-request'><h4>Requests</h4><h5>2</h5></button></div>
                <div class='total-market'>
                    <h2>Total Item</h2>
                    <br />
                    <FaWarehouse />
                    <h1>{saleItems.length}</h1>
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
                            {saleItems.map(item => (
                                <tr key={item.id}>
                                    <td><img className='market-img' src={image} alt="ingredient" /><h2>{item.Item_name}</h2></td>
                                    <td><h3>Price: {isValidNumber(item.Price) ? `P${item.Price.toFixed(2)}` : 'N/A'}</h3></td>
                                    <td><h1>Total: {isValidNumber(item.Quantity) ? `${item.Quantity}kg` : 'N/A'}</h1></td>
                                </tr>
                            ))}
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
                                    <tr>
                                        <td><img className='request-img' src={image} alt="ingredient" /><h2>Item 1</h2></td>
                                        <td><h3>2023-12-31</h3></td>
                                        <td><h3>2024-01-15</h3></td>
                                        <td><div className='Total'><h3>5kg</h3></div></td>
                                        <td className='bttns'>
                                            <button className='bttn-accpt'>ACCEPT</button>
                                            <button className='bttn-dec'>DECLINE</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><img className='request-img' src={image} alt="ingredient" /><h2>Item 2</h2></td>
                                        <td><h3>2023-12-15</h3></td>
                                        <td><h3>2024-02-01</h3></td>
                                        <td><div className='Total'><h3>8kg</h3></div></td>
                                        <td className='bttns'>
                                            <button className='bttn-accpt'>ACCEPT</button>
                                            <button className='bttn-dec'>DECLINE</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
