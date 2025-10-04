import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const AuthContext = createContext() 

const auth_api_url = import.meta.env.VITE_DEV_HOST_AUTH_SERVICE_URL

export function AuthProvider({children}){

    const navigate = useNavigate()
    const [user, setUser] = useState({
        id: "",
        fullname: "",
        email :"",
        token: ""
    });
    const [authError, setAuthError] = useState("")
    
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token) {
            navigate("/")
            return
        }

        // Send Token to protected backend
        const decodeToken = async ()=>{
            try {
                const tokenResponse = await axios.post(`${auth_api_url}/refresh`, {
                    token: token
                })
                if(tokenResponse.status === 200){
                    setUser({
                        id: tokenResponse.data.user.id,
                        email: tokenResponse.data.user.email,
                        fullname: tokenResponse.data.user.fullname,
                        token: tokenResponse.data.token
                    })
                    navigate("/@me")
                }    

            } catch (error) {
                navigate("/")
            }
        }
        decodeToken()
    }, [])


    async function login(loginDetails){

        const {email, password} = loginDetails;

        if(email == ""){
            setAuthError("Email cannot be empty")
            return {success: false}
        }

        if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setAuthError("Enter a valid email address")
            return {success : false}
        }

        if(password == ""){
            setAuthError("Password cannot be empty")
            return {success: false}
        }

        setAuthError("")

        try {
            const loginResponse = await axios.post(`${auth_api_url}/login`, {
                email : email,
                password :password
            })

            if(loginResponse.status === 200){
                setUser({
                    id: loginResponse.data.user.id,
                    email: loginResponse.data.user.email,
                    fullname: loginResponse.data.user.fullname,
                    token: loginResponse.data.token
                })
                localStorage.setItem("token", loginResponse.data.token)
                return {success : true}
            }

        } catch (error) {
            if(error.response?.status == 401){
                setAuthError("Invalid creditials")
            } else {
                setAuthError("Something went wrong")
            }

            console.log("Error logining in: ", error)
            return {success : false}
        }
    }

    async function signup(userDetails) {
        const { email, fullname, password, confirmPassword } = userDetails;
        
        if(fullname === ""){
            setAuthError("Provide name field!")
            return {success : false}
        }

        if(email === ""){
            setAuthError("provide email address")
            return {success : false}
        }
        if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setAuthError("Enter a valid email address")
            return {success : false}
        }

        if(password === ""){
            setAuthError("Provide password field")
            return {success : false}
        }

        if(password !== confirmPassword){
            setAuthError("Passwords do not match")
            return{ success : false}
        }

        setAuthError("")

        try {
            const signupResponse = await axios.post(`${auth_api_url}/register`, {
                email: email,
                fullname: fullname,
                password: password
            })
            if(signupResponse.status === 200){
               return {success : true}
            }
        } catch (error) {
            setAuthError("Something went wrong while registering")
            console.log("Error registering: ", error)
            return {success : false}
        }
    }
    

    function logout(){
        localStorage.removeItem("token")
        navigate("/")
    }

    return(
        <AuthContext.Provider 
        value={{ 
            user, login, signup, 
            logout, authError, setAuthError }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)