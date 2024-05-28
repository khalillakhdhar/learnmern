import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DocsLink } from 'src/components'

const Typography = () => {
  const [users, setUsers] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    mdp: '', // Assurez-vous que le champ mdp est inclus
    telephone: '',
    role: 'Candidat',
  })

  useEffect(() => {
    // Vérifier si l'utilisateur connecté est un admin
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role === 'Admin') {
      setIsAdmin(true)
    }

    // Récupérer la liste des utilisateurs
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const res = await axios.get('http://localhost:5000/api/candidats', config)
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`http://localhost:5000/api/candidats/${id}`, config)
        setUsers(users.filter((user) => user._id !== id))
      } catch (err) {
        console.error(err)
        alert('Erreur lors de la suppression') // Afficher le message d'erreur
      }
    }
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post('http://localhost:5000/api/candidats', newUser, config)
      setUsers([...users, res.data])
      setNewUser({
        nom: '',
        prenom: '',
        email: '',
        mdp: '',
        telephone: '',
        role: 'Candidat',
      })
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'ajout")
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Utilisateurs
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>
        <CCardBody>
          <p>Gestion des utilisateurs</p>
          {isAdmin && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="form-control"
                  value={newUser.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  className="form-control"
                  value={newUser.prenom}
                  onChange={handleChange}
                  placeholder="Prénom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mdp">Mot de passe</label>
                <input
                  type="password"
                  id="mdp"
                  name="mdp"
                  className="form-control"
                  value={newUser.mdp}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  className="form-control"
                  value={newUser.telephone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={newUser.role}
                  onChange={handleChange}
                >
                  <option value="Candidat">Candidat</option>
                  <option value="Enseignant">Enseignant</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <CButton type="submit" color="primary">
                Ajouter
              </CButton>
            </form>
          )}
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone}</td>
                  <td>
                    {isAdmin && (
                      <CButton color="danger" onClick={() => handleDelete(user._id)}>
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
    </>
  )
}

export default Typography
