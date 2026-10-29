"use client";

import { useEffect, useRef, useState } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormalApprox;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wavePrimary = sin(pos.x * 0.62 + uTime * 0.32 + uPointer.x * 0.9) * 0.28;
    float waveSecondary = cos(pos.y * 0.85 - uTime * 0.24 + uPointer.y * 0.7) * 0.22;
    float ridge = sin((pos.x * 0.45 + pos.y * 0.55) + uTime * 0.18) * 0.16;

    pos.z += wavePrimary + waveSecondary + ridge;
    vElevation = pos.z;

    float dx = 0.62 * cos(pos.x * 0.62 + uTime * 0.32 + uPointer.x * 0.9) * 0.28;
    float dy = -0.85 * sin(pos.y * 0.85 - uTime * 0.24 + uPointer.y * 0.7) * 0.22;
    vNormalApprox = normalize(vec3(-dx, -dy, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uBaseColor;
  uniform vec3 uChampagne;
  uniform vec3 uDaylight;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormalApprox;

  void main() {
    vec3 lightDirA = normalize(vec3(uPointer.x * 0.85 + 0.25, uPointer.y * 0.75 + 0.45, 0.92));
    vec3 lightDirB = normalize(vec3(-uPointer.x * 0.55 - 0.35, 0.55 - uPointer.y * 0.4, 0.88));
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));

    vec3 halfA = normalize(lightDirA + viewDir);
    vec3 halfB = normalize(lightDirB + viewDir);

    float specChampagne = pow(max(dot(vNormalApprox, halfA), 0.0), 42.0);
    float specDaylight = pow(max(dot(vNormalApprox, halfB), 0.0), 76.0);

    float studioBand = smoothstep(
      0.032,
      0.0,
      abs(sin((vUv.x * 2.4 - vUv.y * 1.35) + uPointer.x * 0.55 + uTime * 0.09) - 0.72)
    );

    vec3 color = uBaseColor;
    color += uChampagne * (specChampagne * 0.34 + studioBand * 0.09);
    color += uDaylight * (specDaylight * 0.22 + max(vElevation, 0.0) * 0.05);

    float vignette = smoothstep(0.0, 0.28, vUv.x)
      * smoothstep(1.0, 0.68, vUv.x)
      * smoothstep(0.0, 0.25, vUv.y)
      * smoothstep(1.0, 0.65, vUv.y);

    float alpha = clamp((specChampagne * 0.55 + specDaylight * 0.4 + studioBand * 0.22 + 0.08) * vignette, 0.0, 0.72);
    gl_FragColor = vec4(color, alpha);
  }
`;

interface ContentVisibilityEvent extends Event {
  skipped?: boolean;
}

export default function HeroSpecularCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallbackOnly, setFallbackOnly] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      const frame = requestAnimationFrame(() => setFallbackOnly(true));
      return () => cancelAnimationFrame(frame);
    }

    const isMobile = window.innerWidth < 768;
    let renderer: WebGLRenderer;

    try {
      renderer = new WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      const frame = requestAnimationFrame(() => setFallbackOnly(true));
      return () => cancelAnimationFrame(frame);
    }

    const maxDpr = isMobile ? 1.25 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 640;
    renderer.setSize(width, height, false);
    renderer.domElement.className = "h-full w-full block pointer-events-none";
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, width / Math.max(height, 1), 0.1, 30);
    camera.position.set(0, -1.35, 5.2);
    camera.lookAt(0, 0, 0);

    const segX = isMobile ? 36 : 72;
    const segY = isMobile ? 24 : 48;
    const planeGeometry = new PlaneGeometry(11.5, 6.8, segX, segY);

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0.15, 0.1) },
      uBaseColor: { value: new Color("#0B0C0E") },
      uChampagne: { value: new Color("#C5A880") },
      uDaylight: { value: new Color("#F4F4F5") },
    };

    const planeMaterial = new ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const clearcoatMesh = new Mesh(planeGeometry, planeMaterial);
    clearcoatMesh.rotation.x = -0.46;
    clearcoatMesh.position.set(0.55, 0.15, 0);
    scene.add(clearcoatMesh);

    const particleCount = isMobile ? 14 : 34;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.6;
      positions[i * 3 + 2] = 0.35 + Math.random() * 1.6;
      speeds[i] = 0.002 + Math.random() * 0.0035;
    }

    const particleGeometry = new BufferGeometry();
    const posAttribute = new BufferAttribute(positions, 3);
    particleGeometry.setAttribute("position", posAttribute);

    const particleMaterial = new ShaderMaterial({
      uniforms: {
        uColor: { value: new Color("#DFCEB7") },
        uPointSize: { value: isMobile ? 4.5 : 6.0 },
      },
      vertexShader: `
        uniform float uPointSize;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uPointSize * (4.5 / max(-mvPosition.z, 1.0));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.08, dist) * 0.28;
          if (alpha <= 0.005) discard;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const particles = new Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const targetPointer = new Vector2(0.15, 0.1);
    let rafId: number | null = null;
    let isInViewport = true;
    let isSkippedByBrowser = false;
    let isDocumentVisible = !document.hidden;
    let previousTimestamp = performance.now();

    const shouldAnimate = () =>
      isInViewport && !isSkippedByBrowser && isDocumentVisible && !reducedMotionQuery.matches;

    const renderLoop = (now: number) => {
      if (!shouldAnimate()) {
        rafId = null;
        return;
      }

      const delta = Math.min((now - previousTimestamp) * 0.001, 0.05);
      previousTimestamp = now;

      uniforms.uTime.value += delta;
      uniforms.uPointer.value.lerp(targetPointer, 0.055);

      const array = posAttribute.array as Float32Array;
      for (let i = 0; i < particleCount; i += 1) {
        array[i * 3 + 1] += speeds[i];
        if (array[i * 3 + 1] > 2.4) {
          array[i * 3 + 1] = -2.4;
        }
      }
      posAttribute.needsUpdate = true;

      particles.rotation.y = uniforms.uPointer.value.x * 0.08;
      particles.rotation.x = -uniforms.uPointer.value.y * 0.05;

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderLoop);
    };

    const syncAnimationState = () => {
      if (shouldAnimate() && rafId === null) {
        previousTimestamp = performance.now();
        rafId = window.requestAnimationFrame(renderLoop);
      } else if (!shouldAnimate() && rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      targetPointer.set(nx, ny);
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      syncAnimationState();
    };

    const handleContentVisibility = (event: Event) => {
      const cvEvent = event as ContentVisibilityEvent;
      isSkippedByBrowser = Boolean(cvEvent.skipped);
      syncAnimationState();
    };

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        setFallbackOnly(true);
      }
      syncAnimationState();
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isInViewport = entry.isIntersecting;
          syncAnimationState();
        }
      },
      { rootMargin: "120px" }
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const nextW = Math.max(entry.contentRect.width, 1);
      const nextH = Math.max(entry.contentRect.height, 1);
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH, false);
    });
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    container.addEventListener("contentvisibilityautostatechange", handleContentVisibility);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    syncAnimationState();

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("contentvisibilityautostatechange", handleContentVisibility);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);

      scene.remove(clearcoatMesh);
      scene.remove(particles);
      planeGeometry.dispose();
      planeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          fallbackOnly ? "opacity-100" : "opacity-65"
        }`}
        style={{
          background:
            "radial-gradient(62% 48% at 72% 28%, rgba(197, 168, 128, 0.11) 0%, rgba(244, 244, 245, 0.03) 38%, rgba(11, 12, 14, 0) 76%)",
        }}
      />
    </div>
  );
}
