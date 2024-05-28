import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Colors = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
  })

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        password: '', // On ne remplit pas le mot de passe pour des raisons de sécurité
        telephone: user.telephone || '',
      })
    }
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Correctement formater l'en-tête d'autorisation
        },
      }

      const url = `http://localhost:5000/api/candidats/${user.id}` // URL avec l'ID du candidat
      const res = await axios.put(url, formData, config) // Utiliser PUT pour la mise à jour

      alert('Mise à jour réussie')
      // Mettre à jour les informations de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(res.data))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la mise à jour')
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Profile</CCardHeader>
        <CCardBody>
          <CRow>
            <form onSubmit={onSubmit}>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="form-control"
                value={formData.nom}
                onChange={onChange}
                placeholder="Votre nom.."
              />
              <label htmlFor="prenom">Prenom</label>
              <input
                className="form-control"
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={onChange}
                placeholder="Votre prenom.."
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Votre email.."
              />
              <label htmlFor="password">Mot de passe</label>
              <input
                className="form-control"
                type="password" // Changer en type "password" pour des raisons de sécurité
                id="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                placeholder="Votre mot de passe.."
              />
              <label htmlFor="telephone">Telephone</label>
              <input
                type="text"
                id="telephone"
                className="form-control"
                name="telephone"
                value={formData.telephone}
                onChange={onChange}
                placeholder="Votre telephone.."
              />
              <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
