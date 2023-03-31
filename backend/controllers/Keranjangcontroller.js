const KeranjangPelanggan = require("../model/Keranjangmodel");


exports.getListCart = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    KeranjangPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then(result => {
        res.status(200).json({
            message: 'Data keranjang berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.postCart = (req, res, next) => {
    const uniqueid = (Math.random()).toString(32).slice(3)

    const idKeranjang = "cart-" + uniqueid;
    const idPelanggan = req.params.idPelanggan;
    const namaPelanggan = req.body.namaPelanggan;
    const idMenu = req.params.idMenu;
    const namaMenu = req.body.namaMenu;
    const hargaMenu = req.body.hargaMenu;
    const qty = req.body.qty;
    const catatanPelanggan = req.body.catatanPelanggan;

    const insertCart = new KeranjangPelanggan({
        idKeranjang: idKeranjang,
        idPelanggan: idPelanggan,
        namaPelanggan: namaPelanggan,
        idMenu: idMenu,
        namaMenu: namaMenu,
        hargaMenu: hargaMenu,
        qty: qty,
        catatanPelanggan: catatanPelanggan
    })

    insertCart.save().then(result => {
        res.status(200).json({
            message: "data keranjang berhasil disimpan",
            data: result
        })
    }).catch(err => {
        console.log('err: ', err);
    });
    
}

exports.deleteCart = async (req, res) => {
    // try {
    //     await KeranjangPelanggan.destroy({
    //         where:{
    //             idPelanggan: req.params.idPelanggan,
    //             idMenu: req.params.idMenu,
    //             idKeranjang: req.params.idKeranjang
    //         }
    //     });
    //     res.json({message: "keranjang berhasil dihapus"});
    // } catch (error) {
    //     res.json({message: error.message})
    // }
    const idPelanggan= req.params.idPelanggan;
    const idMenu= req.params.idMenu;
    const idKeranjang= req.params.idKeranjang;

    KeranjangPelanggan.deleteOne(({idPelanggan: `${idPelanggan}`, idMenu: `${idMenu}`, idKeranjang: `${idKeranjang}`}))
    .then(result => {
        res.status(200).json({
            message: 'Data keranjang berhasil dihapus',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}