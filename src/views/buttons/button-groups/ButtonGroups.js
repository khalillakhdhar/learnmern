import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React from 'react'

const ButtonGroups = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ajouter un cours</strong>
          </CCardHeader>
          <CCardBody>
            <p>Ajout</p>

            <p>
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titre
                  </label>
                  <input type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea className="form-control" id="description" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </form>
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ButtonGroups
