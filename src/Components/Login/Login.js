import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../images/—Pngtree—logo killer_661.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ setEmail }) => {
  const [datas, setDatas] = useState({
    email: '',
    password: '',
  });

  const [visible, setVisible] = useState(false);
  const usenavigate = useNavigate();
  
  const toggle = () => {
    setVisible(!visible);
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas({
      ...datas,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};
    if (!datas.email.trim()) {
      err.email = "Username is required";
    }
    if (!datas.password.trim()) {
      err.password = "Password is required";
    }
    setErrors(err);

    if (Object.keys(err).length === 0) {
      fetch('http://127.0.0.1:8000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: datas.email,
          password: datas.password,
        }),
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          setEmail(res.email);
          window.localStorage.setItem("token", res.token);
          window.localStorage.setItem("userId", res.id);
          usenavigate("/");
        } else {
          alert("Email and password don't match");
        }
      })
      .catch(error => {
        alert(`Error during login: ${error.message}`);
      });
    }
  };

  return (
    <div className="flex justify-items-center mt-4 overflow-hidden">
      <div className="flex flex-col mt-6 pb-6 mx-auto bg-gray-100 px-10">
        <img src={Logo} alt="logo" className='mt-2' />
        <h1 className="text-center text-2xl font-semibold my-4">Sign in to your Account</h1>
        <label className='px-2.5'>Email</label>
        <input type="text"
          name="email"
          value={datas.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2.5 m-2.5 rounded-lg border-2 w-full"
        />
        {errors.email && <p className="text-red-500 text-center">{errors.email}</p>}
        <div className="relative">
          <label className='p-2.5'>Password</label>
          <input
            name="password"
            value={datas.password}
            onChange={handleChange}
            type={visible ? "text" : "password"}
            placeholder="password"
            className="p-2.5 m-2.5 rounded-lg border-2 w-full"
          />
          {visible ? (
            <FaEye className="absolute top-12 right-3 h-6 w-6 cursor-pointer" onClick={toggle} />
          ) : (
            <FaEyeSlash className="absolute top-12 right-3 h-6 w-6 cursor-pointer" onClick={toggle} />
          )}
          {errors.password && <p className="text-red-500 text-center">{errors.password}</p>}
        </div>
        <button onClick={handleSubmit} className="bg-primary text-white p-2.5 m-2.5 w-full rounded-lg">
          Sign in
        </button>
        <p className="text-center mt-4">
  Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
</p>
      </div>
    </div>
  );
};

export default Login;
