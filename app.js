// Requires:
let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let Person =require("./person.js");


// Create express app:
const app = express();


// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, and parses it to json format
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//check if "people.json" file exists
//if not - create this file and init it with an empty array
if (!fs.existsSync("people.json")) {
    fs.writeFileSync("people.json", "[]");
}



app.get("/api/people", (req, res) => {
    
    try{
        let peopleArr =JSON.parse(fs.readFileSync("./people.json"));
        if(peopleArr.length>=1){
            res.status(200);
            res.send(peopleArr);
        }else{
            res.status(200);
            res.send("no people in the system");
    
        }
    }catch(err){
        res.status(404);
        res.send(err.code);
        }
    
    
});

app.delete("/api/people", (req, res) => {
    //delete a person by name in query param
    let peopleArr =JSON.parse(fs.readFileSync("./people.json"));
    let filterPeopleArr = peopleArr.filter(element => element.name != req.query.name)

     if (filterPeopleArr.length < peopleArr.length) {
        
       peopleArr=filterPeopleArr;
        fs.writeFileSync("people.json", JSON.stringify(peopleArr));

        res.status(200);
        res.send("Deleted from the file");
    } 
    else {
        res.status(400);
        res.send("No such person in the file");
    }
});


app.listen(4600, () => {
    console.log("server runs")
});

