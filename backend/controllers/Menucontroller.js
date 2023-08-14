// require('../config/database');
const Menu = require("../model/Menumodel");

exports.getListMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$gt: 0} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu available berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
    
}

exports.getNotAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$lt: 1} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu not available berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
    
}

// exports.getMenuByCategory = (req, res, next) => {
//     const kategoriMenu = req.params.kategoriMenu;
//     Menu.find({ kategoriMenu: `${kategoriMenu}` })
//         .then(result => {
//             res.status(200).json({
//                 message: 'Data menu berdasarkan kategori berhasil dipanggil',
//                 data: result
//             })
//         })
//         .catch(err => {
//             next(err);
//         })
// }

exports.getMenuByCategoryAvailable = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;
    Menu.find({ kategoriMenu: `${kategoriMenu}`, stokMenu: {$gt : 0} })
    .then(result => {
        res.status(200).json({
            message: 'Data menu available berdasarkan kategori berhasil dipanggil',
            data: result
        })
    })
    .catch(error => {
        next(error);
    })
}

exports.getMenuByCategoryNotAvailable = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;
    Menu.find({ kategoriMenu: `${kategoriMenu}`, stokMenu: {$lt : 1} })
    .then(result => {
        res.status(200).json({
            message: 'Data menu not available berdasarkan kategori berhasil dipanggil',
            data: result
        })
    })
    .catch(error => {
        next(error);
    })
}

exports.getMenuDetail = (req, res, next) => {
    const idMenu = req.params.idMenu;
    Menu.find({ idMenu: `${idMenu}` })
        .then(result => {
            res.status(200).json({
                message: 'Data detail menu berhasil dipanggil',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}