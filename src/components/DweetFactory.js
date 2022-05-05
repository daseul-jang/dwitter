import { storageService } from "firebaseService/fbstorage";
import { dbService } from "firebaseService/fbstore";
import { useRef, useState } from "react";

function DweetFactory({ userObj }) {
  const [dweet, setDweet] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef();

  const onChange = (event) => {
    setDweet(event.target.value);
  };

  const onSubmit = async (event) => {
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={dweet}
        placeholder="무슨 일이 일어나고 있나요?"
        maxLength={120}
        onChange={onChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
      />
      <input type="submit" value="전송" />
      {fileUrl && (
        <div>
          <img src={fileUrl} width="100px" alt={fileUrl} />
          <button onClick={onClearFileUrl}>취소</button>
        </div>
      )}
    </form>
  );
}

export default DweetFactory;
