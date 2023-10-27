/*
	Este es un patron estructural, enfocado en hacer una separacion entre el modelo
  del negocio y la implementacion, se parece bastante al strategy, pero la diferencia
  radica en que el patron Bridge se centra el estructurar como se componen los objetos, 
  mientras que strategy se centra en cambiar dinamicamente el comportamiento de un objeto.
  Por esta razon a una instancia de una clase con el patron strategy le cambiamos 
  dinamicamente el comportamiento en tiempo de ejecucion, mientras que para una clase 
  que usa el patron bridge esta instancia siempre usara el mismo implmentador, del cual
  podremos escoger su comportamiento al inicio ya que el modelo del negocio es el mismo
  pero la situacion interna como se trabajar en el contexto puede variar.
 */

interface ListImplementor {
  elements: number[];

  add(number: number): void;
  getElements(): number[];
}
interface DataAbstraction {
  implementor: ListImplementor;
  add(number: number): void;
  get(): number[];
  operation(fn: (n: number) => number): number[];
}

/** clase refinada que implementa la abstraccion **/
export class DataRefinedAbstraction implements DataAbstraction {
  implementor: ListImplementor;
  constructor(implementor: ListImplementor) {
    this.implementor = implementor;
  }
  public add(number: number): void {
    this.implementor.add(number);
  }

  public get(): number[] {
    return this.implementor.getElements();
  }

  public operation(fn: (n: number) => number): number[] {
    return this.implementor.getElements().map(fn);
  }
}

/** primera implementacion de Implementador **/
export class OrderedList implements ListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    this.elements.push(number);
    this.elements.sort();
  }

  public getElements(): number[] {
    return this.elements;
  }
}
/** segunda implementacion de Implementador **/
export class UniqueList implements ListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    if (!this.elements.includes(number)) {
      this.elements.push(number);
    }
  }

  public getElements(): number[] {
    return this.elements;
  }
}
