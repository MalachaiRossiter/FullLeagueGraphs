import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [summonerName, setSummonerName] = useState();
  const [summonerId, setSummonerId] = useState();
  const [summonerMastery, setSummonerMastery] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // get summoner by account name
    axios.get(`http://localhost:8000/api/summoner/FierDragon`)
    .then(res => {
      console.log(res);
      setSummonerName(res.data.name);
      setSummonerId(res.data.id);
      console.log(summonerName);
      console.log(summonerId);
    })
    .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    if (!summonerId) {
      return;
    }
  
    axios.get(`http://localhost:8000/api/summonerMastery/${summonerId}`)
    .then(res => {
      console.log(res.data);
      const masteryIds = res.data.map(mastery => mastery.championId);
      setSummonerMastery(masteryIds);
      setLoaded(true);
    })
    .catch((err) => console.log(err));
  }, [summonerId]);
  

  return (
    <div className="App">
      <h1>Wow this is cool!</h1>
      <p>{summonerName}</p>
      <form onSubmit={}>

      </form>
      {
        loaded && summonerMastery.map((championId) => (
          <div key={championId}>
            <img src={`/assets/${championId}.png`} alt={'champion image here'}/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
