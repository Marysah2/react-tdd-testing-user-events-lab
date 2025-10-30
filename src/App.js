import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    javascript: false,
    react: false,
    css: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedInterests = Object.keys(interests)
      .filter((key) => interests[key])
      .join(", ");

    setMessage(
      `Thank you, ${name}! We've received your email (${email}). ` +
      (selectedInterests
        ? `You're interested in: ${selectedInterests}.`
        : "No interests selected.")
    );
    setSubmitted(true);
  };

  return (
    <div>
      <h1>My Portfolio</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} aria-label="Newsletter signup form">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name input"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email input"
            />
          </div>

          <fieldset>
            <legend>Interests:</legend>
            <label>
              <input
                type="checkbox"
                name="javascript"
                checked={interests.javascript}
                onChange={handleInterestChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                name="react"
                checked={interests.react}
                onChange={handleInterestChange}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                name="css"
                checked={interests.css}
                onChange={handleInterestChange}
              />
              CSS
            </label>
          </fieldset>

          <button type="submit">Subscribe</button>
        </form>
      ) : (
        <div aria-live="polite">
          <h2>Success!</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;