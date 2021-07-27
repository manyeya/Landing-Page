import { gsap } from "gsap";

export default class Cursor {
    
  cursor: HTMLElement;
  pos: { x: number; y: number };
  mouse: { x: number; y: number };
  ySet: Function;
  xSet: Function;
  speed: number;

  constructor(cursor: HTMLElement) {
    this.cursor = cursor;
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: this.pos.x, y: this.pos.y };
    this.speed = 0.35;

    this.xSet = gsap.quickSetter(this.cursor, "x", "px");
    this.ySet = gsap.quickSetter(this.cursor, "y", "px");

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    this.tick();
  }

  tick() {
    gsap.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - this.speed, gsap.ticker.deltaRatio());

      this.pos.x += (this.mouse.x - this.pos.x) * dt;
      this.pos.y += (this.mouse.y - this.pos.y) * dt;
      this.xSet(this.pos.x);
      this.ySet(this.pos.y);
    });
  }
}
