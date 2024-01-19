import React from 'react'

const Profile = ({user}) => {
  return (
    <React.Fragment>
      {user && <table>
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
          </tr>:'Not Defined'
        }
        {
          user.mail?
          <tr>
            <td>Email: </td>
            <td>{user.mail}</td>
          </tr> : 'Not Defined'
        }
        {
          user.phone?
          <tr>
            <td>Mobile: </td>
            <td>{user.phone}</td>
          </tr>: 'Not Defined'
        }
        </tbody>
      </table>}
    </React.Fragment>
  )
}

export default Profile
