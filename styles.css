// Conteo regresivo hacia la Gran Apertura
// Viernes 02 de octubre de 2026, 6:00 p. m. (hora de República Dominicana, UTC-4)
const FECHA_EVENTO = new Date("2026-10-02T18:00:00-04:00").getTime();

function pad(num) {
  return String(num).padStart(2, "0");
}

function actualizarConteo() {
  const ahora = new Date().getTime();
  const restante = FECHA_EVENTO - ahora;

  const diasEl = document.getElementById("cd-days");
  const horasEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const segsEl = document.getElementById("cd-secs");

  if (restante <= 0) {
    diasEl.textContent = "00";
    horasEl.textContent = "00";
    minsEl.textContent = "00";
    segsEl.textContent = "00";
    clearInterval(temporizador);
    return;
  }

  const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segs = Math.floor((restante % (1000 * 60)) / 1000);

  diasEl.textContent = pad(dias);
  horasEl.textContent = pad(horas);
  minsEl.textContent = pad(mins);
  segsEl.textContent = pad(segs);
}

actualizarConteo();
const temporizador = setInterval(actualizarConteo, 1000);
