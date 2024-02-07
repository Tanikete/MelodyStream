// import { useContext } from "react";
// import { userContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Dashboard() {
//     const { user, setUser } = useContext(userContext);
//     const navigate = useNavigate();

//     const handleSignOut = async () => {
//         try {
//             // Make a request to the server to clear the token
//             const response = await fetch("https://melody-stream-server.vercel.app/logout", {
//                 method: "POST",
//                 credentials: "include", // Include credentials (cookies) in the request
//             });

//             // Handle the response as needed (redirect, update UI, etc.)
//             if (response.ok) {
//                 // Handle successful logout
//                 setUser(null);
//                 navigate('/login'); // Navigate to the login page after logout
//                 toast.success("Logout successful");
//             } else {
//                 // Handle logout failure
//                 console.error("Failed to log out:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error during logout:", error);
//         }
//     };

//     const handleSignIn = () => {
//         navigate("/login");
//     };

//     const handleSignUp = () => {
//         navigate("/signup");
//     };

//     return (
//         <div className="flex flex-row gap-5 justify-start items-center my-10 m-4 text-sm font-medium text-gray-400">
//             {!user && (
//                 <>
//                     <button
//                         onClick={handleSignUp}
//                         className="bg-transparent text-neutral-300 font-medium py-2"
//                     >
//                         Sign Up
//                     </button>
//                     <button
//                         onClick={handleSignIn}
//                         className="bg-white px-6 py-2 rounded-full"
//                     >
//                         Sign In
//                     </button>
//                 </>
//             )}
//             {!!user && (
//                 <>
//                     <div>
//                         <h2 className="text-gradient font-semibold text-xl">
//                             Hi {user.username}! {/* Assuming the username is the property you want to display */}
//                         </h2>
//                         <div className="fixed bottom-32 transform -translate-x-1/2">
//                             <button
//                                 onClick={handleSignOut}
//                                 className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:text-pink-400 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 transform hover:translate-x-[-5px]">
//                                 Sign Out
//                             </button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
import { useContext, useEffect } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookie = async () => {
            try {
                // Make a request to the server to check the cookie
                const response = await fetch("https://melody-stream-server.vercel.app/profile", {
                    method: "GET",
                    credentials: "include", // Include credentials (cookies) in the request
                });

                // Handle the response as needed (update user state, display name, etc.)
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    // Handle cookie check failure
                    console.error("Failed to check cookie:", response.statusText);
                }
            } catch (error) {
                console.error("Error during cookie check:", error);
            }
        };

        checkCookie();
    }, [setUser]);

    const handleSignOut = async () => {
        try {
            // Make a request to the server to clear the token
            const response = await fetch("https://melody-stream-server.vercel.app/logout", {
                method: "POST",
                credentials: "include", // Include credentials (cookies) in the request
            });

            // Handle the response as needed (redirect, update UI, etc.)
            if (response.ok) {
                // Handle successful logout
                setUser(null);
                navigate('/login'); // Navigate to the login page after logout
                toast.success("Logout successful");
            } else {
                // Handle logout failure
                console.error("Failed to log out:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="flex flex-row gap-5 justify-start items-center my-10 m-4 text-sm font-medium text-gray-400">
            {!user && (
                <>
                    <button
                        onClick={handleSignUp}
                        className="bg-transparent text-neutral-300 font-medium py-2"
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={handleSignIn}
                        className="bg-white px-6 py-2 rounded-full"
                    >
                        Sign In
                    </button>
                </>
            )}
            {!!user && (
                <>
                    <div>
                        <h2 className="text-gradient font-semibold text-xl">
                            Hi {user.username}! {/* Assuming the username is the property you want to display */}
                        </h2>
                        <div className="fixed bottom-32 transform -translate-x-1/2">
                            <button
                                onClick={handleSignOut}
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:text-pink-400 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 transform hover:translate-x-[-5px]">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}