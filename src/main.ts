import "./style.css";
import Cursor from "./cursor";
import { gsap } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import Grid from "./grid";
class Glass {
  el: HTMLElement;
  chars: HTMLElement[];

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = Array.from(this.el.querySelectorAll(".words > .word > .char"));
    this.tranIn()
  }

  tranIn() {
    gsap.set(this.chars, { perspective: 400 });

    gsap.timeline().from(
      this.chars,
      {
        duration: 1.5, 
        ease: "circ.out", 
        y: 400, 
        stagger: 0.09,
      },
      "+=0"
    );
  }
}


Splitting();
new Cursor(document.querySelector(".ball")!);
new Glass(document.querySelector('.amazing-wrapper-1')!);
new Grid(document.querySelector(".grid")!);
