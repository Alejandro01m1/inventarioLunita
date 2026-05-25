import { db } from './firebase-config.js';

import {

collection,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const tabla =
document.getElementById("tablaArticulos");

const querySnapshot =
await getDocs(collection(db, "articulos"));

let contador = 1;

querySnapshot.forEach((documento) => {

const a = documento.data();

tabla.innerHTML += `

<tr>

<td>${contador}</td>

<td>${a.nombre}</td>

<td>${a.cantidadComprada}</td>

<td>$${a.precioMayorista}</td>

<td>$${a.costoTotal}</td>

<td>${a.cantidadVendida}</td>

<td>${a.disponibles}</td>

<td>$${a.precioVenta}</td>

<td>$${a.ingresos}</td>

<td>

<span class="${
a.estado === 'Hay unidades'
? 'estadoDisponible'
: 'estadoNoDisponible'
}">

${a.estado}

</span>

</td>

<td>

<div class="acciones">

<a href="editarArticulo.html?id=${documento.id}">

<button class="btnEditar">

Editar

</button>

</a>

<button class="btnEliminar"
onclick="eliminarArticulo('${documento.id}')">

Eliminar

</button>

</div>

</td>

</tr>

`;

contador++;

});

window.eliminarArticulo = async (id) => {

const confirmar =
confirm("¿Eliminar artículo?");

if(confirmar){

await deleteDoc(doc(db, "articulos", id));

location.reload();

}

};