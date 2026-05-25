import { db } from './firebase-config.js';

import {

collection,
getDocs,
addDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
FORMULARIO
========================= */

const form =
document.getElementById("formFinanzas");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const gastosEnvio =
Number(document.getElementById("gastosEnvio").value);

const dineroDeben =
Number(document.getElementById("dineroDeben").value);

await addDoc(collection(db,"finanzas"),{

gastosEnvio,
dineroDeben

});


location.reload();

});

/* =========================
TOTAL VENDIDO
========================= */

let totalVendido = 0;

const snapshotArticulos =
await getDocs(collection(db,"articulos"));

snapshotArticulos.forEach((doc)=>{

const articulo = doc.data();

console.log(articulo);

totalVendido += Number(articulo.ingresos);

});

/* =========================
GASTOS Y DEUDAS
========================= */

let totalEnvios = 0;
let totalDeben = 0;

const snapshotFinanzas =
await getDocs(collection(db,"finanzas"));

snapshotFinanzas.forEach((doc)=>{

const datos = doc.data();

totalEnvios += Number(datos.gastosEnvio || 0);

totalDeben += Number(datos.dineroDeben || 0);

});

/* =========================
DINERO REAL
========================= */

const dineroReal =
totalVendido - totalEnvios - totalDeben;

/* =========================
MOSTRAR
========================= */

document.getElementById("totalVendido")
.innerText =
"$" + totalVendido;

document.getElementById("totalEnvios")
.innerText =
"$" + totalEnvios;

document.getElementById("totalDeben")
.innerText =
"$" + totalDeben;

document.getElementById("dineroReal")
.innerText =
"$" + dineroReal;