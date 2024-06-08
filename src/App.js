import React, { useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState('react');
  const [url, setUrl] = useState(`http://hn.algolia.com/api/v1/search?query=react`);

  const fetchNews = (searchUrl) => {
    setLoading(true)
    fetch(searchUrl)
      .then(result => result.json())
      .then(data => (setNews(data.hits),setLoading(false)))
      .catch(error => console.log(error));
  };
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    fetchNews(url);
  }, [url]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
  };

  return (
    <div>
      <h2>News</h2>
      {loading ? <h2>Loading...</h2> : ""}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {news.map((n, i) => (
        <p key={i}>{n.title}</p>
      ))}
    </div>
  );
};
export default App;
