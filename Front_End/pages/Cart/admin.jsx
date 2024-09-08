
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Admindashboard from "./AdminDashboard"


 
export default function Home() {
  return (
    <div>
        <AdminDashboard />
     </div>
  )
}
 