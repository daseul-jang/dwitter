import Dweet from "components/Dweet";
import { storageService } from "firebaseService/fbstorage";
import { dbService } from "firebaseService/fbstore";
import { useEffect, useRef, useState } from "react";

function Home({ userObj }) {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    dbService.dweetList(setDweets);
  }, []);

  const onChange = (event) => {
    setDweet(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (fileUrl !== "") {
      const response = await storageService.uploadFile(userObj.uid, fileUrl);
      attachmentUrl = await storageService.downloadFile(response.ref);

      console.log(attachmentUrl);
    }

    const dweetObj = {
      text: dweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.addDweet(dweetObj);

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
    <div>
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
      <div>
        {dweets.map((dw) => (
          <Dweet
            key={dw.id}
            dweetObj={dw}
            isOwner={dw.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
