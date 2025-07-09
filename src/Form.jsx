import React, { useState,useRef } from "react"
import './App.css';
import SubmissionsList from "./SubmissionsList";
import TodoApp from "./TodoApp";


function Form() {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        image: null
    });

    const handleForm = async (e) => {
        e.preventDefault();
    
        if (!formData.name || !formData.email || !formData.phone || !formData.image) {
            alert("Please fill all fields including image");
            return;
        }
    
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("image", formData.image); // ✅ append image as file
    
        try {
            const res = await fetch("http://localhost:5000/submit", {
                method: "POST",
                body: data, // ✅ don't set headers, browser will auto-set multipart
            });
    
            const result = await res.json();
            alert(result.message);
    
            // Clear form
            setFormData({
                name: "",
                email: "",
                phone: "",
                image: null
            });
            fileInputRef.current.value = "";
        } catch (err) {
            console.error("❌ Error:", err);
            alert("Something went wrong!");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
          setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      };

    return (
        <>
            <div className="form-container">
                <h1>Form</h1>
                <form onSubmit={handleForm}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                    />
                    <br /><br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                    />
                    <br /><br />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                    />
                    <br />
                    <br />
                    <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    ref={fileInputRef}
                    />
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <SubmissionsList />
               <TodoApp />
            </div>
          
        </>
        
    );
}

export default Form;