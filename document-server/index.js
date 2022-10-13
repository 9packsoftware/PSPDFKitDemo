const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const documentsFolder = [__dirname, "documents"].join(path.sep);
const app = express();

if (!fs.existsSync(documentsFolder)) {
    fs.mkdirSync(documentsFolder, 0755);
}


// default options
app.use(fileUpload());

app.post('/documents', function(req, res) {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const fileKeys = Object.keys(req.files);
    const fileObject = req.files[fileKeys[0]];
    const uuid = uuidv4();
    const pdfFileName = `${uuid}.pdf`
    const jsonFileName = `${uuid}.json`
    const pdfPath = [documentsFolder, pdfFileName].join(path.sep);
    const jsonPath = [documentsFolder, jsonFileName].join(path.sep);

    console.log(pdfPath)
    fileObject.mv(pdfPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }

        fs.writeFileSync(jsonPath, JSON.stringify({
            timeStamp: new Date()            
        }));

        return res.send('File uploaded!');
    });
});

//start app 
const port = process.env.PORT || 8080;

// process post

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);