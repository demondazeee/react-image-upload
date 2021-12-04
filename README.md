## React Image Upload

A sample Image upload using ReactJS and Express with Cloudinary & Multer package

### Installation

For Client
```bash
$ cd react-image-upload
$ cd client
$ npm install
$ npm run dev
```

For Server
```bash
$ cd react-image-upload
$ cd server
$ npm install
$ npm run dev
```

### Config File format

FOR CLIENT
```
// SERVER URL 
VITE_SERVER_URL=http://localhost:3000
```

FOR SERVER
```
// CLOUDINARY CONFIG (Required)
CLOUD_NAME=asd123
API_KEY=123456789
API_SECRET=23awe-a-asd123

// CLOUDINARY UPLOAD PRESET AND UPLOAD FOLDER LOCATION
UPLOAD_PRESET=dev_test
UPLOAD_FOLDER=DEV
```