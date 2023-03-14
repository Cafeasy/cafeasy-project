const KeranjangPelanggan = require("../model/Keranjangmodel");

exports.getListCart = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    KeranjangPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then(result => {
        res.status(200).json({
            message: 'Data menu berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}