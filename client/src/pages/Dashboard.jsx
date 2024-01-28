import { useContext } from "react";
import { userContext } from "../../context/userContext";

export default function Dashboard() {
    const {user} = useContext(userContext);
    return (
        <div className="flex flex-row justify-start items-center my-8 text-lg font-medium text-gray-200">
            
            {!!user && (<h2>Hi {user.name}!</h2>)}
        </div>
    )
}