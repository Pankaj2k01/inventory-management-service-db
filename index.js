const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const bodyparser = require('body-parser');
const Inventory = require('./db');

app.use(bodyparser.json());


app.get('/inventory', async (req, res) => {
  const inventoryItems = await Inventory.find();
  res.json(inventoryItems);
});

app.post('/inventory', async (req, res) => {
  const { name, quantity } = req.body;
  const inventoryItem = new Inventory({ name, quantity });
  await inventoryItem.save();
  res.json(inventoryItem);
});

app.put('/inventory/:id', async (req, res) => {
  const id = req.params.id;
  const { name, quantity } = req.body;
  const inventoryItem = await Inventory.findByIdAndUpdate(id, { name, quantity }, { new: true });
  res.json(inventoryItem);
});

app.delete('/inventory/:id', async (req, res) => {
    const id = req.params.id;
    await Inventory.findByIdAndDelete(id);
    res.json({ message: 'Inventory item deleted' });
  });


app.listen(port, () => console.log(`App listening on port ${port}!`));