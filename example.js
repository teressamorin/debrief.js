const Debrief = require("./index");
const path = require("path");


const options = {
    web3: {
        type: "http",
        path: "http://127.0.0.1:7545"
    },
    account: {
        store: {
            type: "file",
            path: path.join(process.cwd(), "testdata", "accounts")
        }
    }
};

var debrief = new Debrief(options);


(function accountExample(debrief) {
    var passphrase = "123456";
    var address = "";

    debrief.account.balanceOf("0xa92e7f637f79e27464A4A1d724b5cCD23A694409")
        .then(balance => {
            console.log(balance);
            return debrief.account.listAccounts();
        })
        .then(accounts => {
            console.log("Account List:", accounts);
            if (accounts.length > 0) {
                return { address: accounts[0] };
            } else {
                return debrief.account.newAccount(passphrase)
            }
        }).then(account => {
            address = account.address;
            console.log("Address:", account.address);
            return debrief.account.getKey(account.address, passphrase);
        }).then(keys => {
            console.log("Keys:", keys);
            // return debrief.account.deleteAccount(address, passphrase);
        });
})(debrief);