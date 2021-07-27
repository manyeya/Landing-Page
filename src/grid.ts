import { gsap } from "gsap";
import { utils } from "./utils";

let mousepos = { x: 0, y: 0 };
let win = utils.calcWinsize();

window.addEventListener("mousemove", (e) => {
  mousepos = utils.getMousePos(e);
});

window.addEventListener("resize", () => {
  win = utils.calcWinsize();
});

class GridItem {
  el: HTMLElement;
  constructor(el: HTMLElement) {
    this.el = el;
    this.move();
  }

  move() {
    let configs = { tx: 0, ty: 0 };
    let xstart = gsap.utils.random(15, 60);
    let ystart = gsap.utils.random(15, 60);

    // infinite loop
    const render = () => {
      // Calculate the amount to move.
      // Using linear interpolation to smooth things out.
      // Translation values will be in the range of [-start, start] for a cursor movement from 0 to the window's width/height
      configs.tx = gsap.utils.interpolate(
        configs.tx,
        gsap.utils.mapRange(0, win.width, -xstart, xstart, mousepos.x),
        0.1
      );

      configs.ty = gsap.utils.interpolate(
        configs.ty,
        gsap.utils.mapRange(0, win.height, -ystart, ystart, mousepos.y),
        0.1
      );

      gsap.set(this.el, { x: configs.tx, y: configs.ty });

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }
}

export default class Grid {
  gridItems: GridItem[];
  items: HTMLElement[];
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
    this.gridItems = [];
    this.items = Array.from(this.el.querySelectorAll(".grid_item"));
    this.items.forEach((el) => this.gridItems.push(new GridItem(el)));
    this.show();
  }

  show() {
    gsap
      .timeline()
      .set(
        this.items,
        {
          scale: 0.2,
          opacity: 0,
        },
        0
      )
      .to(
        this.items,
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "expo.inOut",
          stagger: {
            amount: 0.2,
            grid: "auto",
            from: "random",
            ease: "power3.out",
          },
        },
        0
      );
  }
}
