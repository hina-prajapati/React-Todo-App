import React, { useState } from "react";

function HandleForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleSubmitBtn = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Enter all required fields');
      return;
    }

    try {
      const fetchData = await fetch("http://localhost:5000/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // ✅ important
        },
        body: JSON.stringify(formData)
      });

      const res = await fetchData.json();
      console.log("✅ Response:", res);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  return (
    <>
      <h1>React Form</h1>
      <form onSubmit={handleSubmitBtn}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default HandleForm;
