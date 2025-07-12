import React, { useEffect, useState } from "react";

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("https://ab35c56771fe.ngrok-free.app/submissions")
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://ab35c56771fe.ngrok-free.app/submissions/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      alert(data.message);

      // ✅ Remove from frontend list
      setSubmissions(submissions.filter((item) => item.id !== id));

    } catch (error) {
      console.error("❌ Error deleting:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div>
      <h2>All Submissions</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {submissions.map((item, index) => (
          <li key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            {item.image ? (
              <img src={`https://ab35c56771fe.ngrok-free.app/uploads/${item.image}`} alt="Uploaded" width="150" />
            ) : (
              <p>No image uploaded</p>
            )}

            {/* <button onClick={() => handleDelete(item.id)}>DELETE</button> */}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default SubmissionsList;
