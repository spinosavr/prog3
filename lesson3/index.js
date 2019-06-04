var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hello world");
   res.redirect('https://www.google.am/search?gs_ssp=eJzj4tTP1TcwK8xKTzZgBAATwQMb&q=messi&rlz=1C5CHFA_enAM852&oq=messi&aqs=chrome.0.46j0l4.2455j0j8&sourceid=chrome&ie=UTF-8');
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});