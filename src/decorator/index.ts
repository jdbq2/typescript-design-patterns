/**
    Este patron nos permite extender/envolver la funcionalidad principal de una clase 
    resolviendo el problema de que no se puede heredar de multiples clases, esto 
    se hace por medio de una o varias clases decorator la cuales funcionan como 
    envoltorios.
 */

interface Component {
  getDetail: () => string;
}

/**
	Creamos la clase principal, es decir la que tendra el comportamiento centrar
	que el decorator compartira con las clases que hereden de este decorador.
 */

export class ProductComponent implements Component {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
  getDetail() {
    return `${this.name}`;
  }
}

/**
  Creamos el decorador de forma abstracta para que esta clase solo pueda heredar,
	mas no ser invocada usando la palabra reservada "new"
 */

export abstract class ProductDecorator implements Component {
  protected component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  getDetail() {
    return this.component.getDetail();
  }
}

/**
  Creamos los decoradores los cuales heredan el comportamiento del componente
	padre y extienden su funcionalidad, lo importante de este patron es que ahora
	la segunda clase decoradora puede heredar de la primera, que a su vez hereda de la
	clase principal, asi logrando encadenar funcionalidades logrando herencia multiple,
	lo cual normalmente no es posible.
 */
export class CommercialInfoProductDecorator extends ProductDecorator {
  private tradename: string;
  private brand: string;
  constructor(component: Component, tradename: string, brand: string) {
    super(component);
    this.tradename = tradename;
    this.brand = brand;
  }
  getDetail() {
    return `${super.getDetail()} ${this.tradename} ${this.brand}`;
  }
}

export class PriceInfoProductDecorator extends ProductDecorator {
  private price: number;
  constructor(component: Component, price: number) {
    super(component);
    this.price = price;
  }
  getDetail() {
    return `${super.getDetail()} $${this.price}`;
  }
}
