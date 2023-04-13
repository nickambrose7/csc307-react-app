import Table from './Table'
import Form from './Form';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() { // function MyApp() is a component, it's purpose is to return a JSX element, useState is a hook
  const [characters, setCharacters] = useState([]);  
   function removeOneCharacter (index) { // index is
      makeDeleteCall(index).then( result => {
         if (result && result.status === 204) // changed from 200 to 201, table will only update if the post was successful
            setCharacters(characters.filter((character, i) => {
               return i !== index;
            }));
         else if (result && result.status === 404)
            console.log("resource not found");
         else
            console.log("something went wrong");
      });
  }
   async function makeDeleteCall(index){ // must be a separate function because it's async, table wwouldn't update otherwise
      try {
         const response = await axios.delete(`http://localhost:8000/users/${characters[index]['id']}`);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201) // changed from 200 to 201, table will only update if the post was successful
       setCharacters([...characters, result.data] );
    }
    );
 }
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       //update the state with the right representation of the object that we requested to be inserted, part 3 of spec
      //  setCharacters([...characters, response.data] );
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