import { useState } from 'react'
import './App.css'
import clear from './assets/sunny.png'
import cloud from './assets/cloudy (1).png'
import drizzle from './assets/drizzle (1).png'
import humidity from './assets/humidity (1).png'
import rain from './assets/rain (1).png'
import search from './assets/search (3).png'
import snow from './assets/snow (1).png'
import wind from './assets/wind (1).png'

const Details = ({iconn,deg,state,contr,lat,lon,hum,win})=>{
  return(
    <>
    <div>
      <img src={iconn} alt="icon" className="ic"/>
      <div className="dege">{deg}°C</div>
      <div className="st">{state}</div>
      <div className="ct">{contr}</div>
      <div className="cord">
      <div>  <span>Latitude</span>
      <span>{lat}</span></div>
      <div><span>Longitude</span>
      <span>{lon}</span></div>
      </div>
      <div className="wet">
        <div className="wete">
          <img src={humidity} className="hum"></img>
      <span>{hum} %</span>
      <span>Humidity</span>
      </div>
      <div className="weth">
        <img src={wind} alt="img" className="win"></img>
        <span>{win} Km/hr</span>
      <span>Wind-Speed</span>
      </div>
    </div>
    </div>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [state,setState]=useState("Chennai")
  const[contr,setContr]=useState("In")
  const[deg,setDeg]=useState(0)
  const[icon,setIcon]=useState(snow)
  const [lat,setLat]=useState(0)
  const [lon,setLon]=useState(0)
  const [hum,setHum]=useState(0)
  const [win,setWin]=useState(0)
  const[text,setText]=useState("Chennai")
  const [cit,setCit]=useState(false)
  const[load,setLoad]=useState(false)
  const weather={
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  }

  const searche = async()=>{
    setLoad(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=6509b4b0aaedc1518d9e36a2313bef0b&units=Metric`;
  try
  {
    let res= await fetch(url);
    let data= await res.json();
    if(data.cod==="404")
    {
      console.error("City Not Found");
      setCit(true);
      setLoad(false);
      return;
    }
    setHum(data.main.humidity);
    setWin(data.wind.speed);
    setDeg(Math.floor(data.main.temp));
    setState(data.name);
    setContr(data.sys.country);
    setLat(data.coord.lat);
    setLon(data.coord.lon);
    const weat=data.weather[0].icon;
    setIcon(weather[weat]||clear);
    setCit(false);
  }
  catch(error)
  {}
  finally{
    setLoad(false);
  }
}

  const handle=(e)=>{
    setText(e.target.value)
  }
  const hand=(e)=>{
    if(e.key==="Enter")
    searche();
  }

  return (
    <>
    <div className="container">
      <div className="int">
      <input type="text" placeholder="Search City" className="cit" onChange={handle}  onKeyDown={hand} value={text}></input>
      <img src={search} alt="image" className="sere" onClick={()=>searche()}></img>
      </div>
      {!cit && !load &&<Details iconn={icon} deg={deg} state={state} contr={contr} lat={lat} lon={lon} hum={hum} win={win}/>}
     {cit &&<div><h3 className='ciit'>City Not Found</h3></div>}
    </div>
    </>
  );
}

export default App
