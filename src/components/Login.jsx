import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login(props) {

    const [loginDetail, setLoginDetail] = useState({email: '',password: ''});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxMzcwYzNjODNmYWNlY2YyYWQxZmQzIn0sImlhdCI6MTcxMjU1MTQ5OH0.xlLjFJHqfyh-czM3v6sxd5666mExBS6FL6YMOmJz5vI"
            },
            body: JSON.stringify(loginDetail),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Loged in successfully","success");
            navigate('/');
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setLoginDetail({...loginDetail, [e.target.name]: e.target.value});
    }
    return (
        <div className='mt-3'>
            <h2 className='my-2'>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={loginDetail.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input type="password" className="form-control" value={loginDetail.password} id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
