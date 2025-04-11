"use strict";
const canvas = document.getElementById('tanqueCanvas');
const ctx = canvas.getContext('2d');
const volumenTexto = document.getElementById('volumenTexto');
let width, height;
let elementos = [];
let tanque; // Referencia al tanque actual
function resizeCanvas() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const container = document.getElementById('container');
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    elementos = [];
    const saved = localStorage.getItem('tanques-config');
    let config = {};
    // let x = 80, y = 40, ancho = 100, alto = height - 80;
    if (saved) {
        try {
            config = JSON.parse(saved);
        }
        catch (e) {
            console.warn('Error al leer configuración previa:', e);
        }
    }
    // 🔵 Tanque 1 (Principal)
    const conf1 = (_a = config['Tanque-1']) !== null && _a !== void 0 ? _a : {};
    const x1 = (_b = conf1.x) !== null && _b !== void 0 ? _b : 80;
    const y1 = (_c = conf1.y) !== null && _c !== void 0 ? _c : 40;
    const ancho1 = (_d = conf1.ancho) !== null && _d !== void 0 ? _d : 100;
    const alto1 = (_e = conf1.alto) !== null && _e !== void 0 ? _e : height - 80;
    tanque = new Tanque(ctx, x1, y1, ancho1, alto1, 500, 10);
    tanque.id = 'Tanque-1';
    tanque.setVolumen(30);
    elementos.push(tanque);
    simularFlujoDeAgua(tanque);
    // 🟢 Tanque 2
    const conf2 = (_f = config['Tanque-2']) !== null && _f !== void 0 ? _f : {};
    const x2 = (_g = conf2.x) !== null && _g !== void 0 ? _g : 300;
    const y2 = (_h = conf2.y) !== null && _h !== void 0 ? _h : 40;
    const ancho2 = (_j = conf2.ancho) !== null && _j !== void 0 ? _j : 100;
    const alto2 = (_k = conf2.alto) !== null && _k !== void 0 ? _k : height - 120;
    const tanque2 = new Tanque(ctx, x2, y2, ancho2, alto2, 1000, 10);
    tanque2.id = 'Tanque-2';
    tanque2.setVolumen(70);
    elementos.push(tanque2);
    simularFlujoDeAgua(tanque2);
    // Tanque 3
    const conf3 = (_l = config['Tanque-3']) !== null && _l !== void 0 ? _l : {};
    const x3 = (_m = conf3.x) !== null && _m !== void 0 ? _m : 300;
    const y3 = (_o = conf3.y) !== null && _o !== void 0 ? _o : 40;
    const ancho3 = (_p = conf3.ancho) !== null && _p !== void 0 ? _p : 100;
    const alto3 = (_q = conf3.alto) !== null && _q !== void 0 ? _q : height - 120;
    const tanque3 = new Tanque(ctx, x3, y3, ancho3, alto3, 400, 10);
    tanque3.id = 'Tanque-3';
    tanque3.setVolumen(70);
    elementos.push(tanque3);
    simularFlujoDeAgua(tanque3);
    // Tanque Residuos
    // const confResiduos = config['Tanque-Residuos'] ?? {};
    // const xResiduos = confResiduos.x ?? 300;
    // const yResiduos = confResiduos.y ?? 40;
    // const anchoResiduos = confResiduos.ancho ?? 100;
    // const altoResiduos = confResiduos.alto ?? height - 120;
    // const tanqueResiduos = new Tanque(ctx, xResiduos, yResiduos, anchoResiduos, altoResiduos, 400, 10);
    // tanqueResiduos.id = 'Tanque-Residuos';
    // tanqueResiduos.setVolumen(70);
    // elementos.push(tanqueResiduos);
    // simularFlujoDeAgua(tanqueResiduos);
    // Podrías agregar más elementos aquí (como un Reloj):
    // const reloj = new Reloj(...);
    // elementos.push(reloj);
}
function loop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const elemento of elementos) {
        elemento.update(ctx, timestamp);
        elemento.draw(ctx);
    }
    let mensajes = [];
    for (const el of elementos) {
        if (el instanceof Tanque) {
            const porcentaje = (100 * el.volumen) / el.capacidad;
            const nivelMinimo = (10 * el.capacidad) / 100;
            let mensaje = `<strong>${el.id}</strong>: ${el.volumen}L (${porcentaje.toFixed(1)}%)`;
            if (el.volumen >= el.capacidad) {
                mensaje += ` ⚠️ <span style="color:red">LIQUIDO DERRAMADO</span>`;
            }
            else if (el.volumen === 0) {
                mensaje += ` ⚠️ <span style="color:red">TANQUE VACÍO</span>`;
            }
            else if (el.volumen <= nivelMinimo) {
                mensaje += ` ⚠️ <span style="color:orange">NIVEL MÍNIMO. PELIGRO!</span>`;
            }
            else if (el.volumen >= el.capacidad - (el.capacidad * 0.1)) {
                mensaje += ` ⚠️ <span style="color:darkorange">RIESGO DE DERRAME</span>`;
            }
            mensajes.push(`<div>${mensaje}</div>`);
        }
    }
    volumenTexto.innerHTML = mensajes.join("");
    requestAnimationFrame(loop);
}
// 🎯 Mouse interacciones
let isMouseDown = false;
let elementoActivo = null;
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (const elemento of elementos) {
        if (elemento.isInResizeArea(mouseX, mouseY)) {
            elemento.startResize();
            elementoActivo = elemento;
            break;
        }
        else if (elemento.isInside(mouseX, mouseY)) {
            elemento.startDrag(mouseX, mouseY);
            elementoActivo = elemento;
            break;
        }
    }
    isMouseDown = true;
});
canvas.addEventListener('mousemove', (e) => {
    if (!isMouseDown || !elementoActivo)
        return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (elementoActivo.isDragging) {
        elementoActivo.drag(mouseX, mouseY);
    }
    else if (elementoActivo.isResizing) {
        elementoActivo.resize(mouseX, mouseY);
    }
});
canvas.addEventListener('mouseup', () => {
    if (elementoActivo) {
        elementoActivo.stopDrag();
        elementoActivo.stopResize();
        elementoActivo = null;
    }
    // 💾 Guardar configuración
    const config = {};
    elementos.forEach(el => {
        if (el instanceof Tanque && el.id) {
            config[el.id] = {
                x: el.getX(),
                y: el.getY(),
                ancho: el.getAncho(),
                alto: el.getAlto()
            };
        }
    });
    localStorage.setItem('tanques-config', JSON.stringify(config));
    isMouseDown = false;
});
canvas.addEventListener('mouseleave', () => {
    if (elementoActivo) {
        elementoActivo.stopDrag();
        elementoActivo.stopResize();
        elementoActivo = null;
    }
    isMouseDown = false;
});
function simularFlujoDeAgua(tanque) {
    let valor = tanque.volumen;
    let direccion = 1;
    function actualizar() {
        const delta = Math.floor(Math.random() * 16) + 5;
        if (Math.random() < 0.2) {
            direccion *= -1;
        }
        valor += delta * direccion;
        if (valor > tanque.capacidad) {
            valor = tanque.capacidad;
            direccion = -1;
        }
        else if (valor < 0) {
            valor = 0;
            direccion = 1;
        }
        tanque.setVolumen(Math.round(valor));
        setTimeout(actualizar, 1400);
    }
    actualizar();
}
window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        resizeCanvas();
        loop(0);
        console.log("Canvas size:", canvas.width, canvas.height);
    });
});
window.addEventListener('resize', () => {
    resizeCanvas();
});
