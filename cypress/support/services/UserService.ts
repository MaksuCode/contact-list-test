export class UserService {
  PATH = "/users";

  createNewUser(user: User) {
    return cy.request({
      url: this.PATH,
      method: "POST",
      body: user,
      failOnStatusCode: false,
    });
  }

  login(email: string, password: string) {
    return cy.request({
      url: `${this.PATH}/login`,
      method: "POST",
      body: {
        email: email,
        password: password,
      },
      failOnStatusCode: false,
    });
  }
}
