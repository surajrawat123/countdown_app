import React, { useEffect, useState } from 'react'
import './App.css';

const App = () => {

  const [minutes, setMinutes] = useState(3);
  const [total, setTotal] = useState(minutes * 60);
  const [status, setStatus] = useState(false);
  const [user_input , setInput] = useState();
  // console.log(total);
  // const [timer,setTimer] = useState(false);

  useEffect(() => {
    let interval = null;
    if (status) {
      interval = setInterval(() => {
        if(total===0){
          clearInterval(interval);
        }else{
          setTotal(total => total - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setInput();
    setTotal(minutes*60);
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    if(e.target.value >= 0){
      setMinutes(e.target.value);
    }else{
      setMinutes(3);
    }
  }

  return (
    <div className='App'>
      <h1>CountDown StopWatch</h1>
      <div className='user_input'>
        <p>User Input</p>
        <form onSubmit={handleSubmit}>
          <input type="number" onChange={handleChange}/>
          <button className='submit' type='submit' value={user_input}>submit</button>
        </form>
      </div>
      <div className='container'>
        <div>
          <h1>{total / 60 > 9 ? Math.floor(total / 60) : `0${Math.floor(total / 60)}`} : {total % 60 > 9 ? Math.floor(total % 60) : `0${Math.floor(total % 60)}`}</h1>
        </div>
        <div>
          <button className='start' onClick={() => setStatus(true)}>Start</button>
          <button className='stop' onClick={() => setStatus(false)}>Stop</button>
          <button className='continue' onClick={() => setStatus(true)}>Continue</button>
          <button className='reset' onClick={() => { setTotal(minutes * 60); setStatus(false) }}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App