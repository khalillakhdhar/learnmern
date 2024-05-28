import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'
import { DocsLink } from 'src/components'

const Typography = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Utilisateurs
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>
        <CCardBody>
          <p>Gestion des utilisateurs</p>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{/* Add your user data here */}</tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Typography
