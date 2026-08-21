
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
    gsap.to(".retangulos div", {
        y: 0,
        stagger: .08,
        scrollTrigger: {
            trigger: ".transicao",
            markers: true,
            scrub: 3,
            start: "0% 0%",
            pin: true,
            
        }
    })
});



