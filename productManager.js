const listaDeProductos = [];

function agregarProducto(nuevoProducto) {
    nuevoProducto.id = generarIdUnico();
    listaDeProductos.push(nuevoProducto);
}

function obtenerListaDeProductos() {
    return listaDeProductos;
}

function eliminarProducto(id) {
    const index = listaDeProductos.findIndex(producto => producto.id === id);
    if (index !== -1) {
        listaDeProductos.splice(index, 1);
    }
}

function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
    agregarProducto,
    obtenerListaDeProductos,
    eliminarProducto
};
