const RiwayatPesanan = require("../model/RiwayatPesananmodel");

exports.getListHistory = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    RiwayatPesanan.find({ idPelanggan: `${idPelanggan}` })
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