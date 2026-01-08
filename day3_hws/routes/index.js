var express = require('express');
var router = express.Router();

const travelPlaces = [
  { name: 'Paris',
    country: 'France',
    isPopular:true },
    {
      name:"Bali",
      country:"Indonesia",
      isPopular:true
    },
    {
      name:"Kyoto",
      country:"Japan",
      isPopular:false
    }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { WelcomeMessage: "Welcome to Our Travel Website",
    places: travelPlaces
  });
});

module.exports = router;