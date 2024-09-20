import React, { useEffect, useState } from 'react';

const Players = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/players');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(data)

  return (
    <div className="players">
      <div>
      {data
      .filter((item) => item.position === "QB") 
      .map((item) => (
        <div key={item.id}> {/* Ensure each item has a unique key */}
          {item.firstName} {item.lastName}
        </div>
      ))}
      </div>

      <div>
      {data
      .filter((item) => item.position === "RB") 
      .map((item) => (
        <div key={item.id}> {/* Ensure each item has a unique key */}
          {item.firstName} {item.lastName}
        </div>
      ))}
      </div>
      <div>
      {data
      .filter((item) => item.position === "WR") 
      .map((item) => (
        <div key={item.id}> {/* Ensure each item has a unique key */}
          {item.firstName} {item.lastName}
        </div>
      ))}
      </div>
      <div>
      {data
      .filter((item) => item.position === "TE") 
      .map((item) => (
        <div key={item.id}> {/* Ensure each item has a unique key */}
          {item.firstName} {item.lastName}
        </div>
      ))}
      </div>
    </div>
  );

  
};

export default Players