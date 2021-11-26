export class NodeRenderDto {
  id: string;
  x: number;
  y: number;
  label: string;
  shape: string;

  constructor(id: string, x: number, y: number, label: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.label = label;
    this.shape = 'circle';
  }
}
