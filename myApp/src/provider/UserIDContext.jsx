import { createContext, useState } from "react";

export const userContext = createContext({stuRollNo: null, staID: null});

export default function UserIDProvider(props){

    const [userID, setUserID] = useState('')

    return(
        <userContext.Provider value={[userID, setUserID]}>
            {props.children}
        </userContext.Provider>
    )
}