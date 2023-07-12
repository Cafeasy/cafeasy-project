const dataBanner = require("../model/Bannermodel");

exports.getAllBanner = (req, res, next) => {
    dataBanner.find({}).then(result => {
        res.status(200).json({
            message: "Data semua banner berhasil dipanggil",
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Data semua banner gagal dipanggil",
            error: error
        })
    })
}

exports.getBannerById = (req, res, next) => {
    const idBanner = req.params.idBanner;
    dataBanner.findOne({idBanner: idBanner}).then(result => {
        res.status(200).json({
            message: "Data banner berdasarkan id berhasil dipanggil",
            data: result
        })
    }).catch(error => {
        res.status(404).json({
            message: "Data banner berdasarkan id gagal dipanggil",
            error: error
        })
    })
}