const Web3 = require("web3");
const Account = require("./pageages/account")
const Transaction = require("./pageages/transaction")


function configWeb3(options) {
    var provider;
    switch (options.type) {
        case "http":
            provider = new Web3.providers.HttpProvider(options.path)
            break;
        case "websocket":
            provider = new Web3.providers.WebsocketProvider(options.path)
            break;
        case "ipc":
            provider = new Web3.providers.IpcProvider(options.path, require('net'))
            break;
        default:
            provider = options.path;
            break;
    }
    return new Web3(provider);
}

class Debrief {
    constructor(options) {
        this.web3 = configWeb3(options.web3);
        this.account = new Account(Object.assign({}, options.account, { web3: this.web3 }));
        this.tx = new Transaction(Object.assign({}, options.transaction, { web3: this.web3 }))
    }
}

module.exports = Debrief;