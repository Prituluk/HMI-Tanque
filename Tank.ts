class Tanque extends ElementoCanvas {
  // private ctx: CanvasRenderingContext2D;
  id?: string;
  public volumen: number = 0;
  public capacidad: number;
  private umbral: number;
  private toggle: boolean = false;
  private lastToggleTime: number = 0;
  private alertaActiva: boolean = false;

  public isDragging: boolean = false;
  public isResizing: boolean = false;
  public offsetX: number = 0;
  public offsetY: number = 0;

  public getX(): number { return this.x; }
  public getY(): number { return this.y; }
  public getAncho(): number { return this.ancho; }
  public getAlto(): number { return this.alto; }


  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    ancho: number,
    alto: number,
    capacidad: number,
    limitePorcentaje: number,
    private toggleInterval: number = 300,
  ) {
    super(ctx, x, y, ancho, alto);
    this.capacidad = capacidad;
    this.umbral = (capacidad * limitePorcentaje) / 100;
  }

  public setVolumen(volumen: number): void {
    this.volumen = volumen;
    this.alertaActiva = (this.capacidad - this.volumen) <= this.umbral || this.volumen <= (this.capacidad * 0.1);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.dibujarRegla(ctx);
    this.dibujarTanque(ctx);
    const timestamp = performance.now();
    this.dibujarAlarma(ctx, timestamp);
  }

  private dibujarRegla(ctx: CanvasRenderingContext2D): void {
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
      if (yPos < reglaTop || yPos > reglaBottom) continue;

      this.ctx.beginPath();
      this.ctx.moveTo(reglaX, yPos);
      this.ctx.lineTo(reglaX + 10, yPos);
      this.ctx.stroke();
      this.ctx.fillText(`${litros}L`, reglaX - 5, yPos);
    }
  }

  private dibujarTanque(ctx: CanvasRenderingContext2D): void {
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
    this.ctx.fillText(`${this.id}`, this.x - 20, this.y + this.alto + 20)
    this.ctx.fill();
    this.ctx.closePath();

    // Dibujar "handle" de resize en la esquina inferior derecha
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x + this.ancho - 10, this.y + this.alto - 10, 10, 10);
  }

  private dibujarAlarma(ctx: CanvasRenderingContext2D, timestamp: number): void {
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
    } else {
      ctx.fillStyle = 'limegreen';
    }

    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
  }

  public update(ctx: CanvasRenderingContext2D, timestamp: number): void {
    this.dibujarRegla(ctx);
    this.dibujarTanque(ctx);
    this.dibujarAlarma(ctx, timestamp);
  }

  // 📦 Nuevos métodos para mover y redimensionar
  public isInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.ancho &&
      y >= this.y && y <= this.y + this.alto;
  }

  public isInResizeArea(x: number, y: number): boolean {
    return x >= this.x + this.ancho - 10 && x <= this.x + this.ancho &&
      y >= this.y + this.alto - 10 && y <= this.y + this.alto;
  }

  public startDrag(mouseX: number, mouseY: number) {
    this.offsetX = mouseX - this.x;
    this.offsetY = mouseY - this.y;
    this.isDragging = true;
  }

  public drag(mouseX: number, mouseY: number) {
    if (this.isDragging) {
      this.x = mouseX - this.offsetX;
      this.y = mouseY - this.offsetY;
    }
  }

  public stopDrag() {
    this.isDragging = false;
  }

  public resize(mouseX: number, mouseY: number) {
    if (this.isResizing) {
      this.ancho = mouseX - this.x;
      this.alto = mouseY - this.y;
    }
  }

  public startResize() {
    this.isResizing = true;
  }

  public stopResize() {
    this.isResizing = false;
  }
}
// window.Tanque = Tanque;