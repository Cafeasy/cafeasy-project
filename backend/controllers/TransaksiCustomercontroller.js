const TransaksiPelanggan = require("../model/TransaksiCustomermodel");
const Menu = require("../model/Menumodel");
const Customer = require("../model/Customermodel");
const KeranjangPelanggan = require("../model/Keranjangmodel");
const KeranjangController = require("../controllers/Keranjangcontroller");
const Midtrans = require('../controllers/MidtransController');

exports.deleteTransaksiPelanggan = async (req, res, next) => {
    const idKeranjangCheck = req.params.idKeranjang;
    try {
        KeranjangPelanggan.deleteOne({ idKeranjang: `${idKeranjangCheck}` })
            .then((value) => {
                res.status(200).json({
                    message: "Berhasil Hapus Transaksi",
                    data: value
                })
            })

    } catch (err) {
        res.status(400).json({ message: "Gagal Hapus", err: err });
    }

}
exports.getTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;

    TransaksiPelanggan.find({ idPelanggan: `${idPelanggan}` })
        .then(result => {
            res.status(200).json({
                message: 'Data transaksi berhasil dipanggil',
                data: result
            })
        })
        .catch(error => {
            next(error);
        })
}

exports.getDetailTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.find({ idPelanggan: `${idPelanggan}`, idTransaksi: `${idTransaksi}` })
        .then(result => {
            res.status(200).json({
                message: 'Data transaksi pelanggan berhasil dipanggil',
                data: result
            })
        })
        .catch(error => {
            next(error);
        })
}

exports.postTransaksiPelanggan = async (req, res, next) => {
    //check data berdasarkan request idKeranjang req url
    var idKeranjangCheck = req.params.idKeranjang;
    let checkKeranjangByParams;
    //query cari data keranjang berdasarkan id yang direquest pada url dan menjadikan object
    try {
        checkKeranjangByParams = await KeranjangPelanggan.findOne({ idKeranjang: `${idKeranjangCheck}` });

        let obyekKeranjang = checkKeranjangByParams.toObject();
        //sign data ke variable yang akan dijadikan data insert keranjang
        var idKeranjangSign = obyekKeranjang.idKeranjang;
        var idPelangganSign = obyekKeranjang.idPelanggan;
        var namaPelangganSign = obyekKeranjang.namaPelanggan;
        var dataPesananSign = obyekKeranjang.dataPesanan;
        var noMejaPelanggan = obyekKeranjang.noMeja;

        //date gmt
        var ndate = new Date().toLocaleString("id-ID", {
            timeZone: 'Asia/Jakarta', hour12: false
        })

        //var untuk menampung total harga
        var totalHarga = 0;

        //looping untuk mengambil total harga data pesanan
        const len = obyekKeranjang.dataPesanan.length;
        // console.log(obyekKeranjang.dataPesanan);
        for (var i = 0; i < len; i++) {
            totalHarga = totalHarga + (obyekKeranjang.dataPesanan[i].hargaMenu * obyekKeranjang.dataPesanan[i].qty)
        }

        const insertTransaksi = new TransaksiPelanggan({
            idTransaksi: idKeranjangSign,
            idPelanggan: idPelangganSign,
            namaPelanggan: namaPelangganSign,
            tanggal: ndate,
            noMeja: noMejaPelanggan,
            dataPesanan: dataPesananSign,
            totalHarga: totalHarga,
            statusBayar: "Belum bayar"
        })

        insertTransaksi.save().then(result => {
            res.status(200).json({
                message: "Transaksi disimpan, selesaikan pembayaran agar pesanan diproses ya",
                data: result
            })
        }).catch(error => {
            next(error);
        });

        KeranjangPelanggan.deleteOne(({ idKeranjang: `${idKeranjangCheck}` }))
            .catch(error => {
                next(error);
            })
    } catch (err) {
        res.status(401).send({ message: "error", data: err });
    }

}

exports.updateStatusBayar = async (req, res, next) => {
    //update status bayar
    const idTransaksiCheck = req.params.idTransaksi;
    const statusBayar = await Midtrans.getTransactionStatuss(idTransaksiCheck);

    //date gmt
    var ndate = new Date().toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta', hour12: false
    })

    let newStatusBayar = statusBayar.transaction_status;
    if (!statusBayar.transaction_status) {
        newStatusBayar = "Pembayaran Dilakukan Di kasir";
    }
    else if (newStatusBayar.toString() == "settlement") {
        newStatusBayar = "SUCCESS";

        //mendefinisi var length looping untuk update otomatis stok menu
        var checkTransaksi = await TransaksiPelanggan.findOne({ idTransaksi: `${idTransaksiCheck}` });
        var obyekTransaksi = checkTransaksi.toObject();
        var len = obyekTransaksi.dataPesanan.length;

        //looping update (stok menu - qty datapesanan)
        for (var i = 0; i < len; i++) {
            //menyimpan setiap id menu pada data pesanan ke sebuah variable
            var checkIdMenuDataPesanan = await TransaksiPelanggan.findOne({ idTransaksi: `${idTransaksiCheck}` });
            var obyekIdMenu = checkIdMenuDataPesanan.toObject();
            var saveIdMenu = obyekIdMenu.dataPesanan[i].idMenu;

            //menyimpan data setiap stok menu per id menu ke sebuah variable 
            var saveStokMenu = await Menu.findOne({ idMenu: `${saveIdMenu}` });
            var obyekStokMenu = saveStokMenu.toObject();

            //otomatis update stok menu setelah transaksi berhasil
            var kalkulasiStokMenu = obyekStokMenu.stokMenu - obyekIdMenu.dataPesanan[i].qty;

            await Menu.findOneAndUpdate(
                { idMenu: `${saveIdMenu}` },
                { $set: { stokMenu: kalkulasiStokMenu } },
                { new: true }
            )
        }

    } else {
        newStatusBayar = statusBayar.transaction_status.toString().toUpperCase();
    }
    TransaksiPelanggan.findOneAndUpdate({ idTransaksi: `${idTransaksiCheck}` }, { $set: { statusBayar: newStatusBayar, tanggal: ndate } }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Status bayar berhasil diupdate - Pembayaran Sukses',
                data: result
            })
        })
        .catch(error => {
            next(error);
        })
}