import React, {useState} from "react";

function SimpleInput() {
  const [state, setName] = useState({name: ""});
  return (
    <div>
      <h1>Simple Input Component</h1>
      <input type="text" value={state.name} onChange={(event) => setName({name: event.target.value})} />
      <h1>{state.name}</h1>
    </div>
  )
}

export default function App() {
  return <SimpleInput />;
}