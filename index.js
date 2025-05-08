const contenedor = document.getElementById("resultados");
let productos = [];
let usuarios = [];

function Productos() {
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrar(productos, "producto");
    });
}

function mostrar(lista) {
  let html = "";

  lista.forEach(item => {
    if (item.title) {
      html += `
        <div class="card">
          <h3>${item.title}</h3>
          <img src="${item.image}" alt="${item.title}" width="100%">
          <p>Precio: $${item.price}</p>
          <p>${item.description}</p>
        </div>
      `;
    } 
});
  contenedor.innerHTML = html;
}
