import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Buttons = () => {
  const [coursList, setCoursList] = useState([])
  const user = JSON.parse(localStorage.getItem('user')) || {} // Récupération des infos de l'utilisateur

  useEffect(() => {
    const fetchCours = async () => {
      try {


        const response = await axios.get('http://localhost:5000/api/cours', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assurez-vous que le token est correctement géré
          },
        })
        setCoursList(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des cours:', error)
      }
    }

    fetchCours()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cours/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        setCoursList(coursList.filter((cours) => cours._id !== id)) // Mise à jour de l'affichage après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du cours:', error)
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste des cours</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Liste des cours par ordre de date de publication
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Enseignant</th>
                  <th>Support</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursList.map((cours) => (
                  <tr key={cours._id}>
                    <td>{cours.titre}</td>
                    <td>{cours.description}</td>
                    <td>
                      {cours.responsable.nom} {cours.responsable.prenom}
                    </td>
                    <td>
                      {cours.supports.map((support) => (
                        <div key={support._id}>
                          <a href={support.pieceJointe} target="_blank" rel="noopener noreferrer">
                            Voir Plus
                          </a>
                        </div>
                      ))}
                    </td>
                    <td>
                      {(user.role === 'Admin' || user._id === cours.responsable._id) && (
                        <CButton color="danger" onClick={() => handleDelete(cours._id)}>
                          Supprimer
                        </CButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
