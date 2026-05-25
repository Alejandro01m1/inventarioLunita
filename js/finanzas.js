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

/* INPUTS */

const dineroInput =
document.getElementById("dineroDeben");

const envioInput =
document.getElementById("envio");

/* VALORES */

const dineroDeben =
Number(dineroInput.value || 0);

const envio =
Number(envioInput.value || 0);

/* GUARDAR */

await addDoc(collection(db,"finanzas"),{

dineroDeben,
envio

});

/* RECARGAR */

location.reload();

});

/* =========================
TOTAL VENDIDO
========================= */

let totalVendido = 0;

const articulosSnapshot =
await getDocs(collection(db,"articulos"));

articulosSnapshot.forEach((doc)=>{

const articulo = doc.data();

totalVendido +=
Number(articulo.ingresos || 0);

});

/* =========================
DINERO PENDIENTE + ENVIO
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
DINERO REAL
========================= */

const dineroReal =
totalVendido
- totalEnvio
- totalGastos
- totalDeben;

/* =========================
MOSTRAR DATOS
========================= */

document.getElementById("totalVendido")
.innerText =
"$" + totalVendido;

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