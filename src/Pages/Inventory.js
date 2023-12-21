import React, { useEffect, useState } from "react";
import "firebase/firestore";
import Sidebar from '../components/Sidebar';
import Navbar2 from '../components/NavBar2';
import image from "../images/steak_sample.png";
import './Design/inventdesign.css';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, addDoc,deleteDoc,doc} from 'firebase/firestore';
import { FaWarehouse, FaArrowCircleDown } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';


export const Inventory = (props) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [inventoryHistory, setInventoryHistory] = useState([]);
    const [priceInput, setPriceInput] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const inventoryCollection = collection(db, 'inventory');
                const inventorySnapshot = await getDocs(inventoryCollection);
                const inventoryList = inventorySnapshot.docs
                    .filter(doc => doc.data().Restaurant_id === user?.uid)
                    .map(doc => ({ id: doc.id, ...doc.data() }));

                setIngredients(inventoryList);
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
                const historyList = historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
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
        setPriceInput('');
        setShowConfirmation(false);
    };

    const handleConfirm = async () => {
        try {
            // Ensure that the 'Quantity' field has a valid value
            const quantityValue = parseInt(priceInput, 10); // Convert 'priceInput' to a number
    
            if (isNaN(quantityValue) || quantityValue <= 0) {
                // Handle the case where 'priceInput' is not a valid positive number
                console.error('Invalid Quantity value');
                return;
            }
    
            // Assuming other necessary fields like 'Item_name', 'Price', etc. are defined
    
            // Data to be added to the 'sale_items' collection
            const saleItemData = {
                Item_name: selectedItem.Item_name,
                Price: quantityValue, // Set the 'Price' field with the entered quantity value
                Quantity: quantityValue, // Set the 'Quantity' field with a valid value
                ItemId: selectedItem.ItemId, // Add ItemId to the sale item
                Restaurant_Id: user?.uid, // Add Restaurant_Id to the sale item
            };
    
            // Add the document to the 'sale_items' collection
            const saleItemDocRef = await addDoc(collection(db, 'sale_items'), saleItemData);
    
            console.log('Sale item added with ID: ', saleItemDocRef.id);
    
            // Delete the document from 'ingredients_history'
            await deleteDoc(doc(db, 'ingredients_history', selectedItem.id));
    
            console.log('Ingredients history item deleted successfully.');
            window.alert("Inventory Item added to the Market Successfully")
            // After performing the action, close the popup
            closePopup();
        } catch (error) {
            console.error('Error handling confirmation: ', error);
        }
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
                    <h1>{ingredients.length}</h1>
                </div>

                <div className='stock-title'><h1>Stocks</h1></div>

                <div className='scrollable-cont'>
                    {ingredients.map((item) => (
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
                    <>
                        <div className="backdrop" onClick={closePopup}></div>
                        <div className="popup-inventory" id="myPopup">
                            <span className="close" onClick={closePopup}>&times;</span>
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
                                                    <button className='bttn-addtomarket' onClick={() => setShowConfirmation(true)}>
                                                        Add to Market
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {showConfirmation && (
                                    <div className="popup-confirmation">
                                        <span className="close" onClick={closePopup}>&times;</span>
                                        <div>
                                            <label htmlFor="priceInput">Enter the price:</label>
                                            <input
                                                type="number"
                                                id="priceInput"
                                                value={priceInput}
                                                onChange={(e) => setPriceInput(e.target.value)}
                                            />
                                            <button onClick={handleConfirm}>Confirm</button>
                                            <button style={{ backgroundColor: '#f83535', color: '#ffffff', marginLeft: "1vw" }} onClick={closePopup}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Inventory;
