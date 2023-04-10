import Table from './Table'
import React, {useState} from 'react';
import Form from './Form';

function MyApp() { // function MyApp() is a component, it's purpose is to return a JSX element, useState is a hook
  const [characters, setCharacters] = useState([]);  
  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated); // filter creates a new array, so we need to set the state to the new array
  }
  function updateList(person) {
    setCharacters([...characters, person]);
  }
  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  )
}

export default MyApp;