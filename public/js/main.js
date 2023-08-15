const socket = io();

document.getElementById('crearProductoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);
    socket.emit('crearProducto', { nombre, precio });
});

document.getElementById('eliminarProductoForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const productoId = document.getElementById('productoId').value;
    socket.emit('eliminarProducto', productoId);
});

socket.on('productoCreado', (nuevoProducto) => {
    const productList = document.getElementById('product-list');
    const newProductItem = document.createElement('li');
    newProductItem.textContent = `${nuevoProducto.nombre} - ${nuevoProducto.precio}`;
    productList.appendChild(newProductItem);
});

socket.on('productoEliminado', (productoId) => {
    const productList = document.getElementById('product-list');
    const productItems = productList.getElementsByTagName('li');
    for (const item of productItems) {
        const itemId = item.textContent.split(' - ')[0];
        if (itemId === productoId) {
            item.remove();
            break;
        }
    }
});
