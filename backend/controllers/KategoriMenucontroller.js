const kategoriMenu = require("../model/KategoriMenumodel");

exports.getAllKategoriMenu = (req, res, next) => {

    try {
        kategoriMenu.find().then(result => {
            res.status(200).json({
                message: 'Data semua kategori menu berhasil dipanggil',
                data: result
            })
        }).catch(error => {
            next(error)
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mendapatkan data banner", data: error })
    }
}