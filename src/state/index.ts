/*
	Este patron controla el estado de un objeto por medio de otras clases,
  se parece bastante al patron strategy, pero en este caso no pasamos
  estrategias para el comportamiento sino estados, es que las clases estado
  constrolan los datos y el comportamiento de los mismos en la clase
  inicial.
*/

interface State {
  next(ticket: Ticket): string | null;
  add(ticket: Ticket, quantity: number): void;
}

/*
  Creamos la clase principal, es decir la que va a llevar el estado, para este
  ejemplo usaremos una ticketera. En este ejemplo usaremos el metodo next y el 
  metodo add, los cuales se ejecutan en la clase estado que se encuentre actualmente
  dentro de la clase ticket, y son los encargados de modificar el comportamiento
  del estado.
 */
export class Ticket {
  private state: State;
  quantity: number;
  readonly limit: number;
  private number: number;

  constructor(limit: number) {
    this.quantity = 0;
    this.limit = limit;
    this.number = 0;
    this.state = new EmptyState();
  }

  get getNumber(): string {
    return `Su ticket es el numero ${this.number++}`;
  }
  set setState(state: State) {
    this.state = state;
  }
  get getState() {
    return this.state;
  }
  /*
    Metodo para entregar tickets
   */
  next(): string | null {
    return this.state.next(this);
  }
  /*
    Metodo para agregar o recargar tickets en nuestra ticketera
   */
  add(quantity: number): void {
    this.state.add(this, quantity);
  }
}

/* 
Creamos los estados con los que trabajara la clase Ticket, cada uno de ellos para 
este ejemplo usa los metodos declarados enla interface State, con el fin de controlar
los estados de la clase principal o de contexto.
*/
export class EmptyState implements State {
  next(ticket: Ticket): null {
    return null;
  }

  add(ticket: Ticket, quantity: number): void {
    if (ticket.quantity + quantity < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    } else if (ticket.quantity + quantity === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    } else {
      console.log("Carga invalida, revisa la cantidad ingresada");
    }
  }
}
export class WithDataState implements State {
  next(ticket: Ticket): string {
    ticket.quantity--;
    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    }
    return ticket.getNumber;
  }
  add(ticket: Ticket, quantity: number): void {
    if (ticket.quantity + quantity < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    } else if (ticket.quantity + quantity === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    } else {
      console.log("Carga invalida, revisa la cantidad ingresada");
    }
  }
}
export class FullState implements State {
  next(ticket: Ticket): string {
    ticket.quantity--;
    if (ticket.quantity <= 0) ticket.setState = new EmptyState();
    else ticket.setState = new WithDataState();
    return ticket.getNumber;
  }
  add(ticket: Ticket, quantity: number): void {
    console.log("Ticket lleno");
  }
}
