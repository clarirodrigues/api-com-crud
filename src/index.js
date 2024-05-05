const express = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())

const port = 3000

const Evento = mongoose.model('Evento', {
    nome: String,
    data: String,
    hora: String,
    local: String,
});

app.get("/", async (req, res) => {
    const eventos = await Evento.find()
    res.send(eventos)
})

app.delete("/:id", async(req, res) => {
    const evento = await Evento.findByIdAndDelete(req.params.id)
    return res.send(evento)
})

app.put("/:id", async(req, res) => {
    const evento =  await Evento.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        data: req.body.data,
        hora: req.body.hora,
        local: req.body.local
    }, {
        new: true
    })
    returnres.send(evento)
})

app.post("/", async(req, res) => {
    const evento = new Evento({
        nome: req.body.nome,
        data: req.body.data,
        hora: req.body.hora,
        local: req.body.local
    })
    
    await evento.save()
    return res.send(evento)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://clarirodrigues:Lty5rudTupybxqUM@cluster0.e39iq9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('App rodando')
})