const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Dfeine paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Created by Souleymane"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Created by Souley"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "We are here to help",
    name: "Created by Souley"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Created by Souley",
    errorMessage: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Created by Souley",
    errorMessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server running .... on port ${port}....`);
});
