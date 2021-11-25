import './auth.css'
import { useState, useEffect } from 'react'
import axios                   from 'axios'
import env                     from 'react-dotenv'

const Auth = () => {
    //states hooks
    const [registerUsername, setRegisterUsername] = useState()
    const [registerEmail   , setRegisterEmail   ] = useState()
    const [registerPassword, setRegisterPassword] = useState()

    const [loginUsername, setLoginUsername] = useState()
    const [loginPassword, setLoginPassword] = useState()

    //functions
    const register = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            data: {
                api_key: env.api_key,
                username: registerUsername,
                email: registerEmail,
                password: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:4000/api/register"
        })
        .then(res => console.log(res.data))
    }

    const login = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            data: {
                api_key: env.api_key,
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:4000/api/login"
        })
        .then(res => console.log(res.data))
    }

    const check_auth = () => {
        axios({
            method: "POST",
            data: {
                api_key: env.api_key
            },
            withCredentials: true,
            url: "http://localhost:4000/auth"
        })
        .then(res => console.log(res.data))
    }

    const logout = () => {
        axios({
            method: "POST",
            data: {
                api_key: env.api_key
            },
            withCredentials: true,
            url: "http://localhost:4000/api/logout"
        })
        .then(res => console.log(res.data))
    }

    //main vue render
    return (
        <div className='Auth'>
            <div className="main">  
                	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
                <div className="signup">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input onChange={e => setRegisterUsername(e.target.value)} value={registerUsername} type="text" placeholder="Username" required=""/>
                        <input onChange={e => setRegisterEmail(e.target.value)} value={registerEmail} type="email" placeholder="Email" required=""/>
                        <input onChange={e => setRegisterPassword(e.target.value)} value={registerPassword} type="password" placeholder="Password" required=""/>
                        <button onClick={e => register(e)}>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input onChange={e => setLoginUsername(e.target.value)} value={loginUsername} type="text" placeholder="username" required=""/>
                        <input onChange={e => setLoginPassword(e.target.value)} value={loginPassword} type="password" placeholder="Password" required=""/>
                        <button onClick={e => login(e)}>Login</button>
                    </form>
                    <div style={{display: 'flex'}}>
                        <button onClick={check_auth} style={{fontSize: '15px', margin: '10px 15px'}}>check AUTH</button>
                        <button onClick={logout} style={{fontSize: '15px', margin: '10px 15px'}}>Log out</button>
                    </div>
                </div>
	        </div>
        </div>
    )
}

export default Auth
