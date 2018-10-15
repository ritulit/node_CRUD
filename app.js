// Requires:
let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let Person =require("./person.js");


const app = express();



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


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
    let filterPeopleArr = peopleArr.filter(element => element._name != req.query.name)

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

app.post("/api/people", (req, res) => {

    let peopleArr =JSON.parse(fs.readFileSync("./people.json"));
    let newPerson = new Person.PersonClassPointer();
    console.log(`${JSON.stringify(req.body)}`);

    try {
        for (key in req.body) {
            newPerson[key] = req.body[key];
        }

        peopleArr.push(newPerson);

        fs.writeFileSync("people.json", JSON.stringify(peopleArr));
        res.status(201);
        res.send("Person addedd to the file");
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
});



app.put("/api/people", (req, res) => {

    let peopleArr =JSON.parse(fs.readFileSync("./people.json"));

    let pointerToPerson = peopleArr.find(element => element._name == req.query.name);
   
    if (pointerToPerson) {
        for (key in req.body) {
            pointerToPerson["_"+key] = req.body[key];
        }

        //save the updates to the file
        fs.writeFileSync("people.json", JSON.stringify(peopleArr));

        res.status(200);
        res.send("Person edited in the file");
    } else {
        res.status(400);
        res.send("No such person in the file");
    }
});

app.listen(4600, () => {
    console.log("server runs")
});

