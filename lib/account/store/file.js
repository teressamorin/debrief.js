const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

const ACCOUNT_FILE_SUFFIX = ".account.json";

class FileStore {
    constructor(path) {
        this.basePath = path;
    }

    all() {
        var basePath = this.basePath;
        return new Promise(function (resolve, reject) {
            fs.readdir(basePath, function (err, files) {
                if (err) {
                    reject(err);
                } else {
                    var data = [];
                    files.forEach(file => {
                        if (file.endsWith(ACCOUNT_FILE_SUFFIX)) {
                            data.push(JSON.parse(fs.readFileSync(path.join(basePath, file)).toString()));
                        }
                    });
                    resolve(data);
                }
            })
        });
    }

    get(address) {
        var accountPath = path.join(this.basePath, address.replace("0x", "").toLowerCase() + ACCOUNT_FILE_SUFFIX)
        return new Promise(function (resolve, reject) {
            fs.readFile(accountPath, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        });
    }

    del(address) {
        var accountPath = path.join(this.basePath, address.replace("0x", "").toLowerCase() + ACCOUNT_FILE_SUFFIX)
        return new Promise(function (resolve, reject) {
            fs.unlink(accountPath, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    save(json) {
        var accountPath = path.join(this.basePath, json.address.toLowerCase() + ACCOUNT_FILE_SUFFIX)
        return new Promise(function (resolve, reject) {
            fs.writeFile(accountPath, JSON.stringify(json), function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(json);
                }
            })
        });
    }
}




module.exports.init = function (options) {
    if (!fs.existsSync(options.path)) {
        mkdirp.sync(options.path);
    }
    return new FileStore(options.path);
}