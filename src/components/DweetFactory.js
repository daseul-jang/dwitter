import { storageService } from "firebaseService/fbstorage";
import { dbService } from "firebaseService/fbstore";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import "css/dweetFactory.css";

function DweetFactory({ userObj }) {
  const [dweet, setDweet] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef();

  const onChange = (event) => {
    setDweet(event.target.value);
  };

  const onSubmit = async (event) => {
    if (dweet === "") return;

    event.preventDefault();
    let attachmentUrl = "";

    if (fileUrl !== "") {
      const response = await storageService.uploadFile(userObj.uid, fileUrl);
      attachmentUrl = await storageService.downloadFile(response.ref);
    }

    const dweetObj = {
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    dbService.addDweet(dweetObj);

    setDweet("");
    fileClear();
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setFileUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearFileUrl = () => {
    fileClear();
  };

  const fileClear = () => {
    fileInputRef.current.value = null;
    setFileUrl("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          value={dweet}
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={120}
          onChange={onChange}
        />
        <input className="factoryInput__arrow" type="submit" value="전송" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>사진첨부</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
        style={{ opacity: 0 }}
      />
      {fileUrl && (
        <div className="factoryForm__attachment">
          <img
            src={fileUrl}
            style={{ backgroundImage: fileUrl }}
            alt="첨부사진 미리보기"
          />
          <div className="factoryForm__clear" onClick={onClearFileUrl}>
            <span>취소</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
}

export default DweetFactory;
