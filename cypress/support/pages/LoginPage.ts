export class LoginPage {
  // TODO : Fix ts private identifier issue : https://stackoverflow.com/questions/67019328/private-identifiers-are-only-available-when-targeting-ecmascript-2015-and-higher
  emailField = "#email";
  passwordField = "#password";
  submitButton = "#submit";
  errorMessage = "#error";

  login(email: string, password: string) {
    if (email) {
      cy.get(this.emailField).type(email);
    }
    if (password) {
      cy.get(this.passwordField).type(password);
    }
    cy.get(this.submitButton).click();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
