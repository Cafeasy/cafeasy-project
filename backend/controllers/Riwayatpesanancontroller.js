const RiwayatPesananPelanggan = require("../model/Riwayatpesananmodel");

exports.getListHistory = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    RiwayatPesananPelanggan.find({ idPelanggan: `${idPelanggan}` })
        .then(result => {
            res.status(200).json({
                message: 'Data riwayat pesanan berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}