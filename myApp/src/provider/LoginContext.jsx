import { createContext, useState } from "react";

export const loginContext = createContext({
    student: null,
    staff: null
});

export default function LoginProvider(props){

    const [checkLogin, setLogin] = useState({
            student: false,
            staff: false
        })

    return(
        <loginContext.Provider value={[checkLogin, setLogin]}>
            {props.children}
        </loginContext.Provider>
    )
}