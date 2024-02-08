// import axios from 'axios';
// import { createContext, useState, useEffect } from 'react';

// export const userContext = createContext({})

// export function UserContextProvider({children}) {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         if(!user){
//             axios.get('/profile').then(({data}) => {
//                 setUser(data);
//         })
//     }
//     }, [])
//     return (
//         <userContext.Provider value={{user, setUser}}>
//             {children}
//         </userContext.Provider>
//     )
// }
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile', {
          withCredentials: true, // Include credentials (cookies) in the request
        });

        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
