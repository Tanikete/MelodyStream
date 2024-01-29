import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-white z-50">
      <img
        src="/src/assets/404-page.gif"  // Update the path to your actual gif file
        alt="404 Error"
        className="mb-10"  // Add margin to the bottom for better spacing with text
      />
      <button onClick={handleRedirect} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
