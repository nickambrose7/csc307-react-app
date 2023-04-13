import Table from './Table'
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() { // function MyApp() is a component, it's purpose is to return a JSX element, useState is a hook
  const [characters, setCharacters] = useState([]);  
  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated); // filter creates a new array, so we need to set the state to the new array
  }
  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201) // changed from 200 to 201, table will only update if the post was successful
       setCharacters([...characters, person] );
    });
 }
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }
  // fetchAll is an async function that returns a promise, an async function always returns a promise. 
  //a promise is an object that represents the eventual completion or failure of an asynchronous operation
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }
 // useEffect is a hook that allows us to run code when the component mounts and unmounts
// a component mounting means it is being rendered for the first time
 useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setCharacters(result);
   });
}, [] );
  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  )
}

export default MyApp;