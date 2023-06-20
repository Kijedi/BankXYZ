export class ProfileModel {

    constructor(
        public password: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public customerId: string
    ) {
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.customerId = customerId;
    }
  }
  