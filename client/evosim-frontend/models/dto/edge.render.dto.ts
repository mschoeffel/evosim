export class EdgeRenderDto {
  id: string;
  from: string;
  to: string;
  title: string;
  width: number;
  widthHidden: number;
  label: string;
  labelHidden: string;
  smooth: {};

  constructor(
    id: string,
    from: string,
    to: string,
    title: string,
    width: number,
    label: string,
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
      enabled: true,
      type: 'horizontal',
      roundness: 0.5,
    };
  }
}
