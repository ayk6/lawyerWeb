import React, { useState } from 'react'
import {
    CAvatar,
    //CBadge,
    CDropdown,
    //CDropdownDivider,
    //CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    //cilBell,
    //cilCreditCard,
    //cilCommentSquare,
    //cilEnvelopeOpen,
    //cilFile,
    cilLockLocked,
    //cilSettings,
    //cilTask,
    //cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import adminPP from '../../../assets/images/LawProfile.png'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { Button, Modal } from 'react-bootstrap'
import { logout } from '../../../redux/userSlice'

const AdminHeaderDropdown = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const handleLogout = () => {
        logout();
        dispatch(logout());
        navigate("/login");
        addToast('Çıkış Başarılı', { appearance: 'success' });
        setShowModal(false);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Çıkış Yap</Modal.Title>
                </Modal.Header>
                <Modal.Body>Çıkmak istediğinizden emin misiniz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Çıkış Yap
                    </Button>
                </Modal.Footer>
            </Modal>

            <CDropdown variant="nav-item">
                <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                    <CAvatar src={adminPP} size="md" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                    {/* <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilBell} className="me-2" />
                    Updates
                    <CBadge color="info" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilTask} className="me-2" />
                    Tasks
                    <CBadge color="danger" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilCommentSquare} className="me-2" />
                    Comments
                    <CBadge color="warning" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem href="#">
                    <CIcon icon={cilFile} className="me-2" />
                    Projects
                    <CBadge color="primary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownDivider /> */}
                    <CDropdownItem href="#" onClick={handleShowModal}>
                        <CIcon icon={cilLockLocked} className="me-2" />
                        Çıkış yap
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </>

    )
}

export default AdminHeaderDropdown