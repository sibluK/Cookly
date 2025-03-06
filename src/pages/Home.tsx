import { Link } from 'react-router'
import HomeImage from '../assets/1.webp'
import '../styles/home.css'

export default function Home() {
    return (
        <div className="home-page-wrapper">
            <div className='cta-text-wrapper'>
                <h1 className="app-name">Cookly</h1>
                <p>Discover delicious recipes and unleash your inner chef! Whether you're looking for quick meals, gourmet
                     dishes, or sweet treats, our collection has something for everyone. Join now and start your culinary journey today!</p>
                <div className='call-to-action-buttons'>
                    <div className='register-button cta-button'><Link to={'/register'}>Register</Link></div>

                    <div className='login-button cta-button'><Link to={'login'}>Login</Link></div>
                </div>
            </div>
            <img className='cta-image' src={HomeImage} alt='Home page image'/>
        </div>
    )
}