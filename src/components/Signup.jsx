import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [signupDetail, setSignupDetail] = useState({name:'', email: '', password: '',cpassword:'' });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupDetail),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Successfully created your account","success");
        }
        else {
            props.showAlert("Invalid Details","danger");
        }
    }

    const onChange = (e) => {
        setSignupDetail({ ...signupDetail, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-3'>
            <h2 className='my-2'>Signup to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={signupDetail.name} id="name" name='name' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={signupDetail.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input type="password" className="form-control" value={signupDetail.password} id="password" name='password' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor='cpassword' className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={signupDetail.cpassword} id="cpassword" name='cpassword' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
