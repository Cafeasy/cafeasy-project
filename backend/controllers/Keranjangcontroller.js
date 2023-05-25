const KeranjangPelanggan = require("../model/Keranjangmodel");
const Menu = require("../model/Menumodel");
const Customer = require("../model/Customermodel");


exports.getListCart = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    //find keranjang by id untuk memanggil qty dan harga
    let findQtyHarga = await KeranjangPelanggan.find({idPelanggan: `${idPelanggan}`});

    KeranjangPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then((result) => {
        //operasi untuk melakukan perkalian harga dan qty, lalu di jumlahkan keseluruhan berdasarkan data yang ada
        const totalHarga = findQtyHarga.reduce((accumulator, object) => {
            return accumulator + (object.hargaMenu * object.qty);
        }, 0)
        return res.status(200).json({
            message: 'Data keranjang berhasil dipanggil',
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
    // const qty = req.body.qty;
    const catatanPelanggan = req.body.catatanPelanggan;

    //check data keranjang by id menu dan id pelanggan
    let checkCartByParams = await KeranjangPelanggan.findOne({idPelanggan: `${idPelangganCheck}`, idMenu: `${idMenuCheck}`});

    if(checkCartByParams) {
        let obyekCart = checkCartByParams.toObject();
        const qtySign = obyekCart.qty;
        const qtyPlus = qtySign+1;

        KeranjangPelanggan.findOneAndUpdate({idPelanggan: `${idPelangganCheck}`, idMenu: `${idMenuCheck}`}, {$set:{qty: `${qtyPlus}`}}, {new: true})
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
        const insertCart = new KeranjangPelanggan({
            idKeranjang: idKeranjang,
            idPelanggan: idPelanggan,
            namaPelanggan: namaPelanggan,
            idMenu: idMenu,
            namaMenu: namaMenu,
            hargaMenu: hargaMenu,
            qty: 1,
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
        
    };
}

exports.deleteCart = async (req, res) => {
    const idPelanggan= req.params.idPelanggan;
    const idKeranjang= req.params.idKeranjang;

    KeranjangPelanggan.deleteOne(({idPelanggan: `${idPelanggan}`, idKeranjang: `${idKeranjang}`}))
    .then(result => {
        res.status(200).json({
            message: 'Data keranjang pelanggan berhasil dihapus',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateCart = (req, res, next) => {
    const qty = req.body.qty;
    const catatanPelanggan = req.body.catatanPelanggan;
    const idKeranjang = req.params.idKeranjang;

   
    KeranjangPelanggan.findOneAndUpdate({idKeranjang: `${idKeranjang}`}, {$set:{qty: `${qty}`, catatanPelanggan: `${catatanPelanggan}`}}, {new: true})
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