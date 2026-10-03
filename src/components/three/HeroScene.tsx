"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const WARM_TONES = [0xd9bd8e, 0xa3703c, 0x7a4e26, 0x6b7360, 0xf7f3ec];

export function HeroScene({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const meshes: { mesh: THREE.Mesh; phase: number; speed: number; radius: number }[] = [];

    const COUNT = 16;
    for (let i = 0; i < COUNT; i++) {
      const color = WARM_TONES[i % WARM_TONES.length];
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const scale = 0.6 + Math.random() * 2.2;
      mesh.scale.setScalar(scale);
      mesh.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 12 - 4
      );
      group.add(mesh);
      meshes.push({
        mesh,
        phase: Math.random() * Math.PI * 2,
        speed: 0.08 + Math.random() * 0.12,
        radius: 0.4 + Math.random() * 0.6,
      });
    }

    function handleResize() {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", handlePointerMove);

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    const clock = new THREE.Clock();

    function tick() {
      const t = clock.getElapsedTime();

      if (!reduceMotion) {
        meshes.forEach(({ mesh, phase, speed, radius }) => {
          mesh.position.x += Math.sin(t * speed + phase) * 0.0025 * radius;
          mesh.position.y += Math.cos(t * speed * 0.8 + phase) * 0.0022 * radius;
          mesh.rotation.x += 0.0008;
          mesh.rotation.y += 0.0012;
        });

        targetX += (mouseRef.current.x * 1.4 - targetX) * 0.04;
        targetY += (-mouseRef.current.y * 1.0 - targetY) * 0.04;
        group.position.x = targetX;
        group.position.y = targetY;
        group.rotation.y = targetX * 0.05;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      meshes.forEach(({ mesh }) => (mesh.material as THREE.Material).dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
