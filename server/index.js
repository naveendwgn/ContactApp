const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const ContactModel = require('./models/Contact');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://bittudew08:KdAf3qqgVEBuLlzW@cluster0.bq5pu3x.mongodb.net/contact?retryWrites=true&w=majority", { 
    useNewUrlParser: true, 
});



app.post('/create', async (req, res) => {

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;

    const contact = new ContactModel({name: name, phone: phone, email: email});

    try {
        await contact.save();
        res.send('Contact saved');
    } catch(err) {
        console.log(err);
    }
});


app.get('/read', async (req, res) => {
    try {
      const result = await ContactModel.find({});
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});