import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  const positivePercentage = totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h2>Statistics</h2>
      <p><strong>Good:</strong> {good}</p>
      <p><strong>Neutral:</strong> {neutral}</p>
      <p><strong>Bad:</strong> {bad}</p>
      <p><strong>Total Feedback:</strong> {totalFeedback}</p>
      <p><strong>Average Score:</strong> {averageScore.toFixed(2)}</p>
      <p><strong>Positive Feedback:</strong> {positivePercentage.toFixed(2)}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'left', marginTop: '50px' }}>
      <h1>Give Feedback</h1>
      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => setGood(good + 1)}
        >
          Good
        </button>
        <button 
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => setNeutral(neutral + 1)}
        >
          Neutral
        </button>
        <button 
          style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => setBad(bad + 1)}
        >
          Bad
        </button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;