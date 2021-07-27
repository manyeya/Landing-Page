import { gsap } from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

export default class Glass {
  el: HTMLElement;
  chars: HTMLElement[];

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = Array.from(this.el.querySelectorAll(".words > .word > .char"));
    this.translateTextIn();
  }

  translateTextIn() {
    gsap.set(this.chars, { perspective: 400 });

    gsap
      .timeline()
      .from(
        this.chars,
        {
          duration: 1.5,
          ease: "circ.out",
          y: 400,
          stagger: 0.09,
        },
        "+=0"
      )
      .from(
        ".sum",
        {
          opacity: 0,
          duration: 2,
          ease: "power3.out",
        },
        "-=1"
      );
  }
}

Splitting();
