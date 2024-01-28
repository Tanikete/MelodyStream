import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            // Make a request to the server to clear the token
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials (cookies) in the request
            });
    
            // Handle the response as needed (redirect, update UI, etc.)
            if (response.ok) {
                // Handle successful logout
                setUser(null);
                navigate('/login');
            } else {
                // Handle logout failure
                console.error('Failed to log out:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
        // window.location.reload();
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="flex flex-row gap-4 justify-start items-center my-8 text-lg font-medium text-gray-400">
            {!user && (
                <>
                    
                    <button onClick={handleSignUp} className='bg-transparent text-neutral-300 font-medium py-2'>Sign Up</button>
                    <button onClick={handleSignIn} className='bg-white px-6 py-2 rounded-full'>Sign In</button>
                </>
            )}
            {!!user && (
                <>
                    <h2>Hi {user.name}!</h2>
                    <button onClick={handleSignOut} className="bg-white px-6 py-2 rounded-full">Sign Out</button>
                </>
            )}
        </div>
    );
}