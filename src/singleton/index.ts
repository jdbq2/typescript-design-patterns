/* 
EL patron singleton se trata de tener una sola instancia de una clase, es decir
no se puede crear mas instancias de la misma, esto es util para hacer que los datos
con los que se inicializo la clase sean constantes a lo largo del programa, ya que
dentro de la clase validamos que retorne solo la primera instancia creada, con los valores
pasados la primera vez.
*/

export class Singleton {
  /*
	declaramos los atributos de la clase, para singleton usamos uno llamado instance, el cual
	se usara para verificar que la instancia ya existe o debe ser creada
	*/
  private static instance: Singleton;
  public random: number;
  /*
		Hacemos el constructor privado, con el fin de que solo sea invocado en caso de que no 
		exista una instacia previamente creada.
	*/
  private constructor() {
    this.random = Math.random();
  }
  /*
		Metodo para obtener una instancia de la clase, llamando a este metodo estatico,
		es como accederemos a la clase lo que quiere decir que la palabra reservada 'new',
		no puede ser usada por fuera de la clase
	*/
  public static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}
