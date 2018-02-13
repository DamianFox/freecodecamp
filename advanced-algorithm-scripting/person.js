class Person {
  
  constructor(firstAndLast) {
    this.firstName = firstAndLast.split(' ')[0];
    this.lastName = firstAndLast.split(' ')[1];
    this.fullName = this.firstName + ' ' + this.lastName;
  }

  toString() {
        return '(' + this.firstName + ', ' + this.lastName + ')';
  }

  getFirstName() {
      return this.firstName;
  }

  getLastName() {
      return this.lastName;
  }

  getFullName() {
      return this.fullName;
  }
  
  setFirstName(firstName) {
    this.firstName = firstName;
  }
  
  setLastName(lastName) {
    this.lastName = lastName;
  }

  setFullName(fullName) {
    this.fullName = fullName;
  }
}

var bob = new Person('Bob Ross');
console.log(bob.getFullName());