import { faker } from "@faker-js/faker";
import { UserService } from "../../support/services/UserService";

describe("Login - API", () => {
  const userService = new UserService();
  let user: User;

  before("create a user", () => {
    user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    userService.createNewUser(user);

    cy.log(`User is created ${JSON.stringify(user)}`);
  });

  it("logins successfully", () => {
    let cookieVaue: string;
    userService
      .login(user.email, user.password)
      .then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.token).not.to.be.empty;
      })
      .its("body.token")
      .as("token");

    cy.getCookie("token")
      .should("exist")
      .then((cookie) => {
        cookieVaue = cookie.value;
      });

    cy.get("@token").then((token) => {
      expect(token).to.eql(cookieVaue);
    });
  });

  it("throws 401 Unauthorized status code when email is empty", () => {
    userService.login("", user.password).then((response) => {
      expect(response.status).to.eql(401);
    });
  });

  it("throws 401 Unauthorized status code when email is invalid", () => {
    user.password = faker.internet.email();
    userService.login(user.email, user.password).then((response) => {
      expect(response.status).to.eql(401);
    });
  });

  it("throws 401 Unauthorized status code when password is empty", () => {
    userService.login(user.email, "").then((response) => {
      expect(response.status).to.eql(401);
    });
  });

  it("throws 401 Unauthorized status code when password is wrong", () => {
    user.password = faker.internet.password();
    userService.login(user.email, user.password).then((response) => {
      expect(response.status).to.eql(401);
    });
  });
});
