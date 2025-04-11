"use strict";
class Tanque extends ElementoCanvas {
    getX() { return this.x; }
    getY() { return this.y; }
    getAncho() { return this.ancho; }
    getAlto() { return this.alto; }
    constructor(ctx, x, y, ancho, alto, capacidad, limitePorcentaje, toggleInterval = 300) {
        super(ctx, x, y, ancho, alto);
        this.toggleInterval = toggleInterval;
        this.volumen = 0;
        this.toggle = false;
        this.lastToggleTime = 0;
        this.alertaActiva = false;
        this.isDragging = false;
        this.isResizing = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.capacidad = capacidad;
        this.umbral = (capacidad * limitePorcentaje) / 100;
    }
    setVolumen(volumen) {
        this.volumen = volumen;
        this.alertaActiva = (this.capacidad - this.volumen) <= this.umbral || this.volumen <= (this.capacidad * 0.1);
    }
    draw(ctx) {
        this.dibujarRegla(ctx);
        this.dibujarTanque(ctx);
        const timestamp = performance.now();
        this.dibujarAlarma(ctx, timestamp);
    }
    dibujarRegla(ctx) {
        const reglaX = this.x - 40;
        const reglaTop = this.y;
        const reglaBottom = this.y + this.alto;
        const intervaloLitros = 50;
        const pixelsPorLitro = this.alto / this.capacidad;
        const fontSize = Math.max(10, Math.min(16, this.alto / 15)); // 🔥 Auto-ajuste de fuente
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'white';
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        for (let litros = 0; litros <= this.capacidad; litros += intervaloLitros) {
            const offsetY = litros * pixelsPorLitro;
            const yPos = reglaBottom - offsetY;
            if (yPos < reglaTop || yPos > reglaBottom)
                continue;
            this.ctx.beginPath();
            this.ctx.moveTo(reglaX, yPos);
            this.ctx.lineTo(reglaX + 10, yPos);
            this.ctx.stroke();
            this.ctx.fillText(`${litros}L`, reglaX - 5, yPos);
        }
    }
    dibujarTanque(ctx) {
        const alturaFluido = (this.volumen / this.capacidad) * this.alto;
        this.ctx.fillStyle = '#555';
        this.ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.fillStyle = 'deepskyblue';
        this.ctx.fillRect(this.x, this.y + this.alto - alturaFluido, this.ancho, alturaFluido);
        this.ctx.strokeStyle = '#888';
        this.ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        this.ctx.beginPath();
        this.ctx.font = 'normal 14px Arial ';
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(`${this.id}`, this.x - 20, this.y + this.alto + 20);
        this.ctx.fill();
        this.ctx.closePath();
        // Dibujar "handle" de resize en la esquina inferior derecha
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.x + this.ancho - 10, this.y + this.alto - 10, 10, 10);
    }
    dibujarAlarma(ctx, timestamp) {
        const cx = this.x + this.ancho + 50;
        const cy = this.y + 30;
        const r = 20;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        if (this.alertaActiva) {
            if (timestamp - this.lastToggleTime > this.toggleInterval) {
                this.toggle = !this.toggle;
                this.lastToggleTime = timestamp;
            }
            ctx.fillStyle = this.toggle ? 'red' : 'white';
        }
        else {
            ctx.fillStyle = 'limegreen';
        }
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
    }
    update(ctx, timestamp) {
        this.dibujarRegla(ctx);
        this.dibujarTanque(ctx);
        this.dibujarAlarma(ctx, timestamp);
    }
    // 📦 Nuevos métodos para mover y redimensionar
    isInside(x, y) {
        return x >= this.x && x <= this.x + this.ancho &&
            y >= this.y && y <= this.y + this.alto;
    }
    isInResizeArea(x, y) {
        return x >= this.x + this.ancho - 10 && x <= this.x + this.ancho &&
            y >= this.y + this.alto - 10 && y <= this.y + this.alto;
    }
    startDrag(mouseX, mouseY) {
        this.offsetX = mouseX - this.x;
        this.offsetY = mouseY - this.y;
        this.isDragging = true;
    }
    drag(mouseX, mouseY) {
        if (this.isDragging) {
            this.x = mouseX - this.offsetX;
            this.y = mouseY - this.offsetY;
        }
    }
    stopDrag() {
        this.isDragging = false;
    }
    resize(mouseX, mouseY) {
        if (this.isResizing) {
            this.ancho = mouseX - this.x;
            this.alto = mouseY - this.y;
        }
    }
    startResize() {
        this.isResizing = true;
    }
    stopResize() {
        this.isResizing = false;
    }
}
// window.Tanque = Tanque;
