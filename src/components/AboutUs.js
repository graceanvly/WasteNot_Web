import { Link } from 'react-router-dom';
import '../Pages/Design/aboutdesign.css';
import photo1 from '../images/deanprofile.jpg';
import photo2 from '../images/graceprofile.jpg';
import photo3 from '../images/lawrenceProfile.jpg';

export const AboutUs = () => {
    return (
        <>
            <div className="about-container">
                <div className="about-title">About Us</div>
                <div className="member1">
                    <img className="photo1" src={photo1} alt="Dean Flores" />
                    <h2>FLORES, DEAN ADRIANE B.</h2>
                    <h3>deanadrianef@gmail.com</h3>
                    <p>Project Manager</p>
                </div>
                <div className="member2">
                    <img className="photo2" src={photo2} alt="Dean Flores" />
                    <h2>VELAYO, GRACE AN A.</h2>
                    <h3>graceann151@gmail.com</h3>
                    <p>Technical Writer</p>
                </div>
                <div className="member3">
                    <img className="photo3" src={photo3} alt="Dean Flores" />
                    <h2>REGISTRADO, LAWRENCE DAVE G.</h2>
                    <h3>registrado187@gmail.com</h3>
                    <p>UI/UX Design</p>
                </div>

                <Link to={'/login'}><button className='back-button'>Back</button></Link>
            </div>
        </>
    )
}