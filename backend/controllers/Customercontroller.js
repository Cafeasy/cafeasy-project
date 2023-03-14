const crypto = require("crypto");
const id = crypto.randomBytes(3).toString("hex");
const name = "usr";


exports.custLogReg = (req, res, next) => {

    res.redirect(process.env.CLIENT_URL + "Berandapage"); res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: [name + "-" + id],
    });
};