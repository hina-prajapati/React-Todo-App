// App.js
import React, { useState } from 'react';
import ThemeLog from './ThemeLog'; // ✅ Step 1: Import the component
import Form from './Form';
import TodoApp from './TodoApp';
import SubmissionsList from './SubmissionsList';
import { FaSun, FaMoon } from 'react-icons/fa'; // install using npm install react-icons
import Practice from './practice';

export default function App() {
  const [color, setColor] = useState("white");

  const toggleBtn = () =>{
    setColor(color === "white" ? "black" : "white");
  }

  const isDarkMode = color === "black";

  return (
    <div style={{ backgroundColor: color, color: isDarkMode ? "white" : "black", height: "100vh", padding: "20px", width:400 }}>
    <button onClick={toggleBtn} style={{fontSize:30}}>
     { isDarkMode ? <FaMoon style={{color:"white"}} /> : <FaSun style={{color:"yellow"}} /> }
    </button>
    {/* <Form /> */}
    <TodoApp />
    </div>
  );
}
