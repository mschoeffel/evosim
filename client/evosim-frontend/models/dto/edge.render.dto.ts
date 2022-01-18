export class EdgeRenderDto {
  id: string;
  from: string;
  to: string;
  title: string;
  width: number;
  widthHidden: number;
  label: string;
  labelHidden: string;
  smooth = {};
  color: string;
  dashes: boolean;

  constructor(
    id: string,
    from: string,
    to: string,
    title: string,
    width: number,
    label: string,
    enabled: boolean,
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.title = title;
    this.width = 0.1;
    this.widthHidden = width;
    this.label = '';
    this.labelHidden = label;
    this.smooth = {
      enabled: false,
      type: 'horizontal',
      roundness: 0.5,
    };
    if (enabled) {
      this.color = '#d3d3d3';
      this.dashes = false;
      this.widthHidden = width;
    } else {
      this.color = '#ff0000';
      this.dashes = true;
      this.widthHidden = 0.1;
    }
  }
}
