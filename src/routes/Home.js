import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";
import { dbService } from "firebaseService/fbstore";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [dweets, setDweets] = useState([]);

  useEffect(() => {
    dbService.dweetList(setDweets);
  }, []);

  return (
    <div>
      <DweetFactory userObj={userObj} />
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
