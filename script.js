import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);


window.addEventListener("load", ()=>{

   

    const video = document.querySelector(".videohero");
    const videofooter = document.querySelector(".videofooter");
    console.log(videofooter)


    video.src = "img/video-hero.mp4";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;

    videofooter.src = "img/video-footer.mp4";
    videofooter.autoplay = true;
    videofooter.loop = true;
    videofooter.muted = true;

    //Quando rola a pagina cada retangulo desce
    //linha do tempo
    
    const linhadotempo = gsap.timeline({
        scrollTrigger: {
            trigger: ".transicao",
            markers:false,
            scrub: 3,
            start: "0% 0%",
            end: "+=3000",
            pin: true,
        },
    });
    
    linhadotempo.to(".retangulos div", {
        y: 0,
        stagger: 0.2,
        duration: 4
    });

    linhadotempo.to(".secao2",{
        opacity: 1,
        duration: 0.1
    });
    const split = new SplitText(".secao2 h2", {
        types: "lines, words, chars",
        mask: "lines"
    });  
    linhadotempo.from(split.chars,{
        y:100,
        stagger: .08,
        duration: 1
    });

    //ANIMAÇÕES TEXTOS SURGINDO
   const linhaDoTempo2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".secao4",
            markers: true,
            scrub: 2, //começa a animação quando o elemento entra na tela e termina quando sai da tela
             end: "+=4000",
            pin: true, // deixa a pagina travada em quanto a animação estiver acontecendo

        }
   }) 
   
    // linhaDoTempo2.to(".secao4 h2:nth-child(1)", {
    //     opacity: 1,
    // });
    // linhaDoTempo2.to(".secao4 h2:nth-child(1)", {
    //     opacity: 0,
    // });

    // linhaDoTempo2.to(".secao4 h2:nth-child(2)", {
    //     opacity: 1,
    // });
    // linhaDoTempo2.to(".secao4 h2:nth-child(2)", {
    //     opacity: 0,
    // });

    // linhaDoTempo2.to(".secao4 h2:nth-child(3)", {
    //     opacity: 1,
    // });
    // linhaDoTempo2.to(".secao4 h2:nth-child(3)", {
    //     opacity: 0,
    // }); FORMA BRUTA QUE FUNCIONA

    const textoSecao4 = document.querySelectorAll(".secao4 h2"); // vai pegar todos os elementos h2 dentro da secao4
    textoSecao4.forEach((texto) => {
        const split2 = new SplitText(texto, {
            types: "chars"
        })
        linhaDoTempo2.from(split2.chars, {
            opacity: 0,
            filter: "blur(20px)",
            stagger: {
                each: .2,
                from: "random"
            }
        })
        linhaDoTempo2.to(split2.chars, {
            opacity: 0,
            stagger: {
                each: .2,
                from: "random"
            }
        }, "+=2") // vai começar a animação de saída 0.5 segundos depois da animação de entrada terminar
    }); // vai percorrer todos os elementos h2


    //começando o codigo three.js
    //cena
    const cena = new THREE.Scene();//instanciando o objeto
    //camera(fov (angulo de visão da camera), aspect(largura, altura / tamanho da tela), near, far)
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4; // vai posicionar a camera para trás da cena, para que possamos ver os objetos
    //renderizador (tela de que tamanho vai ser renderizada a cena, antialias (suaviza as bordas), alpha (transparencia))
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight); // vai setar o tamanho do renderizador para o tamanho da tela
    const divDiamante = document.querySelector(".divDiamante"); // vai pegar a div que vai projetar o 3D 
    divDiamante.appendChild(renderer.domElement); // vai adicionar o renderizador na div, como se tivesse adicionando alguma coisa na div lá no html

    //inserir o objeto 3D
    const gltfLoader = new GLTFLoader(); // vai carregar o objeto 3D
    gltfLoader.load("img/diamond-compressed.glb",(objeto) =>{
        const diamante = objeto.scene
        cena.add(diamante); // vai adicionar o objeto 3D na cena
    }); 
    renderer.render(cena, camera); // vai renderizar a cena e a camera
});



