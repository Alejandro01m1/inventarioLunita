import { db } from './firebase-config.js';

import {

collection,
getDocs,
addDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
FORMULARIO
========================= */

const formFinanzas =
document.getElementById("formFinanzas");

formFinanzas.addEventListener("submit", async (e)=>{

e.preventDefault();

const dineroDeben =
Number(document.getElementById("dineroDeben").value || 0);

const envio =
Number(document.getElementById("envio").value || 0);

await addDoc(collection(db,"finanzas"),{

dineroDeben,
envio

});

location.reload();

});

/* =========================
VENTAS E INVERSION
========================= */

let totalVendido = 0;
let totalInvertido = 0;

const articulosSnapshot =
await getDocs(collection(db,"articulos"));

articulosSnapshot.forEach((doc)=>{

const articulo = doc.data();

totalVendido +=
Number(articulo.ingresos || 0);

totalInvertido +=
Number(articulo.costoTotal || 0);

});

/* =========================
ENVIOS Y DEUDAS
========================= */

let totalDeben = 0;
let totalEnvio = 0;

const finanzasSnapshot =
await getDocs(collection(db,"finanzas"));

finanzasSnapshot.forEach((doc)=>{

const datos = doc.data();

totalDeben +=
Number(datos.dineroDeben || 0);

totalEnvio +=
Number(datos.envio || 0);

});

/* =========================
OTROS GASTOS
========================= */

let totalGastos = 0;

const gastosSnapshot =
await getDocs(collection(db,"gastos"));

gastosSnapshot.forEach((doc)=>{

const gasto = doc.data();

totalGastos +=
Number(gasto.valorGasto || 0);

});

/* =========================
GANANCIA REAL
========================= */

const dineroReal =
totalVendido
- totalInvertido
- totalEnvio
- totalGastos
- totalDeben;

/* =========================
MOSTRAR
========================= */

document.getElementById("totalVendido")
.innerText =
"$" + totalVendido;

document.getElementById("totalInvertido")
.innerText =
"$" + totalInvertido;

document.getElementById("gastosEnvio")
.innerText =
"$" + totalEnvio;

document.getElementById("totalGastos")
.innerText =
"$" + totalGastos;

document.getElementById("totalDeben")
.innerText =
"$" + totalDeben;

document.getElementById("dineroReal")
.innerText =
"$" + dineroReal;