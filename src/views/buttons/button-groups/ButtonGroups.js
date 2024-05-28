import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ButtonGroups = () => {
  const [course, setCourse] = useState({
    titre: '',
    description: '',
  })
  const [supports, setSupports] = useState([{ titre: '', pieceJointe: '' }])

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.id]: e.target.value })
  }

  const handleSupportChange = (index, e) => {
    const newSupports = [...supports]
    newSupports[index][e.target.name] = e.target.value
    setSupports(newSupports)
  }

  const addSupport = () => {
    setSupports([...supports, { titre: '', pieceJointe: '' }])
  }

  const removeSupport = (index) => {
    const newSupports = supports.filter((_, i) => i !== index)
    setSupports(newSupports)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('Token not found')
        return
      }

      const user = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const courseData = { ...course, responsable: user._id }

      // Créer le cours
      const courseRes = await axios.post('http://localhost:5000/api/cours', courseData, config)

      // Créer les supports
      for (const support of supports) {
        await axios.post(
          'http://localhost:5000/api/supports',
          { ...support, cours: courseRes.data._id },
          config,
        )
      }

      alert('Cours et supports ajoutés avec succès')
    } catch (error) {
      console.error(error)
      alert("Erreur lors de l'ajout du cours et des supports")
    }
  }
  // use effect to verify if localstorage user.grade is Admin or Enseignant
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if ((user && user.grade !== 'Admin') || user.grade !== 'Enseignant') {
      window.location.replace('http://localhost:3000/login#/buttons/buttons')
    }
  
}, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ajouter un cours</strong>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="titre" className="form-label">
                  Titre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titre"
                  value={course.titre}
                  onChange={handleCourseChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={course.description}
                  onChange={handleCourseChange}
                ></textarea>
              </div>

              {supports.map((support, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Support {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titre"
                    placeholder="Titre du support"
                    value={support.titre}
                    onChange={(e) => handleSupportChange(index, e)}
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="pieceJointe"
                    placeholder="URL du support"
                    value={support.pieceJointe}
                    onChange={(e) => handleSupportChange(index, e)}
                  />
                  <CButton color="danger" className="mt-2" onClick={() => removeSupport(index)}>
                    Supprimer ce support
                  </CButton>
                </div>
              ))}
              <CButton type="button" color="secondary" onClick={addSupport}>
                Ajouter un support
              </CButton>
              <CButton type="submit" color="primary" className="mt-3">
                Ajouter
              </CButton>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ButtonGroups
