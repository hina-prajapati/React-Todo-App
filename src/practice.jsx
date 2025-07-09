import React, { useState } from "react";

function Practice({ contact }){
    const { user, posts } = contact;

  return(
    <>
    <h1>React Basics</h1>
    <ul>
      <li><p><strong>Name : </strong>{user.name}</p>
      {user.hobbies.map((item, index) =>(
        <p>{item}</p>
      ))}
      </li>
    </ul>
    </>
  )
}

export default Practice;