// require('../config/database');
const Menu = require("../model/Menumodel");

exports.getListMenu = (req, res, next) => {
    // Menu.find({})
    //     .then(result => {
    //         res.status(200).json({
    //             message: 'Data menu berhasil dipanggil',
    //             data: result
    //         })
    //     }).catch(err => {
    //         next(err);
    //     }).exec(function(err) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             const checkStok = Menu.find({ stokMenu: {$lt: 0} });
            
    //             if(checkStok) {
    //                 const StatusMenu = "Menu Tersedia";
    //                 return StatusMenu;
    //             } else {
    //                 const StatusMenu = "Menu Kosong";
    //                 return StatusMenu;
    //             }
    //         }
            
    //     });
    Menu.find({ stokMenu: {$gt: 0} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
    
}

exports.getMenuByCategory = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;
    Menu.find({ kategoriMenu: `${kategoriMenu}` })
        .then(result => {
            res.status(200).json({
                message: 'Data menu berdasarkan kategori berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.getMenuDetail = (req, res, next) => {
    const idMenu = req.params.idMenu;
    Menu.find({ idMenu: `${idMenu}` })
        .then(result => {
            res.status(200).json({
                message: 'Data menu berdasarkan kategori berhasil dipanggil',
                data: result
            })
        }
        )
        .catch(err => {
            next(err);
        })
}