'use client';

import React, { useEffect, useRef } from 'react';

export default function ThreeEnvironment() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;

    const loadThree = async () => {
      const THREE = await import('three');

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Accent color
      const accentColor = new THREE.Color(0x00ff94);
      const accentDim = new THREE.Color(0x003322);
      const purpleColor = new THREE.Color(0x3a1a6e);
      const blueColor = new THREE.Color(0x0a1a4e);

      // Dynamic Lights
      const pointLight = new THREE.PointLight(0x00ff94, 2.5, 60);
      scene.add(pointLight);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      // ── Floating geometric objects ──────────────────────────────────────
      interface FloatObject {
        mesh: THREE.Mesh;
        rotSpeed: THREE.Vector3;
        floatSpeed: number;
        floatAmp: number;
        floatOffset: number;
        basePos: THREE.Vector3;
        layer: number;
      }

      const floatObjects: FloatObject[] = [];

      const geometries = [
        new THREE.IcosahedronGeometry(0.6, 0),
        new THREE.OctahedronGeometry(0.7, 0),
        new THREE.TetrahedronGeometry(0.8, 0),
        new THREE.IcosahedronGeometry(0.4, 1),
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.IcosahedronGeometry(0.9, 0),
        new THREE.TetrahedronGeometry(0.5, 0),
        new THREE.OctahedronGeometry(0.35, 0),
        new THREE.IcosahedronGeometry(0.3, 0),
        new THREE.IcosahedronGeometry(1.1, 0),
        new THREE.OctahedronGeometry(0.6, 0),
        new THREE.TetrahedronGeometry(0.65, 0),
      ];

      geometries.forEach((geo, i) => {
        const isAccent = i % 4 === 0;
        const isPurple = i % 4 === 1;
        const isBlue = i % 4 === 2;

        const mat = new THREE.MeshStandardMaterial({
          color: isAccent ? accentColor : isPurple ? purpleColor : isBlue ? blueColor : accentDim,
          emissive: isAccent ? accentColor : 0x000000,
          emissiveIntensity: 0.15,
          wireframe: true,
          transparent: true,
          opacity: isAccent ? 0.7 : 0.3,
          roughness: 0.2,
          metalness: 0.8,
        });

        const mesh = new THREE.Mesh(geo, mat);

        const spread = 28;
        const layer = Math.floor(i / 4);
        const zRange = layer === 0 ? [-5, 5] : layer === 1 ? [-12, -6] : [-20, -13];

        mesh.position.set(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.8,
          zRange[0] + Math.random() * (zRange[1] - zRange[0])
        );

        scene.add(mesh);
        floatObjects.push({
          mesh,
          rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.006
          ),
          floatSpeed: 0.3 + Math.random() * 0.5,
          floatAmp: 0.3 + Math.random() * 0.5,
          floatOffset: Math.random() * Math.PI * 2,
          basePos: mesh.position.clone(),
          layer,
        });
      });

      // ── Liquid Shader Background ──────────────────────────────────────────
      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;

        varying vec2 vUv;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec2 aspectUV = uv;
          aspectUV.x *= u_resolution.x / u_resolution.y;
          
          vec2 mouseAspect = u_mouse;
          mouseAspect.x *= u_resolution.x / u_resolution.y;

          // Liquid wave distortion
          vec2 distortedUv = uv + vec2(
            snoise(uv * 1.5 + u_time * 0.05),
            snoise(uv * 1.5 - u_time * 0.05 + 10.0)
          ) * 0.15;

          // Mouse Ripple Distortion
          float dist = distance(aspectUV, mouseAspect);
          float ripple = sin(dist * 20.0 - u_time * 5.0) * exp(-dist * 4.0);
          
          distortedUv += normalize(aspectUV - mouseAspect + 0.0001) * ripple * 0.02 * step(0.0, 1.0 - dist * 1.5);

          // Base FBM liquid noise mapping
          float noiseVal = snoise(distortedUv * 3.0 + u_time * 0.08);
          noiseVal += 0.5 * snoise(distortedUv * 6.0 - u_time * 0.12);
          noiseVal = noiseVal * 0.5 + 0.5;

          // Cinematic color blending
          vec3 darkBg = vec3(0.04, 0.04, 0.06); // #0A0A0F
          vec3 subtlePurple = vec3(0.25, 0.1, 0.5);
          vec3 neonBlue = vec3(0.0, 0.35, 0.9);
          vec3 neonGreen = vec3(0.0, 0.9, 0.58);

          vec3 color = darkBg;
          color = mix(color, subtlePurple, smoothstep(0.3, 0.7, noiseVal) * 0.5);
          color = mix(color, neonBlue, smoothstep(0.5, 0.85, noiseVal) * 0.35);
          color = mix(color, neonGreen, smoothstep(0.7, 1.0, noiseVal) * 0.25);
          
          // Mouse glow injection
          float glow = exp(-dist * 2.5);
          color += subtlePurple * glow * 0.15;
          color += neonGreen * glow * 0.05 * ripple;

          gl_FragColor = vec4(color, 1.0);
        }
      `;

      const shaderUniforms = {
        u_time: { value: 0.0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      };

      const bgPlaneGeo = new THREE.PlaneGeometry(100, 100);
      const bgPlaneMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: shaderUniforms,
        depthWrite: false,
      });

      const bgPlane = new THREE.Mesh(bgPlaneGeo, bgPlaneMat);
      bgPlane.position.z = -30;
      scene.add(bgPlane);

      // ── Particle field ─────────────────────────────────────────────────
      const particleCount = 1500;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * 80;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * 60;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 40 - 10;

        const rand = Math.random();
        if (rand > 0.8) {
          particleColors[i3] = 0.0; particleColors[i3 + 1] = 1.0; particleColors[i3 + 2] = 0.58; // Green
        } else if (rand > 0.6) {
          particleColors[i3] = 0.4; particleColors[i3 + 1] = 0.1; particleColors[i3 + 2] = 0.8; // Purple
        } else if (rand > 0.4) {
          particleColors[i3] = 0.0; particleColors[i3 + 1] = 0.5; particleColors[i3 + 2] = 1.0; // Blue
        } else {
          particleColors[i3] = 0.8; particleColors[i3 + 1] = 0.8; particleColors[i3 + 2] = 0.8; // Whiteish
        }

        particleSizes[i] = Math.random() * 2.0 + 0.5;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

      const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // ── Connection lines between nearby objects ────────────────────────
      const lineMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.04,
      });

      const lineGroup = new THREE.Group();
      scene.add(lineGroup);

      const updateLines = () => {
        lineGroup.clear();
        const frontObjects = floatObjects.filter((o) => o.layer === 0);
        for (let i = 0; i < frontObjects.length; i++) {
          for (let j = i + 1; j < frontObjects.length; j++) {
            const dist = frontObjects[i].mesh.position.distanceTo(frontObjects[j].mesh.position);
            if (dist < 14) {
              const lineGeo = new THREE.BufferGeometry().setFromPoints([
                frontObjects[i].mesh.position.clone(),
                frontObjects[j].mesh.position.clone(),
              ]);
              const line = new THREE.Line(lineGeo, lineMat);
              lineGroup.add(line);
            }
          }
        }
      };

      // ── Resize ─────────────────────────────────────────────────────────
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        shaderUniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // ── Mouse ──────────────────────────────────────────────────────────
      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // ── Scroll ─────────────────────────────────────────────────────────
      const handleScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      // ── Animation loop ─────────────────────────────────────────────────
      let frame = 0;
      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        frame++;

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        const t = frame * 0.01;

        // Dynamic light follows mouse
        pointLight.position.x = mouseX * 25;
        pointLight.position.y = mouseY * 15;
        pointLight.position.z = 15;
        pointLight.intensity = 2.5 + Math.sin(t * 3) * 0.5;

        // Camera parallax from mouse
        camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.03;
        camera.position.z = 30 - scrollY * 0.005;
        camera.lookAt(scene.position);

        // Animate floating objects
        floatObjects.forEach((obj) => {
          obj.mesh.rotation.x += obj.rotSpeed.x;
          obj.mesh.rotation.y += obj.rotSpeed.y;
          obj.mesh.rotation.z += obj.rotSpeed.z;

          // Floating motion
          const floatY = Math.sin(t * obj.floatSpeed + obj.floatOffset) * obj.floatAmp;
          const floatX = Math.cos(t * obj.floatSpeed * 0.7 + obj.floatOffset) * obj.floatAmp * 0.5;
          obj.mesh.position.y = obj.basePos.y + floatY;
          obj.mesh.position.x = obj.basePos.x + floatX;

          // Mouse parallax by layer
          const layerStrength = [0.8, 0.4, 0.15][obj.layer] || 0.1;
          obj.mesh.position.x += mouseX * layerStrength * 0.5;
          obj.mesh.position.y += mouseY * layerStrength * 0.3;
        });

        // Update Shader Uniforms
        shaderUniforms.u_time.value = t;
        // Mouse normalized for shader (0 to 1) from [-1, 1] targetMouseX/Y
        shaderUniforms.u_mouse.value.x = mouseX * 0.5 + 0.5;
        shaderUniforms.u_mouse.value.y = mouseY * 0.5 + 0.5;

        // Rotate particle field
        particles.rotation.y += 0.0002;
        particles.rotation.x += 0.0001;

        // Update connection lines every 30 frames
        if (frame % 30 === 0) updateLines();

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    loadThree().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 1.0,
      }}
    />
  );
}
