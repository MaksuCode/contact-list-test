import { faker } from "@faker-js/faker";
import { UserService } from "../../support/services/UserService";
import { LoginPage } from "../../support/pages/LoginPage";

describe("Login - UI", () => {
  const userService = new UserService();
  const loginPage = new LoginPage();
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

  beforeEach("go to login page", () => {
    cy.visit("/");
  });

  it("logins successfully", () => {
    cy.intercept({ method: "POST", url: "/users/login" }).as("loginApi");

    loginPage.login(user.email, user.password);

    cy.wait("@loginApi").then((interception) => {
      expect(interception.request.body.email).to.eql(user.email);
      expect(interception.request.body.password).to.eql(user.password);
      expect(interception.response.statusCode).to.eql(200);
      expect(interception.response.body.token).not.to.be.empty;
    });

    cy.url().should("include", "/contactList");
  });

  it("throws error message when email is empty", () => {
    loginPage.login("", user.password);
    loginPage
      .getErrorMessage()
      .should("have.text", "Incorrect username or password");
  });

  it("throws error message when password is empty", () => {
    loginPage.login(user.email, "");
    loginPage
      .getErrorMessage()
      .should("have.text", "Incorrect username or password");
  });

  it("throws error message when email is wreong", () => {
    user.email = faker.internet.email();
    loginPage.login(user.email, user.password);
    loginPage
      .getErrorMessage()
      .should("have.text", "Incorrect username or password");
  });

  it("throws error message when password is wrong", () => {
    user.password = faker.internet.password();
    loginPage.login(user.email, user.password);
    loginPage
      .getErrorMessage()
      .should("have.text", "Incorrect username or password");
  });
});
