import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ user }) => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignOut = () => {
        // Handle sign out logic here
    };

    return (
        <div className='flex flex-row gap-4'>
            {user ? (
                <div>
                    <button onClick={handleSignOut} className='bg-white px-6 py-2 rounded-full'>
                        Sign out
                    </button>
                </div>
            ) : (
                <>
                    <div>
                        <button onClick={handleSignUp} className='bg-transparent text-neutral-300 font-medium py-2'>
                            Sign up
                        </button>
                    </div>
                    <div>
                        <button onClick={handleLogin} className='bg-white px-6 py-2 rounded-full'>
                            Login
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Button;