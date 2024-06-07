import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {selectUser, updateUserNameOnServer} from "../../../redux/slice/userSlice.js";

// EDIT NAME FORM COMPONENT
function EditNameForm ( {toggleModal} ) {
const user = useSelector(selectUser);
const dispatch = useDispatch();
const [username, setUsername] = useState(user.profile.userName);

// FUNCTION TO HANDLE USERNAME CHANGE
const handleNameChange = (newName) => {
    dispatch (updateUserNameOnServer(newName))
        .catch ((error) => {
            console.error ("Error updating user name", error);
        })
        .finally (() => {
            toggleModal();
        });
}

  return (
      <form className="edit-name-form" onSubmit={(evt) => {
          evt.preventDefault();
          handleNameChange(username);
      }}>
          <label htmlFor="username" className="field-label">User Name</label>
          <input type="text" id="username" name="username" className="username-field" defaultValue={username} onChange={(evt) => setUsername(evt.target.value)}/>
          <label htmlFor="firstName" className="field-label">First Name</label>
            <input type="text" id="firstName" name="firstName" className="first-name-field" value={user.profile.firstName} disabled/>
            <label htmlFor="lastName" className="field-label">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="last-name-field" value={user.profile.lastName} disabled/>
          <div className="form-button-group">
          <button type="submit" className="form-button">Save</button>
          <button className="form-button" onClick={toggleModal}>Cancel</button>
            </div>
      </form>
  );
}

export default EditNameForm;