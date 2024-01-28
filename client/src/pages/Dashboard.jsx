import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        setUser(null);
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="flex flex-row justify-start items-center my-8 text-lg font-medium text-gray-200">
            {!user && (
                <>
                    <button onClick={handleSignIn}>Sign In</button>
                    <button onClick={handleSignUp}>Sign Up</button>
                </>
            )}
            {!!user && (
                <>
                    <h2>Hi {user.name}!</h2>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            )}
        </div>
    );
}