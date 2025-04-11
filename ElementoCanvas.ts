abstract class ElementoCanvas {
  protected ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public ancho: number;
  public alto: number;
  public isDragging: boolean = false;
  public isResizing: boolean = false;
  protected offsetX: number = 0;
  protected offsetY: number = 0;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, ancho: number, alto: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

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

  public startResize() {
    this.isResizing = true;
  }

  public resize(mouseX: number, mouseY: number) {
    if (this.isResizing) {
      this.ancho = mouseX - this.x;
      this.alto = mouseY - this.y;
    }
  }

  public stopResize() {
    this.isResizing = false;
  }
}
