import React from 'react'

const Profile = ({user}) => {
  return (
    <React.Fragment>
      <table>
        <tbody>
        <tr>
          <td>Username: </td>
          <td>{user.userName}</td>
        </tr>
        <tr>
        <td>Role: </td>
        <td>{user.role}</td>
        </tr>
        {
          user.department?
          <tr>
            <td>Department: </td>
            <td>{user.department}</td>
          </tr>:null
        }
        {
          user.mail?
          <tr>
            <td>Email: </td>
            <td>{user.mail}</td>
          </tr> : null
        }
        {
          user.phone?
          <tr>
            <td>Mobile: </td>
            <td>{user.phone}</td>
          </tr>:null
        }
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Profile
