import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [summonerName, setSummonerName] = useState();
  const [summonerId, setSummonerId] = useState();
  const [summonerMastery, setSummonerMastery] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // get summoner by account name
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/FierDragon?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(res => {
      setSummonerName(res.data.name);
      setSummonerId(res.data.id);
      console.log(summonerName);

      // get champion masteries by summoner name if account is valid
      axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        setSummonerMastery(res.data);
        console.log(summonerMastery);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <div className="App">
      <h1>Wow this is cool!</h1>
      <p>{summonerName}</p>
      {
        loaded && summonerMastery.map((champion) => (
          <div key={champion}>
            <img src={`/assets/${champion.id}`} alt={'champion image here'}/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
