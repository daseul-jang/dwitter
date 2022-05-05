import { storageService } from "firebaseService/fbstorage";
import { dbService } from "firebaseService/fbstore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "css/dweet.css";

function Dweet({ dweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newDw, setNewDw] = useState(dweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠어요?");

    if (ok) {
      await dbService.delDweet(dweetObj.id);
      dweetObj.attachmentUrl &&
        (await storageService.deleteFile(dweetObj.attachmentUrl));
    }
  };

  const toggleEdit = () => setEdit((prev) => !prev);

  const onEditChange = (event) => setNewDw(event.target.value);

  const onEditSubmit = async (event) => {
    event.preventDefault();

    await dbService.editDweet(dweetObj.id, newDw);
    setEdit(false);
  };

  return (
    <div className="dweet">
      {edit ? (
        <>
          <form className="container dweetEdit" onSubmit={onEditSubmit}>
            <input
              className="formInput"
              type="text"
              value={newDw}
              required
              onChange={onEditChange}
            />
            <input className="formBtn" type="submit" value="완료" />
          </form>
          <span className="formBtn cancelBtn" onClick={toggleEdit}>
            취소
          </span>
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {dweetObj.attachmentUrl && (
            <img src={dweetObj.attachmentUrl} alt={dweetObj.createdAt} />
          )}
          {isOwner && (
            <div className="dweet__actions">
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dweet;
