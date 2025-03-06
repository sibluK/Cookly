import { useUser } from '../context/UserProvider';
import '../styles/navbar.css';
import { Link } from 'react-router'

export default function Navbar() {

    const { isAuthenticated, user } = useUser();

    return (
        <nav>
            <div className='app-name'>
                <Link to={"/"}>
                    <svg fill="#ffffff" width="40px" height="40px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <path d="M252.7998,102.3999,224,124v60a32.03667,32.03667,0,0,1-32,32H64a32.03667,32.03667,0,0,1-32-32V124L3.2002,102.3999a7.9998,7.9998,0,0,1,9.5996-12.7998L32,104V88A16.01833,16.01833,0,0,1,48,72H208a16.01833,16.01833,0,0,1,16,16v16l19.2002-14.3999a7.9998,7.9998,0,0,1,9.5996,12.7998ZM160,56a8.00039,8.00039,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8.00039,8.00039,0,0,0,160,56Zm-32,0a8.00039,8.00039,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8.00039,8.00039,0,0,0,128,56ZM96,56a8.00039,8.00039,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8.00039,8.00039,0,0,0,96,56Z"/> </g>
                    </svg>
                    Cookly
                </Link>
            </div>
            <div className='nav-links-wrapper'>
                {isAuthenticated ? (
                    <>
                        <div className='nav-link animated-text-underline'>
                            <Link to={"/dashboard"}>Dashboard</Link>
                        </div>
                        <div className='nav-link animated-text-underline'>
                            <Link to={"/favorites"}>Favorites</Link>
                        </div>
                        <div className='nav-username nav-link animated-text-underline'>{user?.username}</div>
                        <div className='logout-button'>
                            <Link to={"/logout"}>
                                Logout
                                <svg fill="#FFFFFF" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="#FFFFFF" stroke-width="16.896">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                    <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M301.697,491.922H90.785c-11.025,0-21.029-9.649-21.029-20.669V39.39c0-11.02,10.005-19.311,21.029-19.311h210.912 c5.544,0,10.039-4.49,10.039-10.039C311.736,4.49,307.24,0,301.697,0H90.785C68.692,0,49.677,17.292,49.677,39.39v431.863 C49.677,493.35,68.692,512,90.785,512h210.912c5.544,0,10.039-4.49,10.039-10.039S307.24,491.922,301.697,491.922z"/> </g> </g> <g> <g> <path d="M459.745,243.586l-90.353-100.392c-3.711-4.127-10.059-4.451-14.176-0.745c-4.123,3.706-4.456,10.4-0.745,14.517 l75.272,83.976H201.304c-5.544,0-10.039,4.49-10.039,10.039c0,5.549,4.495,10.039,10.039,10.039h226.745l-73.216,72.877 c-3.922,3.922-3.922,10.103,0,14.025c1.961,1.961,4.529,2.858,7.098,2.858c2.569,0,5.137-1.022,7.098-2.983l90.353-90.375 C463.157,253.647,463.319,247.556,459.745,243.586z"/> </g> </g> </g>
                                </svg>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='nav-link'>
                        <Link to={"/login"}>Login</Link>
                        </div>
                        <div className='nav-link'>
                            <Link to={"/register"}>Register</Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}