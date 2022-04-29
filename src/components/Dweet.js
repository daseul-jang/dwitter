import { dbService } from "firebaseService/fbstore";
import { useState } from "react";

function Dweet({ dweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newDw, setNewDw] = useState(dweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하시겠어요?");

    if (ok) {
      dbService.delDweet(dweetObj.id);
    }
  };

  const toggleEdit = () => setEdit((prev) => !prev);
  const onEditChange = (event) => setNewDw(event.target.value);
  const onEditSubmit = (event) => {
    event.preventDefault();

    dbService.editDweet(dweetObj.id, newDw);
    setEdit(false);
  };

  return (
    <div>
      {edit ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onEditSubmit}>
                <input
                  type="text"
                  value={newDw}
                  required
                  onChange={onEditChange}
                />
                <input type="submit" value="완료" />
              </form>
              <button onClick={toggleEdit}>취소</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{dweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEdit}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dweet;
