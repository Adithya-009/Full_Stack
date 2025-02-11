import {useState} from 'react';
const App = () => {
  const Display = ({ counter }) => {
    return <div>Counter: {counter}</div>;
  };
  const [ counter, setCounter ] = useState(0);
  const increaseByOne = () => setCounter(counter+1);
  
  const setToZero = () => setCounter(0);

  return (
   <div style={ {textAlign: 'center', marginTop: '50px' }}>
     <Display counter={counter}/>
     <div style={{ marginTop: '20px' }}>
       <button onClick={increaseByOne}
     
  );
};
export default App;
