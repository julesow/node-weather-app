const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic291bGV5bWFuZXNvdyIsImEiOiJjazkyZWI3aXEwNTBuM2ZwOHoxNXE2NXg4In0.JLbVILW01TF_44gsH2Q4yw`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location location , try again another search ...",
        undefined
      );
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
