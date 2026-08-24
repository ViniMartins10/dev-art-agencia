
window.addEventListener("load", ()=>{

    gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

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
            markers: true,
            scrub: 3,
            start: "0% 0%",
            end: "+=3000",
            pin: true,
        },
});
    
    linhadotempo.to(".retangulos div", {
        y: 0,
        stagger: .2,
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
});



