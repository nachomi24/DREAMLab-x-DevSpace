import React from 'react'
import './Content.css'
import Profile from '../Profile/Profile'
import Tabla from '../Tabla/Tabla'

const Content = () => {
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="profile-container">
                <Profile />
              </div>
            </td>
            <td>
              <div className="tabla-container">
                <Tabla />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Content
