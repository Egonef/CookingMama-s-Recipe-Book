import Navbar from '../components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';


export default function Login() {


    return (
        <div className="bg-red-200 h-svh">
            <div className=" animate-fade-in">
                <Navbar />
                <LoginForm />
            </div>
        </div>
    );
}