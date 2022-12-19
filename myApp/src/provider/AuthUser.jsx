import { createContext, useState } from "react";

export const authContext = createContext({
    student: null,
    staff: null
});

export default function AuthProvider(props){

    const [authUser, setUserAuth] = useState({
            student: false,
            staff: false
        })

    return(
        <authContext.Provider value={[authUser, setUserAuth]}>
            {props.children}
        </authContext.Provider>
    )
}