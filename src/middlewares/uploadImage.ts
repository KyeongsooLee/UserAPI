import multer, { Multer } from 'multer';
import path from 'path';

// Create a storage engine for multer
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded images will be stored
    cb(null, 'src/images/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    const originalName = file.originalname.replace(/\s/g, '-').split('.').slice(0, -1).join('.');; // Replace any whitespace in the original name with '-'
    const date = Date.now(); // Generate a unique suffix
    const filename = `${originalName}-${date}${path.extname(file.originalname)}`;
    cb(null, filename);
    
  },
});

// Create an instance of multer with the storage engine configuration
const uploadImage: Multer = multer({ storage });

export default uploadImage;