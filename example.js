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
    },
    transaction: {
        gas: {
            limit: 80000,
            price: "10"
        }
    }
};

var debrief = new Debrief(options);


function accountExample(debrief) {
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
}


function accountTransaction(debrief) {


    debrief.tx.sendTransaction({ from: "0xa92e7f637f79e27464A4A1d724b5cCD23A694409", to: "0xcB383c57cb19dbED0d0eF459eB4b693CDba454ec", amount: "1" }, Buffer.from(
        '77c3122e245e638a5e4fd54075e4fe4f1e91b9258fb7f2f828d220685f43901b',
        'hex',
    ))  // should get privKey by account.getKeys() just hard coding for test, now
        .then(txHash => {
            console.log(txHash);
            return debrief.tx.getTransaction(txHash);
        })
        .then(tx=>{
            console.log(tx);
        })


}


//accountExample(debrief);
accountTransaction(debrief)