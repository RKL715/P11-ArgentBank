import {useDispatch} from "react-redux";
import {updateUserName} from "../../../redux/slice/userSlice.js";
import {useEffect, useState} from "react";

// TO FETCH USERNAME FROM SERVER
function updateUserNameOnServer (newName) {
    return fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({userName: newName})
    })
}

// TO FETCH USER ID (first & last name) FROM SERVER
function getUserIdFromServer () {
    return fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then((response) => response.json())
        .then ((data) => data.body );
}

// EDIT NAME FORM COMPONENT
function EditNameForm ( {toggleModal} ) {
const dispatch = useDispatch();
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

    useEffect(() => {
        getUserIdFromServer()
        .then((user) => {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        })
        .catch((error) => {
            console.error("Error getting user id", error);
        })
    }, []);

// FUNCTION TO HANDLE USERNAME CHANGE
const handleNameChange = (newName) => {
    updateUserNameOnServer(newName)
    .then (() => {
        dispatch(updateUserName(newName));
        toggleModal();
    })
        .catch ((error) => {
            console.error ("Error updating user name", error);
        })
}

  return (
      <form className="edit-name-form" onSubmit={(evt) => {
          evt.preventDefault();
          const newName = evt.target.username.value;
          handleNameChange(newName);
      }}>
          <label htmlFor="username" className="field-label">User Name</label>
          <input type="text" id="username" name="username" className="username-field"/>
          <label htmlFor="firstName" className="field-label">First Name</label>
            <input type="text" id="firstName" name="firstName" className="first-name-field" value={firstName} disabled/>
            <label htmlFor="lastName" className="field-label">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="last-name-field" value={lastName} disabled/>
          <div className="form-button-group">
          <button type="submit" className="form-button">Save</button>
          <button type="submit" className="form-button" onClick={toggleModal}>Cancel</button>
            </div>
      </form>
  );
}

export default EditNameForm;