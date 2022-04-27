import { useState } from "react";

export default function Home() {
  const [dweet, setDweet] = useState("");
  const onChange = (event) => {
    setDweet(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={dweet}
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="전송" />
      </form>
    </div>
  );
}
