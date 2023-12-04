import React, { useState } from 'react';
import '../Pages/Design/bardesign.css';
import image from "../images/logo.png";
import {
    FaUserCircle,
    FaBars,
    FaHome,
    FaUsers,
    FaBookOpen,
    FaStore,
    FaWarehouse
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const sideItems = [
        {
            path: "/homePage",
            name: "Homepage",
            icon: <FaHome />
        },
        {
            path: "/staff",
            name: "Staff",
            icon: <FaUsers />
        },
        {
            path: "/menu",
            name: "Menu",
            icon: <FaBookOpen />
        },
        {
            path: "/market",
            name: "Market",
            icon: <FaStore />
        },
        {
            path: "/inventory",
            name: "Inventory",
            icon: <FaWarehouse />
        },
        {
            path: "/profile",
            name: "Profile",
            icon: <FaUserCircle />
        },

    ]

    return (
        <div className='container'>
            <div style={{ width: isOpen ? "30vw" : "5vw" }} className='sidebar'>
                <div className='top_section'>
                    {/* <h1 style={{ display: isOpen ? "block" : "none" }} className='Logos'>Logo</h1> */}
                    <div href="/" className="Logos"><img src={image} width={150} height={100} style={{ display: isOpen ? "block" : "none" }} alt="SideBar logo"/></div>
                    {/* <div  style={{ display: isOpen ? "block" : "none" }} className='Logos'>Logo</h1> */}
                    <div style={{ marginLeft: isOpen ? "15vw" : "0.5vw" }} className='bars'>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    sideItems.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className='icon'>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar;