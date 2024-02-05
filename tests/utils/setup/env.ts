exports.ENV = class ENV {
        url = "";
        validUser = "";
        lockedUser = "";
        pass = "";

    constructor() {
        this.url = process.env.URL as string;
        this.validUser = process.env.VALID_USER as string
        this.lockedUser = process.env.LOCKED_USER as string
        this.pass = process.env.PASSWORD as string;
    }

    getUrl(){
        return this.url;
    }

    getValidUser() {
        return this.validUser;
    }

    getLockedUser() {
        return this.lockedUser;
    }

    getPass() {
        return this.pass;
    }
}