import Dweet from "components/Dweet";
import { dbService } from "firebaseService/fbstore";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);

  useEffect(() => {
    dbService.dweetList(setDweets);
  }, []);

  const onChange = (event) => {
    setDweet(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.addDweet(dweet, userObj);
    setDweet("");
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
        <input type="submit" value="전송" />
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
