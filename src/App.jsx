import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Tasks from "./components/Tasks";

function App() {
  const [logged, setLogged] = useState(false);
  const token = logged ? localStorage.jwt : "";

 useEffect(()=>{
  if(localStorage.jwt){
    setLogged(true)
  }else{
    setLogged(false)
  }
 }, [logged])

  return (
    <div className="main">
      {logged ? <Tasks token={token} /> : <Login  />}
    </div>
  );
}

export default App;
