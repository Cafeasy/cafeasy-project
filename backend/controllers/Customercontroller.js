const crypto = require("crypto");
const id = crypto.randomBytes(4).toString("hex");
const name = "usr";


exports.custLogReg = (req, res, next) => {
    res.json ({
        message: "berhasil membuat unique id",
        data: [name, id]
    })
};