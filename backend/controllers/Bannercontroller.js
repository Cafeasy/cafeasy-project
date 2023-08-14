const dataBanner = require("../model/Bannermodel");

exports.getAllBanner = (req, res, next) => {
    try {
        dataBanner.find({}).then(result => {
            res.status(200).json({
                message: "Data semua banner berhasil dipanggil",
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mendapatkan data banner", data: error })
    }
}

exports.getBannerById = (req, res, next) => {
    const idBanner = req.params.idBanner;
    dataBanner.findOne({idBanner: `${idBanner}`}).then(result => {
        res.status(200).json({
            message: "Data banner berdasarkan id berhasil dipanggil",
            data: result
        })
    }).catch(error => {
        next(error);
    })
}