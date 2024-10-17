import React from 'react';
import {
    CCloseButton,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
} from '@coreui/react';


import navigation from '../../_nav';
import { AppSidebarNav } from './sidebarNav';
import { useAdminContext } from '../../contexts/adminContext';
import CIcon from '@coreui/icons-react';
import { sygnet } from '../../assets/brand/sygnet';
import { logo } from '../../assets/brand/logo';




const AdminSidebar = () => {
    const { sidebarShow, setSidebarShow, unfoldable, setUnfoldable } = useAdminContext();
    //const navigate = useNavigate();

    return (
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                setSidebarShow(visible);
            }}
        >
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>
                    <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
                    <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => setSidebarShow(false)}
                ></CCloseButton>
            </CSidebarHeader>
            <AppSidebarNav items={navigation} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() => setUnfoldable(!unfoldable)}
                />
            </CSidebarFooter>
        </CSidebar>
    );
}

export default AdminSidebar;
