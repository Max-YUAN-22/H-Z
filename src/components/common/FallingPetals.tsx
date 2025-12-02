"use client";

import React, { useEffect, useRef } from 'react';

// Reusing part of the heart drawing logic from the user's provided 爱心代码.html
const pointOnHeart = (t: number) => {
    return {
        x: 160 * Math.pow(Math.sin(t), 3),
        y: 130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
    };
};

export default function FallingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create an offscreen canvas to draw the heart shape once
    const heartCanvas = document.createElement('canvas');
    const heartCtx = heartCanvas.getContext('2d');
    const heartSize = 30; // Base size for the heart particle
    heartCanvas.width = heartSize;
    heartCanvas.height = heartSize;

    if (heartCtx) {
        heartCtx.beginPath();
        let t = -Math.PI;
        let point = pointOnHeart(t);
        
        // Scale and translate the heart path to fit within heartCanvas
        const scaleFactor = heartSize / 350; // Adjust for heart drawing coordinates
        const offsetX = heartSize / 2;
        const offsetY = heartSize / 2;

        heartCtx.moveTo(offsetX + point.x * scaleFactor, offsetY - point.y * scaleFactor);
        while (t < Math.PI) {
            t += 0.05; // Less precision for faster drawing
            point = pointOnHeart(t);
            heartCtx.lineTo(offsetX + point.x * scaleFactor, offsetY - point.y * scaleFactor);
        }
        heartCtx.closePath();
        heartCtx.fillStyle = '#ffb7c5'; // Sakura color for hearts
        heartCtx.fill();
    }
    
    // Particle settings for hearts
    const heartParticles: HeartParticle[] = [];
    const particleCount = 60; 

    class HeartParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height; // Start above screen
        this.vx = Math.random() * 0.5 - 0.25; // Slight horizontal drift
        this.vy = Math.random() * 1 + 0.5; // Falling speed
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5; // Rotate slowly
        this.size = Math.random() * 0.5 + 0.5; // Scale factor for heart image
        this.opacity = Math.random() * 0.4 + 0.2; // Semi-transparent
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        // Reset if out of bounds
        if (this.y > height + heartSize * this.size || this.x > width + heartSize * this.size || this.x < -heartSize * this.size) {
          this.y = -heartSize * this.size; // Reset to top
          this.x = Math.random() * width;
          this.vy = Math.random() * 1 + 0.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        
        const currentSize = heartSize * this.size;
        ctx.drawImage(heartCanvas, -currentSize / 2, -currentSize / 2, currentSize, currentSize);
        
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      heartParticles.push(new HeartParticle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      heartParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[1]" // z-index above background image but below content
    />
  );
}