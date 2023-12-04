import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import './Design/marketdesign.css';
import image from "../images/steak_sample.png";
import {
    FaWarehouse
} from 'react-icons/fa';

export const Market = (props) => {
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
                <div><button class='bttn-request'><h4>Requests</h4><h5>50</h5></button></div>
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
                                    <th>Name</th>
                                    <th>Price</th>
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
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
                                    <td><h1>35kg</h1></td>
                                </tr>
                                <tr>
                                    <td><img class='market-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                    <td><h3>Price:</h3><div class='price-cont'>$15.00</div><h5>/Kg</h5></td>
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
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img class='request-img' src={image} alt="ingredient" /><h2>Product 1</h2></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><h3>July 26, 2023</h3></td>
                                            <td><div class='Total'><h3>35kg</h3></div></td>
                                            <td class='bttns'>
                                                <button class='bttn-accpt'>ACCEPT</button>
                                                <button class='bttn-dec'>DECLINE</button>
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
