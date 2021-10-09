var Fetch = require("fetch").Fetch;

var fetch = new Fetch("http://localhost:8383");

fetch.on("/responsables", function(chunk){
    console.log(chunk);
});
fetch(`http://localhost:8383/responsables`)
      .then((res) => res.json())