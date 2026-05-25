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

formFinanzas.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dineroDeben =
  Number(document.getElementById("dineroDeben").value || 0);

  const envio =
  Number(document.getElementById("envio").value || 0);

  const abono =
  Number(document.getElementById("abono").value || 0);

  await addDoc(collection(db, "finanzas"), {
    dineroDeben,
    envio,
    abono
  });

  location.reload();
});

/* =========================
VENTAS E INVERSION
========================= */

let totalVendido = 0;
let totalInvertido = 0;

const articulosSnapshot =
await getDocs(collection(db, "articulos"));

articulosSnapshot.forEach((doc) => {

  const articulo = doc.data();

  totalVendido += Number(articulo.ingresos || 0);
  totalInvertido += Number(articulo.costoTotal || 0);

});

/* =========================
FINANZAS
========================= */

let totalDeben = 0;
let totalEnvio = 0;
let totalAbono = 0;

const finanzasSnapshot =
await getDocs(collection(db, "finanzas"));

finanzasSnapshot.forEach((doc) => {

  const datos = doc.data();

  totalDeben += Number(datos.dineroDeben || 0);
  totalEnvio += Number(datos.envio || 0);
  totalAbono += Number(datos.abono || 0);

});

/* =========================
DINERO PENDIENTE (NO SE TOCA POR ABONOS)
========================= */

const dineroPendiente = totalDeben;

/* =========================
DINERO REAL
========================= */

const dineroReal =
totalVendido
- totalInvertido
- totalEnvio
- totalDeben
+ totalAbono;

/* =========================
MOSTRAR
========================= */

document.getElementById("totalVendido").innerText =
"$" + totalVendido;

document.getElementById("totalInvertido").innerText =
"$" + totalInvertido;

document.getElementById("gastosEnvio").innerText =
"$" + totalEnvio;

document.getElementById("totalDeben").innerText =
"$" + totalDeben;

document.getElementById("totalAbono").innerText =
"$" + totalAbono;

document.getElementById("dineroReal").innerText =
"$" + dineroReal;