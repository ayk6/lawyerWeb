import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilShortText,
  cilNotes,
  cilPencil,
  cilSpeedometer,
  cilMenu,
  cilHome,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [

  {
    component: CNavItem,
    name: 'Dashboard',
    to: 'dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }, {
    component: CNavTitle,
    name: 'Sİteye Dön',
  },
  {
    component: CNavItem,
    name: 'Anasayfa',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Admin',
  },
  {
    component: CNavGroup,
    name: 'Kategoriler',
    to: 'admin/',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kategorileri Gör',
        to: 'categories',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Makaleler',
    to: 'admin/',
    icon: <CIcon icon={cilShortText} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Makaleleri Gör',
        to: 'articles',
      },
      {
        component: CNavItem,
        name: 'Makale Ekle',
        to: 'insertarticle',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Yorumlar',
    to: 'admin/',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Yorumları Gör',
        to: 'comments',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
