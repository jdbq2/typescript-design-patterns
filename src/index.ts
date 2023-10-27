import { Singleton } from "./singleton";
import { LoginContext, LoginDBStrategy, LoginGoogleStrategy } from "./strategy";
import { Subject, Observer } from "./observer";
import {
  CommercialInfoProductDecorator,
  PriceInfoProductDecorator,
  ProductComponent,
  ProductDecorator,
} from "./decorator";
import { NormalPersonBuilder, PersonDirector } from "./builder";
import { Ticket } from "./state";
import { DataRefinedAbstraction, OrderedList, UniqueList } from "./bridge";

/**SINGLETON
  const singleton = Singleton.getInstance();
  const singleton2 = Singleton.getInstance();
  console.log(singleton.random); 
  console.log(singleton2.random);
 */
/**STRATEGY
  const auth = new LoginContext(new LoginDBStrategy());
  auth.login("admin", "no entra");
  auth.setStrategy(new LoginGoogleStrategy());
  auth.login("admin", "entra");
 */
/**OBSERVER
  const subject = new Subject<string>();
  const obs1 = new Observer<string>((d) => console.log("Obs1; Data: " + d));
  const obs2 = new Observer<string>((d) => console.log("Obs2; Data: " + d));
  subject.subscribe(obs1);
  subject.subscribe(obs2);
  subject.notify("Soy la data enviada");
  subject.notify("He cambiado mi data y lo he notificado");
  */
/**DECORATOR
  const productComponent = new ProductComponent("Cerveza");
  const commercialInfoProduct = new CommercialInfoProductDecorator(
    productComponent,
    "London Porter",
    "Fullers"
  );
  const priceInfoProduct = new PriceInfoProductDecorator(
    commercialInfoProduct,
    10
  );
  console.log(priceInfoProduct.getDetail());
 */
/**BUILDER
  const personBuilder = new NormalPersonBuilder();
  const director = new PersonDirector(personBuilder);
  director.createSimplePerson("John", "Cena");
  const johnCena = personBuilder.build();
  console.log(johnCena);
 */
/**STATE
  const ticket = new Ticket(5);
  console.log(ticket.getState);
  console.log(ticket.next());
  ticket.add(6);
  console.log(ticket.getState);
  console.log(ticket.next());
  ticket.add(4); // no esta lleno falta 1
  console.log(ticket.getState);
  console.log(ticket.next());
  console.log(ticket.next());
  ticket.add(3); // con 3 queda lleno en 5
  ticket.add(1); // no se agregan ya que esta lleno
  console.log(ticket.getState);
  console.log(ticket.next());
  console.log(ticket.getState);
  console.log(ticket.next());
  console.log(ticket.next());
  console.log(ticket.next());
  console.log(ticket.next());
  console.log(ticket.getState); // estado vacio
  console.log(ticket.next()); // ya no hay tickets
 */
/**BRIDGE
  const uniqueData = new DataRefinedAbstraction(new UniqueList());
  const orderedData = new DataRefinedAbstraction(new OrderedList());
  uniqueData.add(3);
  uniqueData.add(3);
  uniqueData.add(1);
  uniqueData.add(1);
  uniqueData.add(2);
  console.log("Unique Data: ", uniqueData.get());
  orderedData.add(3);
  orderedData.add(3);
  orderedData.add(1);
  orderedData.add(1);
  orderedData.add(2);
  console.log("Ordered Data: ", orderedData.get());
  const uniqueItems = uniqueData.operation((e: number) => e * 2);
  const orderedItems = orderedData.operation((e: number) => e * 2);
  console.log("Unique Data *2: ", uniqueItems);
  console.log("Ordered Data *2: ", orderedItems);
 */
