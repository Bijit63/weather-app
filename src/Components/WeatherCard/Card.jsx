import React from 'react'
import './Card.css'
import { GrSun } from "react-icons/gr";
import { BsCloudSnow } from "react-icons/bs";
import { BsCloudLightningRain } from "react-icons/bs";
import { RiWindyLine } from "react-icons/ri";
import { LuCloudy } from "react-icons/lu";

const Card = (props) => {
  return (
    <div className='Card'>
        <div className='Date'>{props.Current_Date}</div>
        
        <div className='Weather-Card'>

            <div className="Weather-info">
                <span className='Weather-logo'>
                  {
                    props.weathername ==="Clouds"?<LuCloudy/>:props.weathername==="Rain"?<BsCloudLightningRain/>:props.weathername==="Clear"?<GrSun/> :  <BsCloudSnow/>
                  }
                  </span>
                <span className='Weather-Type'>{props.weathername}</span>
            </div>

            <div className="High-temp">{props.hightemp}</div>
            <div className="Low-temp">{props.lowtemp}</div>
            <div className="Humidity">{props.humidity}%</div>
            <div className="Sunrise-Time">{props.sunrise}</div>
            <div className="Sunset-Time">{props.sunset}</div>

        </div>

    </div>
  )
}

export default Card