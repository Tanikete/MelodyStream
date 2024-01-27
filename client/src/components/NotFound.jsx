const NotFound = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-white z-50">
      <img
        src="/src/assets/404-page.gif"  // Update the path to your actual gif file
        alt="404 Error"
        className="mb-10"  // Add margin to the bottom for better spacing with text
      />
     
    </div>
  );
};

export default NotFound;
