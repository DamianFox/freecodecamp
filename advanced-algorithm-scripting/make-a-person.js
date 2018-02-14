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
  
  setFirstName(first) {
    this.firstName = firstName;
  }
  
  setLastName(last) {
    this.lastName = lastName;
  }

  setFullName(firstAndLast) {
    this.fullName = firstAndLast;
  }
}

var bob = new Person('Bob Ross');
bob.getFullName();