import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    confirmPassword: '',
    telephone: '',
    role: 'Candidat',
  })

  const { nom, prenom, email, mdp, confirmPassword, telephone, role } = formData
  const history = useHistory()

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (mdp !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const url = 'http://localhost:5000/api/auth/register'
      const res = await axios.post(url, {
        nom,
        prenom,
        email,
        mdp,
        telephone,
        role,
      })

      // Enregistrer le token et les informations de l'utilisateur dans le localStorage
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      alert('Inscription réussie')

      // Rediriger l'utilisateur vers le tableau de bord
      history.push('/dashboard')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={onSubmit}>
                  <h1>Inscription</h1>
                  <p className="text-body-secondary">Créer votre compte</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="nom"
                      placeholder="Nom"
                      value={nom}
                      onChange={onChange}
                      autoComplete="nom"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="prenom"
                      placeholder="Prénom"
                      value={prenom}
                      onChange={onChange}
                      autoComplete="prenom"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={onChange}
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="mdp"
                      type="password"
                      placeholder="Mot de passe"
                      value={mdp}
                      onChange={onChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Répéter le mot de passe"
                      value={confirmPassword}
                      onChange={onChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      name="telephone"
                      placeholder="Téléphone"
                      value={telephone}
                      onChange={onChange}
                      autoComplete="telephone"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Inscription
                    </CButton>
                  </div>
                </CForm>
                <a href="/login">Déjà membre?</a>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
