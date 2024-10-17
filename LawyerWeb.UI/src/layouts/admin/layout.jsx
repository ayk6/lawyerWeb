import React from 'react'
import AdminHeader from '../../components/admin/header'
import AdminFooter from '../../components/admin/footer'
import AdminSidebar from '../../components/admin/sidebar'
import '../../scss/style.scss'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import AdminProvider from '../../contexts/adminContext'


const AdminLayout = () => {
    const { user } = useSelector((state) => state.user);

    if (!user || !user.roles || !user.roles.includes('Admin')) {
        return <Navigate to="/login" />;
    }

    return (
        <AdminProvider>
            <div className='admin-layout'>
                <AdminSidebar />
                <div className="wrapper d-flex flex-column min-vh-100">
                    <AdminHeader />
                    <div className="body flex-grow-1 content">
                        <Outlet />
                    </div>
                    <AdminFooter />
                </div>
            </div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossorigin="anonymous"
            />
        </AdminProvider>
    )
}

export default AdminLayout;
