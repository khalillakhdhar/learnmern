import { cilCursor, cilDrop, cilPencil, cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Accueil',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Utilisateurs',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Components',
  },

  {
    component: CNavGroup,
    name: 'Cours',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste des cours',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Ajouter un cours',
        to: '/buttons/button-groups',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Déconnexion',
    to: '/login',
  },
]

export default _nav
