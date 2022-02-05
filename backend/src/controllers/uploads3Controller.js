import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET,
});

/**
 * Single Upload
 */
export const uploadsConfigs3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename('image', path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 10000000 }, // In bytes: 10000000 bytes = 10 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

/**
 * @route POST api/uploads/aws
 * @desc Upload post image
 * @access private/admin
 */
export const uploads3 = (req, res) => {
    uploadsConfigs3(req, res, (error) => {
        // console.log( 'requestOkokok', req.file );
        // console.log( 'error', error );
        if (error) {
            console.log('errors', error);
            res.json({ error: error });
        } else {
            // If File not found
            if (req.file === undefined) {
                console.log('Error: No File Selected!');
                res.json('Error: No File Selected');
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;
                // Save the file name into database into profile model
                res.json({
                    image: imageName,
                    location: imageLocation
                });
            }
        }
    });
};

