"use strict";
class ElementoCanvas {
    constructor(ctx, x, y, ancho, alto) {
        this.isDragging = false;
        this.isResizing = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
    }
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
    startResize() {
        this.isResizing = true;
    }
    resize(mouseX, mouseY) {
        if (this.isResizing) {
            this.ancho = mouseX - this.x;
            this.alto = mouseY - this.y;
        }
    }
    stopResize() {
        this.isResizing = false;
    }
}
