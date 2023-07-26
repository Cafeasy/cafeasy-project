const kategoriMenu = require("../model/KategoriMenumodel");

exports.getAllKategoriMenu = async (req, res, next) => {
    kategoriMenu.find().then(result => {
        res.status(200).json({
            message: 'Data semua kategori menu berhasil dipanggil',
            data: result
        })
    }).catch(err => {
        next(err)
    })
}