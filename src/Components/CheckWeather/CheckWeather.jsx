import React, { useEffect, useState }  from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { ImLocation2 } from "react-icons/im";
import Card from '../WeatherCard/Card'
import { SlCalender } from "react-icons/sl";
import './CheckWeather.css'
import axios from 'axios';



const CheckWeather = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityName, setCityName] = useState('Delhi');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCityName(searchTerm);
      setSearchTerm('');
      fetchWeatherData(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };



  // To COnvert Unix into Time for sunset and sunrise

  function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
  
    let hours = date.getHours();
    const minutes = '0' + date.getMinutes();
  
    // Convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  
    const formattedTime = hours + ':' + minutes.substr(-2) + ' ' + ampm;
    return formattedTime;
  }
 


  // To filter all repeating dates 
  const filterUniqueDates = (weatherList) => {
    const uniqueDates = {};
    const uniqueWeatherList = [];

    weatherList.forEach((weatherItem) => {
      const date = weatherItem.dt_txt.split(' ')[0]; 

      if (!uniqueDates[date]) {
        uniqueDates[date] = true;
        uniqueWeatherList.push(weatherItem);
      }
    });
    console.log(uniqueWeatherList.slice(0, 5))
    return uniqueWeatherList.slice(0, 5); 
  };





  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setcoordinates] = useState('');
  const [sunrise, setsunrise] = useState('');
  const [sunset, setsunset] = useState('');

  const fetchWeatherData = async (cityn) => {
    try {
      const apiKey = '19387e9cf1cf920fdd61ae7db35011f1';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityn}&appid=${apiKey}`
      );
      setcoordinates(response.data.city.coord.lat +`"N & `+response.data.city.coord.lon + `"S` )
      setsunrise(convertUnixTimestamp(response.data.city.sunrise))
      setsunset(convertUnixTimestamp(response.data.city.sunset))
      setWeatherData(filterUniqueDates(response.data.list))

    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(cityName); 
  }, []);  

  



  // TO CONVERT IT IN DD-MM-YYYY 
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    return formattedDate;
  }
  

  return (

    
    <div className='Main-Body'>

      <div className="city-search-container">

      <div className="city-name">
        <div><span className='location'><ImLocation2/></span> {cityName}</div>
        <div className='coordinates'>{coordinates}</div>
      </div>

      <div className="city-search">
        <input
          type="text"
          placeholder="Search your city here..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
        />

        <button className='searchbutton' onClick={() => { setCityName(searchTerm); setSearchTerm('');
        fetchWeatherData(searchTerm);
       }}>
        
          <AiOutlineSearch />
        </button>
      </div>
    </div>



    <div className='Weather-Forecast'>

      <div className='Weather-informations'>

      <div className="Select-Date">
                <p>Select Date</p>
                <div className='Date-container'>
                  <span className='calender-icon'><SlCalender/></span>
                  <span className='Date'>28 nov 2023</span>
                </div>
                
            </div>

            <div className="High-temp">High Temperature</div>
            <div className="Low-temp">Low Temperature</div>
            <div className="Humidity">Humidity</div>
            <div className="Sunrise-Time">Sunrise Time</div>
            <div className="Sunset-Time">Sunset ime</div>

      </div>
      



       {
        weatherData.map((weather)=>{

          

          return (
            <Card 
            Current_Date={formatDate(weather.dt_txt)}
            key={weather.dt}
            sunset={sunset} 
            hightemp={(weather.main.temp_max-273).toFixed(1)+"°C / "+((weather.main.temp_max - 273.15) * 9/5 + 32).toFixed(1)+"°F" } 
            lowtemp={(weather.main.temp_min-273).toFixed(1)+"°C / "+ ((weather.main.temp_min - 273.15) * 9/5 + 32).toFixed(1)+"°F" }
             humidity={weather.main.humidity}  sunrise={sunrise}
             weathername = {weather.weather[0].main}
             />
             

          )

        })

       }

      

    </div>

      
    </div>
  )
}

export default CheckWeather