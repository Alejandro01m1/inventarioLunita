import { db } from './firebase-config.js';

import {

collection,
getDocs,
addDoc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
DINERO PENDIENTE
========================= */

const formFinanzas =
document.getElementById("formFinanzas");

formFinanzas.addEventListener("submit", async (e)=>{

e.preventDefault();

const dineroDeben =
Number(document.getElementById("dineroDeben").value);

await addDoc(collection(db,"finanzas"),{

dineroDeben

});

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

totalVendido += Number(articulo.ingresos || 0);

});

/* =========================
DINERO PENDIENTE
========================= */

let totalDeben = 0;

const finanzasSnapshot =
await getDocs(collection(db,"finanzas"));

finanzasSnapshot.forEach((doc)=>{

const datos = doc.data();

totalDeben += Number(datos.dineroDeben || 0);

});

/* =========================
TOTAL GASTOS
========================= */

let totalGastos = 0;

const gastosSnapshot =
await getDocs(collection(db,"gastos"));

gastosSnapshot.forEach((doc)=>{

const gasto = doc.data();

totalGastos += Number(gasto.valorGasto || 0);

});

/* =========================
DINERO REAL
========================= */

const dineroReal =
totalVendido - totalGastos - totalDeben;

/* =========================
MOSTRAR
========================= */

document.getElementById("totalVendido")
.innerText =
"$" + totalVendido;

document.getElementById("totalGastos")
.innerText =
"$" + totalGastos;

document.getElementById("totalDeben")
.innerText =
"$" + totalDeben;

document.getElementById("dineroReal")
.innerText =
"$" + dineroReal;