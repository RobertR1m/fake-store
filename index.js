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

function Usuarios() {
  fetch("https://fakestoreapi.com/users")
    .then(response => response.json())
    .then(data => {
      usuarios = data;
      mostrar(usuarios, "usuario");
    });
}

document.getElementById("buscador").addEventListener("input", buscar);
function buscar() {
  const id = document.getElementById("buscador").value.trim();
  if (id === "") {
    mostrar([]);
    return;
  }

  const productosFiltrados = productos.filter(item =>
    item.title.toLowerCase().includes(id.toLowerCase())
  );

  const usuariosFiltrados = usuarios.filter(item =>
    (item.name.firstname + " " + item.name.lastname).toLowerCase().includes(id.toLowerCase())
  );

  const resultados = [...productosFiltrados, ...usuariosFiltrados];

  mostrar(resultados);
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
    } else {
      html += `
        <div class="card">
          <h3>${item.name.firstname} ${item.name.lastname}</h3>
          <p>Email: ${item.email}</p>
          <p>Usuario: ${item.username}</p>
          <p>Dirección: ${item.address.city}, ${item.address.street}</p>
        </div>
      `;
    }
  });

  contenedor.innerHTML = html;
}


