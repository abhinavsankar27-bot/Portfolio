'use client';

import React, { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId: number;
    let startTime = Date.now();
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let mouseVelX = 0;
    let mouseVelY = 0;
    let prevTargetX = 0.5;
    let prevTargetY = 0.5;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = 1.0 - e.clientY / window.innerHeight;
      mouseVelX = nx - prevTargetX;
      mouseVelY = ny - prevTargetY;
      prevTargetX = nx;
      prevTargetY = ny;
      targetMouseX = nx;
      targetMouseY = ny;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec2 u_mouse_vel;

      #define PI 3.14159265359
      #define TAU 6.28318530718

      // Hash function
      vec2 hash2(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      // Gradient noise
      float gnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
              dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
          mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
              dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y
        );
      }

      // Domain-warped fbm
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 6; i++) {
          v += a * gnoise(p);
          p = rot * p * 2.1 + vec2(1.7, 9.2);
          a *= 0.5;
        }
        return v;
      }

      // Domain warp
      float warpedFbm(vec2 p, float t) {
        vec2 q = vec2(
          fbm(p + vec2(0.0, 0.0) + t * 0.08),
          fbm(p + vec2(5.2, 1.3) + t * 0.06)
        );
        vec2 r = vec2(
          fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.04),
          fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.03)
        );
        return fbm(p + 4.0 * r);
      }

      // Volumetric light ray
      float lightRay(vec2 uv, vec2 origin, float angle, float width) {
        vec2 dir = vec2(cos(angle), sin(angle));
        float proj = dot(uv - origin, dir);
        vec2 perp = uv - origin - proj * dir;
        float d = length(perp);
        float falloff = exp(-proj * proj * 0.3) * step(0.0, proj);
        return smoothstep(width, 0.0, d) * falloff;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse;
        vec2 vel = u_mouse_vel;
        float t = u_time;

        // Aspect-corrected UV
        vec2 uvAspect = uv;
        uvAspect.x *= u_resolution.x / u_resolution.y;

        // Mouse influence field
        vec2 mouseOffset = uv - mouse;
        float mouseDist = length(mouseOffset);
        float mouseField = smoothstep(0.7, 0.0, mouseDist);

        // Velocity-based distortion
        float velMag = length(vel) * 8.0;
        vec2 distortDir = normalize(vel + vec2(0.001));
        vec2 distUV = uv + distortDir * velMag * 0.015 * mouseField;

        // Domain-warped noise
        float warp = warpedFbm(distUV * 2.0 + vec2(t * 0.05, t * 0.03), t);
        float warp2 = warpedFbm(distUV * 1.5 - vec2(t * 0.04, t * 0.02) + 3.7, t);

        // Wave layers
        float wave1 = fbm(distUV * 2.5 + t * 0.10 + mouse * 0.3);
        float wave2 = fbm(distUV * 1.8 - t * 0.07 + 1.7 + mouse * 0.2);
        float wave3 = fbm(distUV * 3.5 + t * 0.05 + 3.3);

        float combined = warp * 0.4 + wave1 * 0.3 + wave2 * 0.2 + wave3 * 0.1;

        // Aurora bands
        float aurora = 0.0;
        for (int i = 0; i < 3; i++) {
          float fi = float(i);
          float band = sin(uv.x * (3.0 + fi * 1.5) + t * (0.3 + fi * 0.1) + warp * 2.0) * 0.5 + 0.5;
          band *= smoothstep(0.3, 0.7, uv.y + sin(uv.x * 2.0 + t * 0.2 + fi) * 0.1);
          band *= smoothstep(0.9, 0.6, uv.y);
          aurora += band * (0.04 - fi * 0.01);
        }

        // Volumetric light rays from mouse
        float rays = 0.0;
        rays += lightRay(uv, mouse, PI * 0.25 + t * 0.05, 0.04) * 0.03;
        rays += lightRay(uv, mouse, PI * 0.75 - t * 0.04, 0.06) * 0.02;
        rays += lightRay(uv, mouse, PI * 1.5 + t * 0.03, 0.05) * 0.025;

        // Color palette — deep cinematic
        vec3 colBase   = vec3(0.039, 0.039, 0.059);  // #0A0A0F
        vec3 colDeep   = vec3(0.04, 0.05, 0.11);     // deep blue
        vec3 colGreen  = vec3(0.0, 0.07, 0.045);     // subtle green
        vec3 colPurple = vec3(0.07, 0.03, 0.13);     // deep purple
        vec3 colCyan   = vec3(0.0, 0.09, 0.09);      // teal hint
        vec3 colAurora = vec3(0.0, 0.25, 0.15);      // aurora green

        vec3 color = mix(colBase, colDeep, wave1 * 0.7 + warp * 0.3);
        color = mix(color, colGreen, wave2 * 0.35 * combined);
        color = mix(color, colPurple, wave3 * 0.25 * (1.0 - combined));
        color = mix(color, colCyan, warp2 * 0.2);

        // Aurora contribution
        color += colAurora * aurora;

        // Volumetric rays
        color += vec3(0.0, rays * 0.8, rays * 0.5);

        // Mouse glow — chromatic
        float glow = smoothstep(0.55, 0.0, mouseDist) * 0.08;
        float glowR = smoothstep(0.5, 0.0, length(mouseOffset + vec2(0.01, 0.0))) * 0.03;
        float glowB = smoothstep(0.5, 0.0, length(mouseOffset - vec2(0.01, 0.0))) * 0.03;
        color += vec3(glowR, glow, glow * 0.5 + glowB);

        // Velocity streak
        float streak = exp(-mouseDist * 4.0) * velMag * 0.15;
        color += vec3(0.0, streak * 0.6, streak * 0.3);

        // Vignette
        vec2 vigUV = uv * 2.0 - 1.0;
        float vignette = 1.0 - dot(vigUV * 0.55, vigUV * 0.55);
        vignette = clamp(vignette, 0.0, 1.0);
        color *= vignette * 0.75 + 0.25;

        // Subtle scanline
        float scanline = sin(gl_FragCoord.y * 1.5) * 0.5 + 0.5;
        color *= 0.995 + scanline * 0.005;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uMouseVel = gl.getUniformLocation(program, 'u_mouse_vel');

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      mouseVelX *= 0.85;
      mouseVelY *= 0.85;

      const elapsed = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform2f(uMouseVel, mouseVelX, mouseVelY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  );
}
