"use client";

import { useEffect, useRef } from "react";

type Particle = {
  baseX: number;
  baseY: number;
  brightness: number;
  phase: number;
  freq: number;
  jitter: number;
  twinkleSpeed: number;
  size: number;
};

type ParticleFaceProps = {
  src?: string;
  background?: string;
  className?: string;
  sampleStep?: number;
  cyanThreshold?: number;
  brightnessThreshold?: number;
  densityRadius?: number;
  densityMin?: number;
  /** Center X of the face region, in [0,1] of source image */
  faceCx?: number;
  /** Center Y of the face region, in [0,1] of source image */
  faceCy?: number;
  /** Horizontal radius of face mask, in [0,1] of source width */
  faceRx?: number;
  /** Vertical radius of face mask, in [0,1] of source height */
  faceRy?: number;
};

export default function ParticleFace({
  src = "/face-source.jpg",
  background = "#03080e",
  className = "block h-full w-full",
  sampleStep = 2,
  cyanThreshold = 10,
  brightnessThreshold = 42,
  densityRadius = 3,
  densityMin = 14,
  faceCx = 0.5,
  faceCy = 0.5,
  faceRx = 0.42,
  faceRy = 0.46,
}: ParticleFaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let imgW = 0;
    let imgH = 0;
    let rafId = 0;
    let alive = true;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const samplePixels = (img: HTMLImageElement) => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      const tmp = document.createElement("canvas");
      tmp.width = imgW;
      tmp.height = imgH;
      const tctx = tmp.getContext("2d", { willReadFrequently: true });
      if (!tctx) return [];
      tctx.drawImage(img, 0, 0);
      const data = tctx.getImageData(0, 0, imgW, imgH).data;

      // Face ellipse mask — drop HUD lines & orbital rings outside the head.
      const fx = faceCx * imgW;
      const fy = faceCy * imgH;
      const frx = faceRx * imgW;
      const fry = faceRy * imgH;

      const mask = new Uint8Array(imgW * imgH);
      for (let y = 0; y < imgH; y++) {
        const ny = (y - fy) / fry;
        for (let x = 0; x < imgW; x++) {
          const nx = (x - fx) / frx;
          if (nx * nx + ny * ny > 1) continue; // outside face ellipse
          const i = (y * imgW + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const cyan = (g + b) * 0.5 - r;
          const brightness = (r + g + b) / 3;
          if (cyan > cyanThreshold && brightness > brightnessThreshold) {
            mask[y * imgW + x] = 1;
          }
        }
      }

      const r = densityRadius;
      const list: Particle[] = [];
      for (let y = 0; y < imgH; y += sampleStep) {
        for (let x = 0; x < imgW; x += sampleStep) {
          if (!mask[y * imgW + x]) continue;
          if (x < r || y < r || x >= imgW - r || y >= imgH - r) continue;

          let count = 0;
          for (let dy = -r; dy <= r; dy++) {
            const row = (y + dy) * imgW;
            for (let dx = -r; dx <= r; dx++) {
              count += mask[row + x + dx];
            }
          }
          if (count < densityMin) continue;

          const i = (y * imgW + x) * 4;
          const brightness =
            (data[i] + data[i + 1] + data[i + 2]) / (3 * 255);
          // Boost low-brightness pixels so they still render visibly.
          const b01 = Math.min(1, 0.35 + brightness * 0.85);

          list.push({
            baseX: x,
            baseY: y,
            brightness: b01,
            phase: Math.random() * Math.PI * 2,
            freq: 0.6 + Math.random() * 1.4,
            jitter: 0.4 + Math.random() * 1.0,
            twinkleSpeed: 0.8 + Math.random() * 2.0,
            size: b01 > 0.75 ? 2.0 : 1.6,
          });
        }
      }
      return list;
    };

    const draw = (t: number) => {
      if (!alive) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      if (particles.length && imgW && imgH) {
        const margin = 32;
        const fit = Math.min((w - margin) / imgW, (h - margin) / imgH);
        const drawW = imgW * fit;
        const drawH = imgH * fit;
        const offX = (w - drawW) / 2;
        const offY = (h - drawH) / 2;

        const ts = t * 0.001;
        const breath = 1 + Math.sin(ts * 0.7) * 0.006;
        const sway = Math.sin(ts * 0.35) * 3 * fit;
        const tilt = Math.sin(ts * 0.22) * 0.004;

        ctx.globalCompositeOperation = "lighter";
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const ph = p.phase + ts * p.freq;
          const jx = Math.sin(ph * 1.7) * p.jitter;
          const jy = Math.cos(ph * 1.3) * p.jitter;

          const cx = p.baseX - imgW * 0.5;
          const cy = p.baseY - imgH * 0.5;
          const rx = cx * Math.cos(tilt) - cy * Math.sin(tilt) * 0.05;
          const ry = cy + cx * tilt * 0.04;

          const x = offX + (rx + imgW * 0.5) * fit * breath + jx + sway;
          const y = offY + (ry + imgH * 0.5) * fit * breath + jy;

          const twinkle = 0.55 + 0.45 * Math.sin(ph * p.twinkleSpeed);
          const alpha = Math.min(1, p.brightness * twinkle);

          const rC = 60 + p.brightness * 90;
          const gC = 200 + p.brightness * 55;
          const bC = 220 + p.brightness * 35;

          ctx.fillStyle = `rgba(${rC | 0}, ${gC | 0}, ${bC | 0}, ${alpha.toFixed(3)})`;
          ctx.fillRect(x, y, p.size, p.size);
        }
        ctx.globalCompositeOperation = "source-over";
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.onload = () => {
      particles = samplePixels(img);
      rafId = requestAnimationFrame(draw);
    };
    img.src = src;

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [
    src,
    background,
    sampleStep,
    cyanThreshold,
    brightnessThreshold,
    densityRadius,
    densityMin,
  ]);

  return <canvas ref={canvasRef} className={className} />;
}
