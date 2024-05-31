import { faker } from "@faker-js/faker";
import { UserService } from "../../support/services/UserService";

describe("Sign Up - API", () => {
  const userService = new UserService();
  let user: User;

  beforeEach("initiate a fake user", () => {
    user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it("signs up successfully", () => {
    userService.createNewUser(user).then((response) => {
      expect(response.status).to.eql(201);
    });
  });

  it("throws ValidatiorError when firstName is empty", () => {
    user.firstName = "";

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.firstName.name).to.eql("ValidatorError");
      expect(response.body.errors.firstName.message).to.eql(
        "Path `firstName` is required."
      );
    });
  });

  it("throws ValidatiorError when lastName is empty", () => {
    user.lastName = "";

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.lastName.name).to.eql("ValidatorError");
      expect(response.body.errors.lastName.message).to.eql(
        "Path `lastName` is required."
      );
    });
  });

  it("throws ValidatiorError when email is empty", () => {
    user.email = "";

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.email.name).to.eql("ValidatorError");
      expect(response.body.errors.email.message).to.eql("Email is invalid");
    });
  });

  it("throws ValidatiorError when email is invalid", () => {
    user.email = "invalidemailaddress";

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.email.name).to.eql("ValidatorError");
      expect(response.body.errors.email.message).to.eql("Email is invalid");
    });
  });

  it("throws ValidatiorError when password is empty", () => {
    user.password = "";

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.password.name).to.eql("ValidatorError");
      expect(response.body.errors.password.message).to.eql(
        "Path `password` is required."
      );
    });
  });

  it("throws ValidatiorError when password is shorter than 7", () => {
    user.password = faker.internet.password({ length: 6 });

    userService.createNewUser(user).then((response) => {
      console.log(response.body);
      expect(response.status).to.eql(400);
      expect(response.body.errors.password.name).to.eql("ValidatorError");
      expect(response.body.errors.password.message).to.eq(
        `Path \`password\` (\`${user.password}\`) is shorter than the minimum allowed length (7).`
      );
    });
  });
});
