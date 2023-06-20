export class RegisterModel {
  customerId: string;
  customerPIN: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public customerEmail: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customerEmail = customerEmail;
    this.customerId = this.generateRandomString();
    this.customerPIN = this.generatePIN();
  }

  generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generatePIN() {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
