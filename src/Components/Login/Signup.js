import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../images/—Pngtree—logo killer_661.png";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = ({ setEmail }) => {
  const [datas, setDatas] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [visible, setVisible] = useState(false);
  const usenavigate = useNavigate();

  const toggle = () => {
    setVisible(!visible);
  };

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if (!datas.name.trim()) {
      err.name = "Name is required";
    }
    if (!datas.email.trim()) {
      err.email = "Email is required";
    }
    if (!datas.password.trim()) {
      err.password = "Password is required";
    }
    if (datas.password !== datas.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }
    setErrors(err);

    if (Object.keys(err).length === 0) {
      // Make a POST request to the Laravel API
      fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: datas.name,
          email: datas.email,
          password: datas.password,
        }),
      })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setEmail(res.data.email);
          alert("Registration successful!");
          usenavigate("/login");
        } else {
          alert(res.message || "Registration failed");
        }
      })
      .catch(error => {
        alert(`Error during registration: ${error.message}`);
      });
    }
  };

  return (
    <div className="flex justify-items-center mt-4 overflow-hidden">
      <div className="flex flex-col mt-6 pb-6 mx-auto bg-gray-100 px-10">
        <img src={Logo} alt="logo" className='mt-2' />
        <h1 className="text-center text-2xl font-semibold my-4">Create Your Account</h1>
        
        <label className='px-2.5'>Name</label>
        <input
          type="text"
          name="name"
          value={datas.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2.5 m-2.5 rounded-lg border-2 w-full"
        />
        {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}

        <label className='px-2.5'>Email</label>
        <input
          type="email"
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
            type={visible ? "text" : "password"}
            name="password"
            value={datas.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2.5 m-2.5 rounded-lg border-2 w-full"
          />
          {visible ? (
            <FaEye className="absolute top-12 right-3 h-6 w-6 cursor-pointer" onClick={toggle} />
          ) : (
            <FaEyeSlash className="absolute top-12 right-3 h-6 w-6 cursor-pointer" onClick={toggle} />
          )}
          {errors.password && <p className="text-red-500 text-center">{errors.password}</p>}
        </div>

        <label className='p-2.5'>Confirm Password</label>
        <input
          type={visible ? "text" : "password"}
          name="confirmPassword"
          value={datas.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="p-2.5 m-2.5 rounded-lg border-2 w-full"
        />
        {errors.confirmPassword && <p className="text-red-500 text-center">{errors.confirmPassword}</p>}

        <button onClick={handleSubmit} className="bg-primary text-white p-2.5 m-2.5 w-full rounded-lg">
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/" className="text-blue-600">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
