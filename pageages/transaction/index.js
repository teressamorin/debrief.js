const EthereumTx = require('ethereumjs-tx').Transaction;

class Transaction {
    constructor(options) {
        this.gas = options.gas;
        this.web3 = options.web3;
    }

    sendTransaction(tx, privKey) {

        var gasLimit = tx.gasLimit || this.gas.limit;
        var gasPrice = tx.gasPrice || this.gas.price;

        return this.web3.eth.getTransactionCount(tx.from).then((txCount) => {
            const etx = new EthereumTx({
                nonce: this.web3.utils.toHex(txCount),
                gasLimit: this.web3.utils.toHex(gasLimit),
                gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(gasPrice, 'gwei')),
                to: tx.to,
                value: this.web3.utils.toHex(this.web3.utils.toWei(tx.amount))
            });
            etx.sign(privKey)
            const serializedTx = etx.serialize()
            const raw = '0x' + serializedTx.toString('hex')
            return this.web3.eth.sendSignedTransaction(raw).then(tx => tx.transactionHash);
        })
    }

    getTransaction(txHash) {
        return Promise.all([this.web3.eth.getTransaction(txHash), this.web3.eth.getTransactionReceipt(txHash)]).then(data => {
            return Object.assign(data[0], data[1]);
        })
    }
}

module.exports = Transaction;