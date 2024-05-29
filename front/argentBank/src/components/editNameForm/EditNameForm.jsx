import {useDispatch} from "react-redux";
import {updateUserName} from "../../../redux/slice/userSlice.js";

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


function EditNameForm ( {toggleModal} ) {

const dispatch = useDispatch();

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
          <label htmlFor="username" className="username-label">User Name</label>
          <input type="text" id="username" name="username" className="username-field"/>
          <div className="form-button-group">
          <button type="submit" className="form-button">Save</button>
          <button type="submit" className="form-button" onClick={toggleModal}>Cancel</button>
            </div>
      </form>
  );
}

export default EditNameForm;