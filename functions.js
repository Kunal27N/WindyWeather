    export const ampm=(time)=>{
    let ampm1 = "AM";
    if (time === 0) {
        time = 12;
    }
    else if (time === 12) {
        ampm1 = "PM";
    }
    else if (time > 12) {
        time -= 12;
        ampm1 = "PM";
    }
    return `${time} ${ampm1}`;
  }
  
  export const day=(dayIdx)=>{
    const days=["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
    return days[dayIdx];
  }
  export const rotate=(deg)=>{
    return `style=transform:rotate(${deg-180}deg);`;
  }
  export const bgColor=(aqi)=>{
    let color;
    switch (aqi) {
      case 1:
        
        color="#89e589";
        break;
      case 2:
        
        color="#e5dd89";
        break;
      case 3:
        
        color="#e5c089";
        break;
      case 4:
        
        color="#e58989";
        break;
      case 5:
        color="#e589b7";
        break;
    }
    return `style=background-color:${color};`;
  }
  export const aqiInfo=(aqi)=>{
    let idx;
    switch (aqi) {
      case 1:
        idx = "Good";
        break;
      case 2:
        idx = "Fair";
        break;
      case 3:
        idx = "Moderate";
        break;
      case 4:
        idx = "Poor";
        break;
      case 5:
        idx = "Very Poor";
        break;
    }
    return idx;
  }
  export const getTime =(timeUnix, timezone)=> {
    const date = new Date((timeUnix + timezone) * 1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()<10? "0"+date.getUTCMinutes():date.getUTCMinutes()
    const period = hours >= 12 ? "PM" : "AM"
  
    return `0${hours % 12 || 12}:${minutes} ${period}`
  }