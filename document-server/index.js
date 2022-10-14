const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fileUpload = require('express-fileupload');
const util = require("util");
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const glob = util.promisify(require('glob'));
const documentsFolder = [__dirname, "documents"].join(path.sep);
const app = express();

if (!fs.existsSync(documentsFolder)) {
    fs.mkdirSync(documentsFolder, 0755);
}


// default options
app.use(fileUpload());

app.post('/documents', async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const fileKeys = Object.keys(req.files);
    const pdfFleObject = req.files[fileKeys[1]];
    const jsonFleObject = req.files[fileKeys[0]];
    const uuid = uuidv4();
    const pdfFileName = `${uuid}.pdf`
    const jsonFileName = `${uuid}.json`
    const pdfPath = [documentsFolder, pdfFileName].join(path.sep);
    const jsonPath = [documentsFolder, jsonFileName].join(path.sep);

    await pdfFleObject.mv(pdfPath);
    await jsonFleObject.mv(jsonPath);

    res.send('File uploaded!');
    res.end();
});



app.get('/documents', async (req, res) => {
    const jsonFileSearch = `${documentsFolder}/*.json`;
    const fileList = await glob(jsonFileSearch);   
    const result = (await Promise.all( 
        fileList.map(async file => { 
            const buffer = await readFile(file)
            const object = JSON.parse(buffer.toString());            
            return (
                {
                    url: `/document/${file.substring(file.lastIndexOf('/')+1)}`.replace(".json", ".pdf"),
                    ...object
                }
            )
        })
    ));

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
    res.end();    
});


app.get('/document/:documentId', async (req, res) => {
    const documentId = req.params.documentId;
    const pdfFileSearch = `${documentsFolder}/${documentId}`;
    const file = fs.createReadStream(pdfFileSearch);
    const stat = fs.statSync(pdfFileSearch);

    res.setHeader('Content-Length', stat.size);    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${documentId}`);
    file.pipe(res);
    
});


const port = process.env.PORT || 8080;

// process post

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);