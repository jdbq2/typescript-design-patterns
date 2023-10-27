/* 
Este patron tiene como objetivo controlar y notificar a los observadores
cuando el sugeto cambie su estado.
*/
interface SubjectObject<T> {
  observers: ObserverObject<T>[];
  subscribe: (observer: ObserverObject<T>) => void;
  unsubscribe: (observer: ObserverObject<T>) => void;
  notify: (data: T) => void;
}

interface ObserverObject<T> {
  refresh: (data: T) => void;
}

/**
	Creamos el sujeto con las funciones de suscribir, desuscribir y notificar a los
	observadores
 */

export class Subject<T> implements SubjectObject<T> {
  observers: ObserverObject<T>[];
  constructor() {
    this.observers = [];
  }
  subscribe(observer: ObserverObject<T>) {
    this.observers.push(observer);
  }
  unsubscribe(observer: ObserverObject<T>) {
    this.observers.filter((obj) => obj !== observer);
  }
  notify(data: T) {
    this.observers.forEach((observer: ObserverObject<T>) => {
      observer.refresh(data);
    });
  }
}

/**
	Creamos el observador donde al ejecutar el metodo refresh ejecutamos la funcion
	que sea que le hallamos pasado al momento de crearlo.
 */

export class Observer<T> implements ObserverObject<T> {
  fn: (data: T) => void;
  constructor(fn: (data: T) => void) {
    this.fn = fn;
  }
  refresh(data: T) {
    this.fn(data);
  }
}
