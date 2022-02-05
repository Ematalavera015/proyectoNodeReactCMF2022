import multer from "multer";
import path from "path";

const storage = multer.diskStorage(
  {
    destination(req, file, cb) {
      // Se llama al cb sin errores e indicando la carpeta uploads/
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      // cb(
      //   // Se genera el nombre del archivo usando fieldname, la fecha actual
      //   // y la extensión del archivo path.extname
      //   null, file.fieldname + '-' + Date.now() + path.extname()
      // );
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });

const checkFileType = (file, cb) => {
  //reemplazar null por los archivos permitidos jpg, png, jpeg
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    //retorna cb sin errores
    cb(null, true);
  } else {
    cb("Images only!");
  }
};

export const uploadsConfig = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc Upload a image
// @route POST /api/upload
// @access Private/Admin

export const upload = (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
};
