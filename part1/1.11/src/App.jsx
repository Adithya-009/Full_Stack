import { useState } from 'react';

const StatisticLine = ({ text, value }) => (
  <tr>
    <td><strong>{text}:</strong></td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  const averageScore = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  const positivePercentage = totalFeedback > 0 ? (good / totalFeedback) * 100 : 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total Feedback" value={totalFeedback} />
          <StatisticLine text="Average Score" value={averageScore.toFixed(2)} />
          <StatisticLine text="Positive Feedback" value={`${positivePercentage.toFixed(2)}%`} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => (
  <button 
    style={{ margin: '5px', padding: '10px 20px', fontSize: '16px' }}
    onClick={onClick}
  >
    {text}
  </button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'left', marginTop: '50px' }}>
      <h1>Give Feedback</h1>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
      </div>

      {totalFeedback > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;