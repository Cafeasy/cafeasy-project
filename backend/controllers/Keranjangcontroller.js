const KeranjangPelanggan = require("../model/Keranjangmodel");
const Menu = require("../model/Menumodel");
const Customer = require("../model/Customermodel");


exports.getListCart = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    //find keranjang by id untuk memanggil qty dan harga
    let findQtyHarga = await KeranjangPelanggan.findOne({idPelanggan: `${idPelanggan}`});
    
    KeranjangPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then((result) => {
        let objek = findQtyHarga.toObject();
        var totalHarga = 0;
        const len = objek.dataPesanan.length;

        for (var i = 0; i<len; i++) {
            totalHarga = totalHarga + (objek.dataPesanan[i].hargaMenu * objek.dataPesanan[i].qty)
        }  

        return res.status(200).json({
            message: 'Data keranjang pelanggan berhasil dipanggil',
            data: {result, totalHarga}
        })      
        
    })
    .catch(err => {
        next(err);
    })
}

exports.postCart = async (req, res, next) => {
    const uniqueid = (Math.random()).toString(32).slice(3)

    //check data berdasarkan request idMenu parameter
    const idMenuCheck = req.params.idMenu;
    const idPelangganCheck = req.params.idPelanggan;

    //query cari menu berdasarkan id yang direquest pada parameter dan menjadikan object
    let checkMenuByParams = await Menu.findOne({idMenu: `${idMenuCheck}`});
    let obyekMenu = checkMenuByParams.toObject();

    let checkNamaPelangganById = await Customer.findOne({id: `${idPelangganCheck}`});
    let obyekPelanggan = checkNamaPelangganById.toObject();

    //sign data ke variable yang akan dijadikan data insert keranjang
    let idPelangganSign = obyekPelanggan.id;
    let namaPelangganSign = obyekPelanggan.name;


    let idMenuSign = obyekMenu.idMenu;
    let namaMenuSign = obyekMenu.namaMenu;
    let hargaMenuSign = obyekMenu.hargaMenu;
    
    //proses insert keranjang
    const idKeranjang = "cart-" + uniqueid;
    const idPelanggan = idPelangganSign;
    const namaPelanggan = namaPelangganSign;
    const idMenu =  idMenuSign;
    const namaMenu = namaMenuSign;
    const hargaMenu = hargaMenuSign;
    const catatanPelanggan = req.body.catatanPelanggan;

    //check data keranjang by id menu dan id pelanggan

    let checkCartByParams = await KeranjangPelanggan.findOne({idPelanggan: `${idPelangganCheck}`, "dataPesanan.idMenu":  `${idMenu}`});
    let checkPelangganByParams = await KeranjangPelanggan.findOne({idPelanggan: `${idPelangganCheck}`});

    if (checkPelangganByParams) {
        if(checkCartByParams) {
            KeranjangPelanggan.findOneAndUpdate({idPelanggan: `${idPelangganCheck}`, 'dataPesanan.idMenu': `${idMenu}` }, {$inc:{ 'dataPesanan.$.qty': 1}}, {new: true})
            .then(result => {
                res.status(200).json({
                    message: 'Item berhasil ditambah 1',
                    data: result
                })
            })
            .catch(err => {
                next(err);
            })
        } else {
            KeranjangPelanggan.findOneAndUpdate({idPelanggan: `${idPelangganCheck}`}, {$push:{ dataPesanan: {idMenu: idMenu, namaMenu: namaMenu, hargaMenu: hargaMenu, qty: 1, catatanPelanggan: "-"}}}, {new: true})
            .then(result => {
                res.status(200).json({
                    message: 'Item berhasil ditambah 1',
                    data: result
                })
            })
            .catch(err => {
                next(err);
            })
        };
    } else {
        const insertCart = new KeranjangPelanggan({
            idKeranjang: idKeranjang,
            idPelanggan: idPelanggan,
            namaPelanggan: namaPelanggan,
            dataPesanan: [{idMenu: idMenu, namaMenu: namaMenu, hargaMenu: hargaMenu, qty: 1, catatanPelanggan: catatanPelanggan}]
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
}

exports.deleteCart = async (req, res, next) => {
    const idPelanggan= req.params.idPelanggan;
    const idMenu= req.params.idMenu;
    
    KeranjangPelanggan.findOneAndUpdate({idPelanggan: `${idPelanggan}`, 'dataPesanan.idMenu': `${idMenu}`}, {$pull:{ 'dataPesanan':{ idMenu:  `${idMenu}`} } }, {new: true})
    .then(result => {
        res.status(200).json({
            message: 'Item berhasil ditambah 1',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateCartCatatanPelanggan = (req, res, next) => {
    const catatanPelanggan = req.body.catatanPelanggan;
    const idPelanggan = req.params.idPelanggan;
    const idMenu = req.params.idMenu;

    KeranjangPelanggan.findOneAndUpdate({idPelanggan: `${idPelanggan}`, 'dataPesanan.idMenu':  `${idMenu}`}, {$set: { 'dataPesanan.$.catatanPelanggan': `${catatanPelanggan}` }}, {new: true})
    .then(result => {
        res.status(200).json({
            message: 'Data keranjang berhasil diupdate',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateCartMinus = async (req, res, next) => {
    const idKeranjang = req.params.idKeranjang;
    let checkCartByParams = await KeranjangPelanggan.findOne({idKeranjang: `${idKeranjang}`});
    let obyekCart = checkCartByParams.toObject();

    const qtySign = obyekCart.qty;
    const qtyMinus = qtySign-1;

    if (obyekCart.qty <= 1) {
        KeranjangPelanggan.deleteOne(({idKeranjang: `${idKeranjang}`}))
        .then(result => {
            res.status(200).json({
                message: 'Data keranjang pelanggan berhasil dihapus',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
    } else {
        KeranjangPelanggan.findOneAndUpdate({idKeranjang: `${idKeranjang}`}, {$set:{qty: `${qtyMinus}`}}, {new: true})
        .then(result => {
            res.status(200).json({
                message: 'Item berhasil dikurang 1',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
    }
}

exports.updateCartPlus = async (req, res, next) => {
    const idKeranjang = req.params.idKeranjang;
    let checkCartByParams = await KeranjangPelanggan.findOne({idKeranjang: `${idKeranjang}`});
    let obyekCart = checkCartByParams.toObject();

    const qtySign = obyekCart.qty;
    const qtyPlus = qtySign+1;

   
    KeranjangPelanggan.findOneAndUpdate({idKeranjang: `${idKeranjang}`}, {$set:{qty: `${qtyPlus}`}}, {new: true})
    .then(result => {
        res.status(200).json({
            message: 'Item berhasil ditambah 1',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}