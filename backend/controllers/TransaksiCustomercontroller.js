const TransaksiPelanggan = require("../model/TransaksiCustomermodel");
const RiwayatPesananPelanggan = require("../model/Riwayatpesananmodel");
const Customer = require("../model/Customermodel");
const KeranjangPelanggan = require("../model/Keranjangmodel");


exports.getTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    
    TransaksiPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then(result => {
        res.status(200).json({
            message: 'Data transaksi berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getDetailTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    const idTransaksi = req.params.idTransaksi;

    let findQtyHarga = await TransaksiPelanggan.findOne({idPelanggan: `${idPelanggan}`, idTransaksi: `${idTransaksi}`});
    
    TransaksiPelanggan.find({idPelanggan: `${idPelanggan}`, idTransaksi: `${idTransaksi}`})
    .then((result) => {
        let objek = findQtyHarga.toObject();
        var totalHarga = 0;
        const len = objek.dataPesanan.length;

        for (var i = 0; i<len; i++) {
            totalHarga = totalHarga + (objek.dataPesanan[i].hargaMenu * objek.dataPesanan[i].qty)
        }  

        return res.status(200).json({
            message: 'Data transaksi pelanggan berhasil dipanggil',
            data: {result, totalHarga}
        })      
        
    })
    .catch(err => {
        next(err);
    })
}

exports.postTransaksiPelanggan = async (req, res, next) => {
    //generate idTransaksi
    const uniqueid = (Math.random()).toString(32).slice(3)

    const idPelangganCheck = req.params.idPelanggan;

    let checkNamaPelangganById = await Customer.findOne({id: `${idPelangganCheck}`});
    let obyekPelanggan = checkNamaPelangganById.toObject();

    let checkKeranjangPelangganById = await Keranjang.findOne({id: `${idPelangganCheck}`});
    let obyekKeranjang = checkKeranjangPelangganById.toObject();
    
    let idPelangganSign = obyekPelanggan.id;
    let namaPelangganSign = obyekPelanggan.namaPelanggan;

    let idMenuSign = obyekKeranjang.idMenu;
    let namaMenuSign = obyekKeranjang.namaMenu;
    let hargaMenuSign = obyekKeranjang.hargaMenu;
    let qtyCartSign = obyekKeranjang.qty;
    let totalHargaPermenu = qtyCartSign * hargaMenuSign;

    const idTransaksi = "tr-"+uniqueid;
    const idPelanggan = idPelangganSign;
    const namaPelanggan = namaPelangganSign;
    const noMeja = req.body.noMeja;
    const idMenu = idMenuSign;
    const namaMenu = namaMenuSign;
    const hargaMenu = hargaMenuSign;
    const qty = qtyCartSign;
    const totalHarga = totalHargaPermenu;

    const insertTransaksi = new TransaksiPelanggan({
        idTransaksi: idTransaksi,
        idPelanggan: idPelanggan,
        namaPelanggan: namaPelanggan,
        noMeja: noMeja,
        dataPesanan: [{idMenu, namaMenu, hargaMenu, qty}],
    })

    insertTransaksi.save().then(result => {
        res.status(200).json({
            message: "Data Transaksi (" + idTransaksi + ") berhasil disimpan",
            data: result
        })
    }).catch(err => {
        console.log('err: ', err);
    })

}