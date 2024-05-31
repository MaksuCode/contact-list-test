export class UserService {
  constructor() {}

  createNewUser(user: User) {
    return cy.request({
      url: "/users",
      method: "POST",
      body: user,
      failOnStatusCode: false, // turn off following redirects
    });
  }
}
