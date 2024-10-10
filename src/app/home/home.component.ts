import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { LogoGridComponent } from "../logo-grid/logo-grid.component";
import { TweenLite, Circ } from "gsap";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LogoGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  private width: number;
  private height: number;
  private largeHeader!: HTMLElement;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private points: any[] = [];
  private target: { x: number; y: number };
  private animateHeader = true;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.target = { x: this.width / 2, y: this.height / 2 };
  }

  // Method to handle contact us button click
 

  ngAfterViewInit(): void {
    this.initHeader();
    this.initAnimation();
    this.addListeners();
  }

  private initHeader(): void {
    this.largeHeader = this.elRef.nativeElement.querySelector('#large-header');
    this.renderer.setStyle(this.largeHeader, 'height', `${this.height}px`);

    this.canvas = this.elRef.nativeElement.querySelector('#demo-canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.points = [];
    for (let x = 0; x < this.width; x += this.width / 20) {
      for (let y = 0; y < this.height; y += this.height / 20) {
        const px = x + Math.random() * this.width / 20;
        const py = y + Math.random() * this.height / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        this.points.push(p);
      }
    }

    this.points.forEach(p1 => {
      p1.closest = [];
      this.points.forEach(p2 => {
        if (p1 !== p2) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (!p1.closest[k]) {
                p1.closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, p1.closest[k])) {
                p1.closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      });
    });

    this.points.forEach(p => {
      const c = new Circle(p, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      p.circle = c;
    });
  }

  private addListeners(): void {
    window.addEventListener('mousemove', this.mouseMove.bind(this));
    window.addEventListener('scroll', this.scrollCheck.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  private mouseMove(event: MouseEvent): void {
    this.target.x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    this.target.y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  private scrollCheck(): void {
    this.animateHeader = document.body.scrollTop <= this.height;
  }

  private resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setStyle(this.largeHeader, 'height', `${this.height}px`);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private initAnimation(): void {
    this.animate();
    this.points.forEach(p => this.shiftPoint(p));
  }

  private animate(): void {
    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.points.forEach(p => {
        if (Math.abs(this.getDistance(this.target, p)) < 4000) {
          p.active = 0.3;
          p.circle.active = 0.6;
        } else if (Math.abs(this.getDistance(this.target, p)) < 20000) {
          p.active = 0.1;
          p.circle.active = 0.3;
        } else if (Math.abs(this.getDistance(this.target, p)) < 40000) {
          p.active = 0.02;
          p.circle.active = 0.1;
        } else {
          p.active = 0;
          p.circle.active = 0;
        }

        this.drawLines(p);
        p.circle.draw();
      });
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  private shiftPoint(p: any): void {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: () => this.shiftPoint(p)
    });
  }

  private drawLines(p: any): void {
    if (!p.active) return;
    p.closest.forEach((closestPoint: any) => {
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(closestPoint.x, closestPoint.y);
      this.ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
      this.ctx.stroke();
    });
  }

  private getDistance(p1: any, p2: any): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
}

// Circle class
class Circle {
  constructor(private pos: any, private radius: number, private color: string) {}

  active: number = 0;

  draw() {
    if (!this.active) return;
    const ctx = (document.getElementById('demo-canvas') as HTMLCanvasElement).getContext('2d')!;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    ctx.fill();
  }
}
