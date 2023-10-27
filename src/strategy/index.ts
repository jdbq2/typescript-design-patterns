/**
    El patron Strategy nos permite escalar la funcionalidad de un programa
    sin necesidad de modicar las funcionalidades ya creadas, esto sirve para hacer el codigo
    mas legible ya que no se utiliza ningunpo de switch case.
 */

interface Strategy {
  login(user: string, password: string): boolean;
}

/**
    Clase general o de contexto, puede ser por ejemplo la clase Login
 */
export class LoginContext {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
    this.setStrategy(strategy);
  }
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

/**
    Clases estrategias, estas son las que añaden la funcionalidad a 
    la clase de contexto.
 */
export class LoginDBStrategy implements Strategy {
  login(user: string, password: string) {
    console.log("Simulamos la conslta a la base de datos");
    if (user === "admin" && password === "entra") {
      console.log("Login Success");
      return true;
    }
    console.log("Login Failed");
    return false;
  }
}
export class LoginGoogleStrategy implements Strategy {
  login(user: string, password: string) {
    console.log("Hacemos el Login con Google");
    if (user === "admin" && password === "entra") {
      console.log("Login Success");
      return true;
    }
    console.log("Login Failed");
    return false;
  }
}
