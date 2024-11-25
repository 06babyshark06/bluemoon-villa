'use client'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ReactToast() {
    return (
        <ToastContainer position="top-right" autoClose={3000} className='z-50'/>
    )
}