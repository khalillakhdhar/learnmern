import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    mdp: '',
  })

  const { email, mdp } = formData
  const navigate = useNavigate() // Utiliser useNavigate

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = 'http://localhost:5000/api/auth/login'
      const res = await axios.post(url, {
        email,
        mdp,
      })

      // Enregistrer le token et les informations de l'utilisateur dans le localStorage
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      alert('Connexion réussie')

      // Rediriger l'utilisateur vers le tableau de bord
      navigate('/dashboard') // Utiliser navigate pour rediriger
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la connexion')
    }
  }
  // useEffect to empty and clear localstorage
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Connexion</h1>
                    <p className="text-body-secondary">Veuillez vous connecter</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="mdp"
                        type="password"
                        placeholder="Mot de passe"
                        value={mdp}
                        onChange={onChange}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Connexion
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Mot de passe oublié?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Inscription</h2>
                    <p>Pas encore membre?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Inscrire maintenant{' '}
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
