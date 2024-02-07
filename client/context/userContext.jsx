export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('https://melody-stream-server.vercel.app/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}
