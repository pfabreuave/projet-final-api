const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const produto = require('./models/produto')
const mesa = require('./models/mesa')
const pedido = require('./models/pedido')


const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './restaurant.db' })
const produtos = produto(sequelize, DataTypes)
const mesas = mesa(sequelize, DataTypes)
const pedidos = pedido(sequelize, DataTypes)



// We need to parse JSON coming from requests
app.use(express.json())


// Show mesa
app.get('/mesas/:id', async (req, res) => {
  const mesaId = req.params.id
  const mesa = await mesas.findByPk(mesaId);
  res.json(mesa);
});

// Show produto
app.get('/produtos/:id', async (req, res) => {
  const produtoId = req.params.id
  const produto = await produtos.findByPk(produtoId);
  res.json(produto);
});

// Show pedido
app.get('/pedidos/:id', async (req, res) => {
  const pedidoId = req.params.id
  const pedido = await pedidos.findByPk(pedidoId);
  res.json(pedido);
});

// List pedidos
  app.get('/pedidos', async (req, res) => {
  //res.json({ action: 'Listing pedidos' })
  
  const allPedidos = await pedidos.findAll();
  res.json(allPedidos); 
});

// List pedidos por mesa
  app.get('/pedidos//mesa', async (req, res) => {
  //res.json({ action: 'Listing pedidos' })
  const MesaId = req.params.mesa;
  const allPedidos = await pedidos.findAll({where: {mesaid:MesaId}});
  res.json(allPedidos); 
  });

// List pedidos por mesa
app.get('/mesas/:id/pedidos', async (req, res) => {
  //res.json({ action: 'Listing pedidos' })
  const MesaId = req.params.mesa;
  const allPedidos = await pedidos.findAll({where: {mesaid:MesaId}});
  res.json(allPedidos); 
  });

// Create pedido
  app.post('/pedido', async (req, res) => {
  const body = req.body

  await pedidos.create({
    productId: body.productId,
    mesaid: body.mesaid,
    status_pedido: body.status_pedido,
    is_active: body.is_active

  }); 
  
  res.json({resposta:"Registro criado",data:body})
});

  // Delete pedido
app.delete('/pedido/:id', async (req, res) => {
  const pedidoId = req.params.id

  await pedidos.destroy({where: {id:pedidoId}});
  res.json({resposta:"Registro excluido",Id:pedidoId});
});

// Update pedido
app.put('/pedido/:id', async (req, res) => {
  const pedidoId = req.params.id
  const body = req.body
  const prod = await pedidos.findByPk(pedidoId);
  prod.update({
    productId: body.productId,
    mesaid: body.mesaid,
    status_pedido: body.status_pedido,
    is_active: body.is_active

    

  }); 
  res.json({resposta:"Registro Alterado",data:prod, atualizacao:body})
});

  app.listen(3000, () => {
    console.log('Iniciando o ExpressJS na porta 3000')
  })

