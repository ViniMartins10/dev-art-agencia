import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText
);


window.addEventListener("load", () => {

  /* ===============================
     VERIFICA SE É MOBILE
  ================================ */

  const mobile = window.matchMedia(
    "(max-width: 768px)"
  ).matches;


  /* ===============================
     VÍDEOS
  ================================ */

  const video = document.querySelector(".videohero");
  const videofooter = document.querySelector(".videofooter");

  video.src = "img/video-hero.mp4";
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;

  videofooter.src = "img/video-footer.mp4";
  videofooter.autoplay = true;
  videofooter.loop = true;
  videofooter.muted = true;
  videofooter.playsInline = true;


  /* ==========================================================
     PRIMEIRA TRANSIÇÃO
  ========================================================== */

  const linhadotempo = gsap.timeline({

    scrollTrigger: {

      trigger: ".transicao",

      markers: false,

      scrub: 3,

      start: "top top",

      end: mobile
        ? "+=2000"
        : "+=3000",

      pin: true

    }

  });


  /* RETÂNGULOS DESCEM */

  linhadotempo.to(
    ".retangulos div",
    {
      y: 0,
      stagger: 0.2,
      duration: 4
    }
  );


  /* SEÇÃO 2 APARECE */

  linhadotempo.to(
    ".secao2",
    {
      opacity: 1,
      duration: 0.1
    }
  );


  /* ===============================
     TEXTO SEÇÃO 2
  ================================ */

  const split = new SplitText(
    ".secao2 h2",
    {
      types: "lines, words, chars",
      mask: "lines"
    }
  );


  linhadotempo.from(
    split.chars,
    {
      y: mobile ? 60 : 100,
      stagger: 0.08,
      duration: 1
    }
  );


  /* ==========================================================
     SEGUNDA TRANSIÇÃO
  ========================================================== */

  const linhaDoTempo2 = gsap.timeline({

    scrollTrigger: {

      trigger: ".transicao2",

      markers: false,

      start: "top top",

      scrub: 2,

      end: mobile
        ? "+=2800"
        : "+=4000",

      pin: true

    }

  });


  /* ===============================
     TEXTOS SEÇÃO 4
  ================================ */

  const textoSecao4 =
    document.querySelectorAll(".secao4 h2");


  textoSecao4.forEach((texto) => {

    const split2 =
      new SplitText(
        texto,
        {
          types: "chars"
        }
      );


    /* TEXTO APARECE */

    linhaDoTempo2.from(
      split2.chars,
      {
        opacity: 0,

        filter: mobile
          ? "blur(10px)"
          : "blur(20px)",

        stagger: {
          each: mobile
            ? 0.1
            : 0.2,

          from: "random"
        },

        duration: 1
      }
    );


    /* TEXTO SOME */

    linhaDoTempo2.to(
      split2.chars,
      {
        opacity: 0,

        stagger: {
          each: mobile
            ? 0.1
            : 0.2,

          from: "random"
        },

        duration: 1

      },

      "+=1"

    );

  });


  /* ==========================================================
     THREE.JS
  ========================================================== */


  /* ===============================
     CENA
  ================================ */

  const cena =
    new THREE.Scene();


  /* ===============================
     CAMERA
  ================================ */

  const camera =
    new THREE.PerspectiveCamera(

      mobile
        ? 50
        : 40,

      window.innerWidth /
      window.innerHeight,

      0.1,

      1000

    );


  camera.position.z =
    mobile
      ? 6
      : 4;


  /* ===============================
     RENDERER
  ================================ */

  const renderer =
    new THREE.WebGLRenderer({

      alpha: true,

      antialias: true

    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );


  /* ===============================
     DIV DO DIAMANTE
  ================================ */

  const divDiamante =
    document.querySelector(
      ".divDiamante"
    );


  divDiamante.appendChild(
    renderer.domElement
  );


  /* ==========================================================
     CARREGANDO DIAMANTE
  ========================================================== */

  let diamante = null;


  const gltfLoader =
    new GLTFLoader();


  gltfLoader.load(

    "img/diamond-compressed.glb",

    (objeto) => {

      diamante =
        objeto.scene;


      /* POSIÇÃO INICIAL */

      diamante.position.z =
        mobile
          ? -8
          : -10;


      diamante.position.y =
        mobile
          ? 1.3
          : 2;


      /* TAMANHO MOBILE */

      if (mobile) {

        diamante.scale.set(
          0.7,
          0.7,
          0.7
        );

      }


      cena.add(diamante);


      /* ======================================================
         ANIMAÇÃO DO DIAMANTE
      ====================================================== */

      const linhadoTempo3 =
        gsap.timeline({

          scrollTrigger: {

            trigger:
              ".transicao2",

            start:
              "top top",

            scrub: 2,

            end: mobile
              ? "+=2800"
              : "+=4000"

          }

        });


      /* DIAMANTE SOBE */

      linhadoTempo3.to(
        diamante.position,
        {

          y: 0,

          duration: 2

        }
      );


      /* DIAMANTE GIRA NO EIXO X */

      linhadoTempo3.to(
        diamante.rotation,
        {

          x: 4.7,

          duration: 2

        },

        "<"

      );


      /* =========================
         DIAMANTE VEM PARA FRENTE
      ========================== */

      linhadoTempo3.to(
        diamante.position,
        {

          z: mobile
            ? 1.5
            : 3.2,

          duration: 0.3

        }
      );


      /* =========================
         FOOTER APARECE
      ========================== */

      linhadoTempo3.to(
        "footer",
        {

          opacity: 1,

          duration: 0.3

        }
      );


      ScrollTrigger.refresh();

    },

    undefined,

    (erro) => {

      console.error(
        "Erro ao carregar o diamante:",
        erro
      );

    }

  );


  /* ==========================================================
     TEXTURA DO DIAMANTE
  ========================================================== */

  const txtLoader =
    new THREE.TextureLoader();


  txtLoader.load(

    "img/hdri.webp",

    (textura) => {

      textura.mapping =
        THREE
          .EquirectangularReflectionMapping;


      const pmrem =
        new THREE
          .PMREMGenerator(
            renderer
          );


      const ambiente =
        pmrem
          .fromEquirectangular(
            textura
          )
          .texture;


      cena.environment =
        ambiente;


      textura.dispose();

      pmrem.dispose();

    }

  );


  /* ==========================================================
     RESIZE
  ========================================================== */

  function atualizarTamanho() {

    const largura =
      window.innerWidth;


    const altura =
      window.innerHeight;


    camera.aspect =
      largura / altura;


    camera.updateProjectionMatrix();


    renderer.setSize(
      largura,
      altura
    );


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

  }


  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            atualizarTamanho();

            ScrollTrigger.refresh();

          },

          150

        );

    }
  );


  /* ==========================================================
     LOOP THREE.JS
  ========================================================== */

  function animar() {

    if (diamante !== null) {

      diamante.rotation.y +=
        0.01;

    }


    renderer.render(
      cena,
      camera
    );


    requestAnimationFrame(
      animar
    );

  }


  animar();


  /* ===============================
     REFRESH FINAL
  ================================ */

  ScrollTrigger.refresh();

});