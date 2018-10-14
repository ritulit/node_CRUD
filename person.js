class Person {

    constructor() {
        this.age;
        this.name;
        this.is_male;
        this.country;
            }

    set age(value) {
        let currentYear = new Date().getFullYear();
        
        if (value <= currentYear && value >= currentYear - 25)
            this._year = value;
        else
            throw new Error(`Year must be between ${currentYear-25} to ${currentYear}`);
    }
    //should be between 0-120
    set age(value) {
    
       // if (value < 0 && value > 120)
        //throw new Error(`Age must be between 0 to 120`);
          
      
    }

    //should be 3-15 chars and unique
    set name(value){


    }

    //should be boolean
    set is_male(value){}

    //should be from the list
    set country(value){}


    


}


module.exports={
    "PersonClassPointer":Person
};