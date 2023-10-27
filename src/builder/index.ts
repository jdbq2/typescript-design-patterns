/**
  Este patron permite por medio de una clase builder construir objetos
	complejos que solo usa las propiedades que necesitamos en ese momento,
	esto es util cuando tenemos	una clase que usa muchas propiedades. 
	En este patron podemos añadir un director, el cual se encargade tener 
	"recetas" para diferente formas en las que podemos usar nuestro builder.
 */

interface PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  setName(name: string): PersonBuilder;
  setLastName(lastName: string): PersonBuilder;
  setAge(age: number): PersonBuilder;
  setCountry(country: string): PersonBuilder;
  setCity(city: string): PersonBuilder;
  addHobby(hobby: string): PersonBuilder;
  build(): Person;
}

/* 
	Creamos la clase principal, la cual tiene muchos atributos
*/
export class Person {
  private name: string;
  private lastName: string;
  private age: number;
  private country: string;
  private city: string;
  private hobbies: string[];

  constructor(
    name: string,
    lastName: string,
    age: number,
    country: string,
    city: string,
    hobbies: string[]
  ) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.hobbies = hobbies;
  }

  getFullName(): string {
    return this.name + " " + this.lastName;
  }
}

/* 
	Creamos el builder, el cual tiene un metodo set ppor cada uno de los
	atributos de la clase padre, adicional a esto tiene un metodo reset para
	resetear la clase cada vez que se hace un build, y un metodo build, el cual
	crea el objeto complejo y lo devuelve.
 */
export class NormalPersonBuilder implements PersonBuilder {
  name: string;
  lastName: string;
  age: number;
  country: string;
  city: string;
  hobbies: string[];

  constructor() {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  reset(): void {
    this.name = "";
    this.lastName = "";
    this.age = 0;
    this.country = "";
    this.city = "";
    this.hobbies = [];
  }

  setName(name: string): PersonBuilder {
    this.name = name;
    return this;
  }

  setLastName(lastName: string): PersonBuilder {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }

  setCountry(country: string): PersonBuilder {
    this.country = country;
    return this;
  }
  setCity(city: string): PersonBuilder {
    this.city = city;
    return this;
  }

  addHobby(hobby: string): PersonBuilder {
    this.hobbies.push(hobby);
    return this;
  }

  build(): Person {
    const person = new Person(
      this.name,
      this.lastName,
      this.age,
      this.country,
      this.city,
      this.hobbies
    );
    this.reset();
    return person;
  }
}

/**
	Creamos el director, el cual tiene varias recetas, es decir varias
	configuraciones para usar el builder y construir el objeto complejo.
 */
export class PersonDirector {
  private personBuilder: PersonBuilder;

  constructor(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  setPersonBuilder(personBuilder: PersonBuilder) {
    this.personBuilder = personBuilder;
  }

  createSimplePerson(name: string, lastName: string) {
    this.personBuilder.setName(name).setLastName(lastName);
  }
}
