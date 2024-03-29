const KeranjangPelanggan = require("../model/Keranjangmodel");
const Menu = require("../model/Menumodel");
const Customer = require("../model/Customermodel");

exports.getListCart = async (req, res, next) => {
  const idPelanggan = req.params.idPelanggan;
  //find keranjang by id untuk memanggil qty dan harga

  try {
    let findQtyHarga = await KeranjangPelanggan.findOne({
      idPelanggan: `${idPelanggan}`,
    });

    if (findQtyHarga) {
      var objek = findQtyHarga.toObject();
      var len = objek.dataPesanan.length ?? "";
    }

    KeranjangPelanggan.find({ idPelanggan: `${idPelanggan}` })
      .then((result) => {
          var totalHarga = 0;
          for (var i = 0; i < len; i++) {
            totalHarga =
              totalHarga +
              objek.dataPesanan[i].hargaMenu * objek.dataPesanan[i].qty;
          }

          return res.status(200).json({
            message: "Data keranjang pelanggan berhasil dipanggil",
            data: { result, totalHarga },
          });
      })
      .catch(error => {
        next(error);
      })
  } catch (error) {
    res.status(400).json({ message: "gagal mengambil data keranjang", data: error })
  }
};

exports.postCart = async (req, res, next) => {
  const uniqueid = Math.random().toString(32).slice(3);
  const noMeja = req.body.noMeja;
  //check data berdasarkan request idMenu parameter
  const idMenuCheck = req.params.idMenu;
  const idPelangganCheck = req.params.idPelanggan;

  try {

    //query cari menu berdasarkan id yang direquest pada parameter dan menjadikan object
    let checkMenuByParams = await Menu.findOne({ idMenu: `${idMenuCheck}` });

    let checkNamaPelangganById = await Customer.findOne({
      id: `${idPelangganCheck}`,
    });

    if (checkMenuByParams && checkNamaPelangganById) {
      let obyekMenu = checkMenuByParams.toObject();
      let obyekPelanggan = checkNamaPelangganById.toObject();

      //sign data ke variable yang akan dijadikan data insert keranjang
      let idPelangganSign = obyekPelanggan.id;
      let namaPelangganSign = obyekPelanggan.name;

      let idMenuSign = obyekMenu.idMenu;
      let namaMenuSign = obyekMenu.namaMenu;
      let hargaMenuSign = obyekMenu.hargaMenu;
      let imageUrlSign = obyekMenu.imageUrl;

      //proses insert keranjang
      const idKeranjang = "cart-" + uniqueid;
      const idPelanggan = idPelangganSign;
      const namaPelanggan = namaPelangganSign;
      const idMenu = idMenuSign;
      const namaMenu = namaMenuSign;
      const hargaMenu = hargaMenuSign;
      const qty = req.body.qty;
      const imageUrl = imageUrlSign;
      const catatanPelanggan = req.body.catatanPelanggan;

      //check data keranjang by id menu dan id pelanggan
      let checkCartByParams = await KeranjangPelanggan.findOne({
        idPelanggan: `${idPelangganCheck}`,
        "dataPesanan.idMenu": `${idMenu}`,
      });
      let checkPelangganByParams = await KeranjangPelanggan.findOne({
        idPelanggan: `${idPelangganCheck}`,
      });

      if (checkPelangganByParams) {
        if (checkCartByParams) {
          KeranjangPelanggan.findOneAndUpdate(
            {
              idPelanggan: `${idPelangganCheck}`,
              "dataPesanan.idMenu": `${idMenu}`,
            },
            { $inc: { "dataPesanan.$.qty": qty } },
            { new: true }
          )
            .then((result) => {
                res.status(200).json({
                  message: "Item berhasil ditambah",
                  data: result,
                });
            })
            .catch((error) => {
              next(error);
            });
        } else {
          KeranjangPelanggan.findOneAndUpdate(
            { idPelanggan: `${idPelangganCheck}` },
            {
              $push: {
                dataPesanan: {
                  idMenu: idMenu,
                  namaMenu: namaMenu,
                  hargaMenu: hargaMenu,
                  qty: qty,
                  catatanPelanggan: catatanPelanggan,
                  imageUrl: imageUrl,
                },
              },
            },
            { new: true }
          )
            .then((result) => {
              res.status(200).json({
                message: "Item berhasil ditambah",
                data: result,
              });
            })
            .catch((error) => {
              next(error);
            });
        }
      } else {
        const insertCart = new KeranjangPelanggan({
          idKeranjang: idKeranjang,
          idPelanggan: idPelanggan,
          namaPelanggan: namaPelanggan,
          noMeja: noMeja,
          dataPesanan: [
            {
              idMenu: idMenu,
              namaMenu: namaMenu,
              hargaMenu: hargaMenu,
              qty: qty,
              catatanPelanggan: catatanPelanggan,
              imageUrl: imageUrl,
            },
          ],
        });

        insertCart
          .save()
          .then((result) => {
            res.status(200).json({
              message: "Item berhasil ditambah",
              data: result,
            });
          })
          .catch((error) => {
            next(error);
          });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "gagal insert keranjang", data: error })
  }
};

exports.deleteCart = async (req, res, next) => {
  const idPelanggan = req.params.idPelanggan;
  const idMenu = req.params.idMenu;

  try {

    let checkCartByParams = await KeranjangPelanggan.findOne({
      idPelanggan: `${idPelanggan}`,
    });
    let obyekCart = checkCartByParams.toObject();
    let len = obyekCart.dataPesanan.length;

    if (len < 1) {
      KeranjangPelanggan.deleteOne({ idPelanggan: `${idPelanggan}` })
        .then((result) => {
            res.status(200).json({
              message: "data keranjang telah dihapus",
              data: result,
            });
        })
        .catch((error) => {
          next(error);
        });
    } else {
      KeranjangPelanggan.findOneAndUpdate(
        { idPelanggan: `${idPelanggan}`, "dataPesanan.idMenu": `${idMenu}` },
        { $pull: { dataPesanan: { idMenu: `${idMenu}` } } },
        { new: true }
      )
        .then((result) => {
            res.status(200).json({
              message: "Item berhasil dihapus",
              data: result,
            });
        })
        .catch((error) => {
          next(error);
        });
    }
  } catch (error) {
    res.status(400).json({ message: "gagal hapus keranjang", data: error })
  }
};

exports.updateCartCatatanPelanggan = (req, res, next) => {
  const catatanPelanggan = req.body.catatanPelanggan;
  const idPelanggan = req.params.idPelanggan;
  const idMenu = req.params.idMenu;

  try {
    KeranjangPelanggan.findOneAndUpdate(
      { idPelanggan: `${idPelanggan}`, "dataPesanan.idMenu": `${idMenu}` },
      { $set: { "dataPesanan.$.catatanPelanggan": `${catatanPelanggan}` } },
      { new: true }
    )
      .then((result) => {
        res.status(200).json({
          message: "Catatan pelanggan berhasil diupdate",
          data: result,
        });
      })
      .catch((error) => {
        next(error);
      });
    } catch (error) {
      res.status(400).json({ message: "gagal update catatan keranjang", data: error })
    }
};

exports.updateCartMinus = async (req, res, next) => {
  const idPelanggan = req.params.idPelanggan;
  const idMenu = req.params.idMenu;

  try {
    let checkCartByParams = await KeranjangPelanggan.findOne({
      idPelanggan: `${idPelanggan}`,
    });
    let checkCartQty = await KeranjangPelanggan.findOne({
      idPelanggan: `${idPelanggan}`,
      "dataPesanan.idMenu": `${idMenu}`,
      "dataPesanan.qty": 1,
    });
    let obyekCart = checkCartByParams.toObject();
    let len = obyekCart.dataPesanan.length;
    // console.log(len);
    if (len < 1) {
      KeranjangPelanggan.deleteOne({ idPelanggan: `${idPelanggan}` })
        .then((result) => {
            res.status(200).json({
              message: "data keranjang telah dihapus",
              data: result,
            });
        })
        .catch((error) => {
          next(error);
        });
    } else if (checkCartQty) {
        // console.log(checkCartQty);
        KeranjangPelanggan.findOneAndUpdate(
          { idPelanggan: `${idPelanggan}`, "dataPesanan.idMenu": `${idMenu}` },
          { $pull: { dataPesanan: { idMenu: `${idMenu}` } } },
          { new: true }
        ).then((result) => {
              res.status(200).json({
                message: "Item dihapus dari keranjang",
                data: result,
              });
          })
          .catch((error) => {
            next(error);
        });
    } else if (!checkCartQty) {
        // console.log(checkCartQty);
        KeranjangPelanggan.findOneAndUpdate(
          { idPelanggan: `${idPelanggan}`, "dataPesanan.idMenu": `${idMenu}` },
          { $inc: { "dataPesanan.$.qty": -1 } },
          { new: true }
        )
          .then((result) => {
              res.status(200).json({
                message: "Item berhasil dikurangi 1",
                data: result,
              });
          })
          .catch((error) => {
            next(error);
          });
    }
  } catch(error) {
    res.status(400).json({ message: "gagal mengurangi item", data: error })
  }
};

exports.updateCartPlus = async (req, res, next) => {
  const idPelanggan = req.params.idPelanggan;
  const idMenu = req.params.idMenu;

  try {
    KeranjangPelanggan.findOneAndUpdate(
      { idPelanggan: `${idPelanggan}`, "dataPesanan.idMenu": `${idMenu}` },
      { $inc: { "dataPesanan.$.qty": 1 } },
      { new: true }
    )
      .then((result) => {
          res.status(200).json({
            message: "Item berhasil ditambah 1",
            data: result,
          });
      })
      .catch((error) => {
        next(error);
      });
    } catch(error) {
      res.status(400).json({ message: "gagal menambahkan item", data: error })
    }
};
