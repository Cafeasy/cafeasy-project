// require('../config/database');
const Menu = require("../model/Menumodel");

exports.getListMenu = (req, res, next) => {
    Menu.find({})
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
    Menu.find({kategoriMenu: `${kategoriMenu}`})
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
    Menu.find({idMenu: `${idMenu}`})
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

//testing controller
/*exports.getListMenu = (req, res, next) => {
    res.json (
        {
            message: "Get All Products Success",
            data: [
                {
                    id: 1,
                    name: 'test',
                    price: 888888
                }
            ]
        }
    )
}*/

/*exports.getListMenuById = async (req, res) => {
    try {
        const listMenuById = await ListMenu.findById(req.params.id);
        res.json(listMenuById);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}*/

// module.exports = {
//     getListMenu,
//     getListMenuById
// }