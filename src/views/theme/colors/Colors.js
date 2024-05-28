import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { createRef, useEffect, useState } from 'react'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Profile</CCardHeader>
        <CCardBody>
          <CRow>
            <form>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                className="form-control"
                placeholder="Votre nom.."
              ></input>
              <label htmlFor="prenom">Prenom</label>
              <input
                className="form-control"
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Votre prenom.."
              ></input>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Votre email.."
              ></input>
              <label htmlFor="password">Mot de passe</label>
              <input
                className="form-control"
                type="text"
                id="password"
                name="password"
                placeholder="Votre mot de passe.."
              ></input>
              <label htmlFor="telephone">Telephone</label>
              <input
                type="text"
                id="telephone"
                className="form-control"
                name="telephone"
                placeholder="Votre telephone.."
              ></input>
              <input type="submit" className="btn btn-primary" value="Submit"></input>
            </form>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
