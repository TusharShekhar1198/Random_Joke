import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import './styles.css';

interface Joke {
  setup?: string;
  delivery?: string;
  joke?: string;
  type: 'single' | 'twopart';
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode');
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="container">
      <div className="joke-card">
        <div className="header">
          <h1 className="title">Random Dev Joke</h1>
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="refresh-button"
            aria-label="Get new joke"
          >
            <RefreshCw 
              className={`refresh-icon ${loading ? 'spinning' : ''}`}
            />
          </button>
        </div>

        <div className="joke-content">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : joke ? (
            <div>
              {joke.type === 'single' ? (
                <p className="joke-text">{joke.joke}</p>
              ) : (
                <>
                  <p className="joke-setup">{joke.setup}</p>
                  <p className="joke-delivery">{joke.delivery}</p>
                </>
              )}
            </div>
          ) : (
            <p className="loading-text">Failed to load joke. Please try again.</p>
          )}
        </div>

        <div className="footer">
          <p className="footer-text">
            Powered by JokeAPI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;