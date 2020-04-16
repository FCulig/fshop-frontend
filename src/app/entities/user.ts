export class User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    password?: string;
    confirmedPassword?: string;
    profileImageUrl?: string;

    constructor(uname: string, mail: string, fname: string, lname: string,
        bDate: Date, pass: string, cpass: string, profileImageUrl: string) {
        this.firstName = fname;
        this.lastName = lname;
        this.username = uname;
        this.email = mail;
        this.birthDate = bDate;
        this.password = pass;
        this.confirmedPassword = cpass;
        this.profileImageUrl = profileImageUrl;
    }
}
