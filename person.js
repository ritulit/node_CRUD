//let countries = require('./countries.json');
let fs = require("fs");


class Person {

    constructor() {
        this._name;
        this._age;
        this._is_male;
        this._country;
        
            }

    
    //should be between 0-120
    set age(value){
        if (parseInt(value) < 0 || parseInt(value) > 120)
        throw new Error(`Age must be between 0 to 120`);
        else
        this._age=value;
          
      
     }

    get age(){
        return this.age;
    }

    //should be 3-15 chars and unique
    set name(value){
       
        let indexOfName = JSON.parse(fs.readFileSync("./people.json")).findIndex(el => el._name == value);       
        if(value.length>=3 && value.length<=15 && indexOfName==-1)
        this._name=value;
        else{
            if(value.length<3)
            throw new Error(`Name length must be at least 3 chars`);
            else if(value.length>15)
            throw new Error(`Name length must be less than 15 chars`);
            else
            throw new Error(`Name must be unique`);
        }
        
     }

    get name(){
        return this._name;
    }

    //should be boolean
    set is_male(value){
        if(value=="true"){this._is_male=true;}
        else
        this._is_male=false;

    }

    get is_male(){
        return this._is_male;
    }

    //should be from the list
    set country(value){
        let countryIndex = JSON.parse(fs.readFileSync("./countries.json")).findIndex(el => el == value);
        if(countryIndex!=-1)
        this._country=value;
        else
        throw new Error(`The country doesnt exist in the countries list`);

    }

    get country(){
        return this._country;
    }
   

    


}


module.exports={
    "PersonClassPointer":Person
};