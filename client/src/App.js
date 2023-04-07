import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [summonerName, setSummonerName] = useState();
  const [summonerId, setSummonerId] = useState();
  const [summonerMastery, setSummonerMastery] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!summonerId) {
      return;
    }

  }, [summonerId]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    // get summoner by account name
    axios.get(`http://localhost:8000/api/summoner/${summonerName}`)
      .then(res => {
        console.log(res);
        setSummonerId(res.data.id);
        console.log(summonerName);
        console.log(res.data.id); // log the id from the response instead of the state variable
        axios.get(`http://localhost:8000/api/summonerMastery/${res.data.id}`) // use the id from the response
          .then(res => {
            console.log(res.data);
            const masteryIds = res.data.map(mastery => mastery.championId);
            setSummonerMastery(masteryIds);
            setLoaded(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <h1>Wow this is cool!</h1>
      <p>{summonerName}</p>
      <form onSubmit={submitHandler}>
        <input type="text" value={summonerName} onChange={(e) => setSummonerName(e.target.value)} />
        <input type='submit'/>
      </form>
      {
        loaded && summonerMastery.map((championId) => (
          <div key={championId} class={'championDiv'}>
            <img class={'championIcon'} src={`/assets/${championId}.png`} alt={'champion image here'}/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
