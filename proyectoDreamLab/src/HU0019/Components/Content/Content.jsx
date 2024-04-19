import React from 'react'
import './Content.css'
import Card from '../Card/Card'
import Profile from '../Profile/Profile'
import Tabla from '../Tabla/Tabla'

const Content = () => {
  return (
    <div className="content-container">
      <table className="content-table">
        <tbody>
          <tr>
            <td className="content-column">
              <Profile></Profile>
            </td>
            <td>
              <Tabla />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Content
