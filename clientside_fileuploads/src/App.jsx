import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [filesData, setFilesData] = useState(null);

  const fileChangeHandler = (e) => {
    setFilesData(e.target.files);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    //handle file data from the state before sending
    const data = new FormData();

    // If have multiple files, can't just FileList object (or array of files) to FormData object --> need to do each append for file separately
    // data.append("images", filesData); <--- BAD
    for (let i = 0; i < filesData.length; i++) {
      data.append("images", filesData[i]);
    }
    fetch("http://localhost:5000/multiple", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Succesfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <h1>React App File Uploading</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="file" multiple onChange={fileChangeHandler} />
        <br />
        <br />
        <button type="submit">Submit File to Backend</button>
      </form>
    </div>
  );
}

export default App;
