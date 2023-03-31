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

exports.postCart = (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    const namaPelanggan = req.body.namaPelanggan;
    const idMenu = req.params.idMenu;
    const namaMenu = req.body.namaMenu;
    const hargaMenu = req.body.hargaMenu;
    const qty = req.body.qty;
    const catatanPelanggan = req.body.catatanPelanggan;
    
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     const err = new Error('input value tidak sesuai');
    //     err.errorStatus = 400;
    //     err.data = errors.array();
    //     throw err;
    // }

    const insertCart = new KeranjangPelanggan({
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