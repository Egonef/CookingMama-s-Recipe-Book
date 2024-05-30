import Navbar from '../components/Navbar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';


export default function Register() {


    return (
        <div className="bg-[#C3B9AB] h-svh">
            <div className=" animate-fade-in">
                <Navbar />
                <RegisterForm />
            </div>
        </div>
    );
}