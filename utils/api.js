const axios = require('axios');

export const getCurrentAndNextTemperater = async () =>{
   console.log('IN');
   const response = await fetch(`http://flask-env.eba-t3v3cmsz.us-east-2.elasticbeanstalk.com/iot`);
   const r = await response.json();
   return r;
}

export const getPredictTemprature = async (temp, humid) => {
   const response = await fetch(`https://cloudcomputing7.herokuapp.com/iot?temp=${temp}&humid=${humid}`);
   const r = await response.json();
   return r;
}

export const getTempratureBaseOther = async (temp) =>{
   const response = await fetch(`https://cloudcomputing7.herokuapp.com/iot/${temp}`)
   const r = await response.json();
   return null;
}

