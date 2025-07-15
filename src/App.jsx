// App.js
import React, { useEffect, useState } from 'react';
import ThemeLog from './ThemeLog'; // ✅ Step 1: Import the component
import Form from './Form';
import TodoApp from './TodoApp';
import SubmissionsList from './SubmissionsList';
import { FaSun, FaMoon } from 'react-icons/fa'; // install using npm install react-icons
import Practice from './practice';
import HandleForm from './form2';

export default function App() {

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      setLoading(true);
      let res = await fetch('https://greentick.taxsutra.com/api/get-expert-article');
      let data = await res.json();
      console.log(data);
      console.log(data.img, data.thumbnail);

      setArticle(data);
    } catch {
      alert("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);


  return (
    <div style={{}}>
      <p>{loading ? "Loading" : ""}</p>
      <ul>
        {article.map((item, index) => (

          <li key={index}>
            <p><strong>ID:</strong> {item.expert_article_id}</p>
            <p><strong>Title:</strong> {item.topic_title}</p>
             <p><strong>Name of Author:</strong> {item.author_data?.[0]?.name || 'N/A'}</p>
            <p><strong>News Type:</strong>{item.author_data?.[0]?.affiliations || 'N/A'}</p>

            <img
              src={
                item.author_data?.[0]?.url
                  ? `https://greentick.taxsutra.com/upload/authors/${item.author_data[0].url}`
                  : 'https://via.placeholder.com/150'
              }
              alt="Author"
              style={{ width: 100, height: 'auto', borderRadius: 8, marginTop: 10 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
