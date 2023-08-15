const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const productManager = require('./productManager'); // Importa el productManager

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Crear una instancia de handlebars
const hbs = handlebars.create();

// Configuración de Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.render('home', { productos: productManager.obtenerListaDeProductos() });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Lógica de Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('crearProducto', (nuevoProducto) => {
        productManager.agregarProducto(nuevoProducto);
        io.emit('productoCreado', nuevoProducto);
    });

    socket.on('eliminarProducto', (productoId) => {
        productManager.eliminarProducto(productoId);
        io.emit('productoEliminado', productoId);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar servidor
server.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
