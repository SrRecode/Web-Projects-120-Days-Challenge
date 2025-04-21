gsap.to('.imagecontainer',{
    ease: Expo.easeInOut,
    width: '100%',
    duration:2,
    stagger:2
})
gsap.to('.text h1',{
    duration:2,
    top:0,
    ease: Expo.easeInOut,
    stagger:2
})

gsap.to('.text h1',{
    delay:2,
    duration:2,
    top: '-100%',
    ease: Expo.easeInOut,
    stagger:2
})