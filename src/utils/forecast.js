const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=78d9cdb9c118e6527771de3173ad70cb&query=${latitude},${longitude}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to api.weatherstack.com ", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;

      const { temperature, feelslike, weather_descriptions } = data;
      callback(
        undefined,
        `${
          weather_descriptions[0]
        },it is currently ${temperature} degrees out and it feels like ${feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
