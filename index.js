const Account = require("./pageages/account")

class Debrief {
    constructor(options){
        this.account = new Account(options.account)
    }
}

module.exports = Debrief;