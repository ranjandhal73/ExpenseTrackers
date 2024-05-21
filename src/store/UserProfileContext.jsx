import { createContext, useState } from "react";

export const UserProfileContext = createContext({
    user: [],
    addUser: (user) =>{},
    removeUser: (id) =>{},
})

const UserProfileContextProvider = ({children}) =>{
    const setUserURL = 'https://expense-tracker-a6a03-default-rtdb.firebaseio.com/users.json'
    const [user, setUser] = useState([])

    const addUserHandler = async (user) =>{
        setUser((prevUser) => {
           return [...prevUser, user]
        })

        try {
            const response = await fetch(`${setUserURL}`,{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                const err = await response.json();
                console.log(err);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            
        }
    }

    const removeUserHandler = (id) =>{
        setUser((prevUser) => prevUser.filter(user => user.id !== id))
    }

    const contextValue = {
        user: user,
        addUser: addUserHandler,
        removeUser: removeUserHandler,
    }

    return <UserProfileContext.Provider value={contextValue}>
        {children}
    </UserProfileContext.Provider>
}

export default UserProfileContextProvider;