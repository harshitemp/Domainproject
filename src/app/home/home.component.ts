import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { LogoGridComponent } from "../logo-grid/logo-grid.component";
import { TweenLite, Circ } from "gsap";
import { isPlatformBrowser } from '@angular/common';

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
  private largeHeader!: HTMLElement | null;
  private canvas!: HTMLCanvasElement | null;
  private ctx!: CanvasRenderingContext2D | null;
  private points: any[] = [];
  private target: { x: number; y: number };
  private animateHeader = true;
  private isBrowser: boolean;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.width = this.isBrowser ? window.innerWidth : 0;
    this.height = this.isBrowser ? window.innerHeight : 0;
    this.target = { x: this.width / 2, y: this.height / 2 };
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // Skip execution if not in the browser
    this.initHeader();
    this.initAnimation();
    this.addListeners();
  }

  private initHeader(): void {
    this.largeHeader = this.elRef.nativeElement.querySelector('#large-header');
    if (this.largeHeader) {
      this.renderer.setStyle(this.largeHeader, 'height', `${this.height}px`);
    }

    this.canvas = this.elRef.nativeElement.querySelector('#demo-canvas');
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

      // Initialize points
      this.points = [];
      for (let x = 0; x < this.width; x += this.width / 20) {
        for (let y = 0; y < this.height; y += this.height / 20) {
          const px = x + Math.random() * this.width / 20;
          const py = y + Math.random() * this.height / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          this.points.push(p);
        }
      }

      // Find closest points
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

      // Assign circles to points
      this.points.forEach(p => {
        const c = new Circle(p, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        p.circle = c;
      });
    }
  }

  private addListeners(): void {
    if (!this.isBrowser) return;
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
    if (!this.isBrowser) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.largeHeader) {
      this.renderer.setStyle(this.largeHeader, 'height', `${this.height}px`);
    }
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
  }

  private initAnimation(): void {
    this.animate();
    this.points.forEach(p => this.shiftPoint(p));
  }

  private animate(): void {
    if (this.ctx && this.animateHeader) {
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
        p.circle.draw(this.ctx);
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
    if (this.ctx && p.active) {
      p.closest.forEach((closestPoint: any) => {
        this.ctx!.beginPath(); // The `!` ensures TypeScript knows this.ctx is not null
        this.ctx!.moveTo(p.x, p.y);
        this.ctx!.lineTo(closestPoint.x, closestPoint.y);
        this.ctx!.strokeStyle = `rgba(156,217,249,${p.active})`;
        this.ctx!.stroke();
      });
    }
  }

  private getDistance(p1: any, p2: any): number {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
}

// Circle class
class Circle {
  active: number = 0;

  constructor(private pos: any, private radius: number, private color: string) {}

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    ctx.fill();
  }
}
