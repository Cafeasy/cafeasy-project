// require('../config/database');
const Menu = require("../model/Menumodel");

exports.getListMenu = (req, res, next) => {
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

exports.getNotAvailableMenu = (req, res, next) => {
    Menu.find({ stokMenu: {$lt: 1} })
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