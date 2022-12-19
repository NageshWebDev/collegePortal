const mongoDB = require('./config/mongoose.js')
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const PORT = 8000
const documentModel = require('./config/schemaAndModel')
const path = require('path')

app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getMeStudentRecord', async (req, res) => {
    const data = await documentModel.find({}, { _id: 0, createdAt: 0, __v: 0 })
    res.status(200).json({ payload: data })
})

app.post('/sendStudentRecord', async (req, res) => {
    const file = req.files.myFile
    console.log(file);

    const uploadPath = path.join(__dirname, '../myApp/src/client/uploads')
    file.mv(`${uploadPath}/${file.name}`, async (error) => {
        if (error) {
            console.log(error)
            return res.status(500).send(error)
        } else {
            const body = req.body;
            console.log(body)

            const filter = { stuRoll: req.body.stuRollNo }
            const update = {
                fileName: file.name,
                filePath: `client/uploads/${file.name}`,
                stuRoll: req.body.stuRollNo,
                stuName: req.body.stuName,
                stuEmail: req.body.stuEmail,
            }
            const found = await documentModel.findOneAndUpdate(filter, update)
            if (found) {
                console.log('Record Already exist')
                console.log('Existing Record Updated')
                res.status(200).json({ message: "Student Record Received", fileName: file.name, filePath: `src/client/uploads/` })
            } else if (!found) {
                console.log('New Record')
                const pushData = {
                    fileName: file.name,
                    filePath: `client/uploads/${file.name}`,
                    stuRoll: req.body.stuRollNo,
                    stuName: req.body.stuName,
                    stuEmail: req.body.stuEmail,
                }
                await documentModel.create(pushData)
                res.status(200).json({ message: "Student Record Received"})
            }
        }
    })
})

app.listen(PORT, () => { console.log("Server is up at :: " + PORT) });