interface Human {
    firstName: string;
    lastName: string;
}


class Person implements Human { //interface , explained 

    constructor(public firstName, public lastName){ }
    name(){
        return `${this.firstName} ${this.lastName}`//this pointing to object which was created in class
    }

    whoAreYou(){
        return `Hi I'm ${this.name()}`
    }
    
}

class Student extends Person {
    course = "";
    constructor(firstName, lastName, course){
        super(firstName, lastName);
        this.course = course
    }
    whoAreYou(){
        return  `${super.whoAreYou()}, and I'm studing ${this.course}`
    }
    test(){
        console.log(this.firstName);
    }
    //Student class now have all properties that Person class has
}


let aibek  = new Student("Aibek", "Ozhorov", "Angular2")
console.log(aibek.test());