import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from './header'
import Sidebar from './sidebar'

const Layout = ({children}) => {
    const container = {
        "display": 'grid',
        "width": '100%',
        "minHeight": '100vh',
        "backgroundColor": '#f5f5f5'
    }

    const router = useRouter();
    const [show, setShow] = useState(false);
    
    if(router.pathname.includes('/dashboard') || router.pathname.includes('/logs')) {
        return (
            <div style={container}>
                <Header setShow={setShow}/>
                <Sidebar show={show} setShow={setShow}/>
                {children}
            </div>
        )
    } else if (router.pathname.includes('/')) {
        return children;
    }
}

export default Layout