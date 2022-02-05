const path = require("path");
const express = require("express");
// to use hbs partials
const hbs = require("hbs");
const dataForcast = require("./geocode");

const partialsPath = path.join(__dirname, "../templates/partials");
const app = express(); // does not take any args

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

//nodemon app.js -e js,hbs

//GET: what the server should do when someone wants to access resources at specific url
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ahmad",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ahmad",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ahmad",
    message: "help help help ",
  });
});
app.get("/weather", (req, res) => {
  // /weather?address=ssssss
  const Geoaddress = req.query.address;
  if (!Geoaddress) {
    return res.send({
      error: "No address has been entered",
    });
  } else {
    dataForcast.geocode(Geoaddress, (err, { lat, lon, location } = {}) => {
      if (err) {
        return res.send({err})
      }
        
      dataForcast.forecast(lat, lon, (err, forecastData) => {
        if (err) {
          return res.send({err})
        }
        return res.send({
            // address: Geoaddress,
            location:location,
            forecast: forecastData
            

        })
      });
    });
  }
//   res.send({
//     address: req.query.address,
//   });
});
app.get("/products", (req, res) => {
  console.log(req.query);
  //when no search term is provided
  if (!req.query.search) {
    //to avoid Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // bcs we are sending 2 responses
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Article not found",
    name: "Ahmad",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found!",
    name: "Ahmad",
  });
});
app.listen(3000);
