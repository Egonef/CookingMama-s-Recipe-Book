import Navbar from '../components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';


export default function Login() {


    return (
        <div className="bg-[#C3B9AB] h-svh">
            <div className=" animate-fade-in">
                <Navbar />
                <LoginForm />
            </div>
        </div>
    );
}