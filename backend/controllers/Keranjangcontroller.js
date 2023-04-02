const KeranjangPelanggan = require("../model/Keranjangmodel");
const Menu = require("../model/Menumodel");
const Customer = require("../model/Customermodel");


exports.getListCart = async (req, res, next) => {
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
    const idPelanggan= req.params.idPelanggan;
    const idKeranjang= req.params.idKeranjang;

    KeranjangPelanggan.deleteOne(({idPelanggan: `${idPelanggan}`, idKeranjang: `${idKeranjang}`}))
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