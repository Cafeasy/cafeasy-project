// require('../config/database');
const Menu = require("../model/Menumodel");

exports.getListMenu = (req, res, next) => {
    try {
        Menu.find({ stokMenu: {$gt: 0} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu available berhasil dipanggil',
                data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data menu", data: error })
    }
}

exports.getNotAvailableMenu = (req, res, next) => {
    try {
        Menu.find({ stokMenu: {$lt: 1} })
        .then(result => {
            res.status(200).json({
                message: 'Data menu not available berhasil dipanggil',
                    data: result
            })
        }).catch(error => {
            next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data menu", data: error })
    }
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

    try {
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
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data menu berdasarkan kategori", data: error })
    }
}

exports.getMenuByCategoryNotAvailable = (req, res, next) => {
    const kategoriMenu = req.params.kategoriMenu;

    try {
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
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data menu berdasarkan kategori", data: error })
    }
}

exports.getMenuDetail = (req, res, next) => {
    const idMenu = req.params.idMenu;

    try {
        Menu.find({ idMenu: `${idMenu}` })
            .then(result => {
                res.status(200).json({
                    message: 'Data detail menu berhasil dipanggil',
                    data: result
                })
            })
            .catch(error => {
                next(error);
        })
    } catch (error) {
        res.status(400).json({ message: "gagal mengambil data menu", data: error })
    }
}