import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React from 'react'

const Buttons = () => {
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
                </tr>
              </thead>
              <tbody>{/* Add table rows here */}</tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buttons
