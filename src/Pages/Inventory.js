import React, { useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import image from "../images/steak_sample.png";
import './Design/inventdesign.css';
import {
    FaWarehouse,
    FaArrowCircleDown
} from 'react-icons/fa';

export const Inventory = (props) => {

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
                    <h1>50</h1>
                </div>

                <div class='stock-title'><h1>Stocks</h1></div>

                <div class='scrollable-cont'>
                
                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining2222222222222222222222222222222222222222</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>

                    <div class='ingredient'>
                        <img class='ingred-sample' src={image} alt="ingredient" />
                        <h2>Total Ingredient</h2>
                        <div class="percent-bar">
                            <div class='percent-bar-fill'></div>
                            <div class='remaining'>25kg Remaining</div>
                            <div class='total'>25kg Total</div>
                        </div>
                        
                        <button class="open-popup"><FaArrowCircleDown /></button>
                        <div className="backdrop" style={{display: 'none'}}></div>
                        <div class="popup" id="myPopup">
                            <div class="popup-content">
                                <span class="close" id="close-popup">&times;</span>
                                <h2>Popup Content</h2>
                                <p>This is some content for the popup.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
