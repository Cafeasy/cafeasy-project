const kategoriMenu = require("../model/KategoriMenumodel");

exports.getAllKategoriMenu = (req, res, next) => {
    kategoriMenu.find({}).then(result => {
        if(result) {
            res.status(200).json({
                message: 'Data semua kategori menu berhasil dipanggil',
                data: result
            })
        } else if(!result) {
            res.status(404).json({
                message: 'Data semua kategori menu gagal dipanggil',
                data: result
            })
        }
    }).catch(err => {
        next(err)
    })
}