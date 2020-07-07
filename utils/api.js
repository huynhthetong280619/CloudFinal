   export const getCurrentAndNextTemperater = async () =>{
      console.log('IN');
      const response = await fetch(`http://flask-api-s-env.eba-q4x4enz2.us-east-2.elasticbeanstalk.com/iot`);
      const r = await response.json();
      console.log('TEXT', r);
      return r;
   }

   export const getPredictTemprature = async (temp, humid) => {
      const response = await fetch(`http://flask-api-s-env.eba-q4x4enz2.us-east-2.elasticbeanstalk.com/iot/${Number(temp).toFixed(1)}/${Number(humid).toFixed(1)}`);
      const r = await response.json();
      return r;
   }


   export const getPredict = async () => {
      const response = await fetch(`http://flask-api-s-env.eba-q4x4enz2.us-east-2.elasticbeanstalk.com/iot/next`);
      const r = await response.json();
      console.log('Next', r);
      return r;
   }

   export const getUpdateModelPredict = async () =>{
      await fetch(`https://apiabcnhom7.herokuapp.com/`);    
   }
