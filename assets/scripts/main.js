SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime    : 1600,
    // Размер шага в пикселях 
    stepSize         :105,

    // Дополнительные настройки:
    
    // Ускорение 
    accelerationDelta : 50,  
    // Максимальное ускорение
    accelerationMax   : 5,   

    // Поддержка клавиатуры
    keyboardSupport   : true,  
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll       : 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Поддержка тачпада
    touchpadSupport   : true,
})


var magnets = document.querySelectorAll('.magnetic')
    var strength = 50
    
    magnets.forEach( (magnet) => {
      magnet.addEventListener('mousemove', moveMagnet );
      magnet.addEventListener('mouseout', function(event) {
        TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
      } );
    });
    
    function moveMagnet(event) {
      var magnetButton = event.currentTarget
      var bounding = magnetButton.getBoundingClientRect()
    
    
      gsap.to( magnetButton, 1, {
        x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
        y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
        ease: Power4.easeOut
      })
    }
    
    let cursorInit = !1;
    const cursor = document.getElementById("ink-cursor"),
        amount = 20,
        sineDots = Math.floor(.3 * amount),
        width = 22,
        idleTimeout = 150;
    let timeoutID, hoverButton, hoverTL, lastFrame = 0,
        mousePosition = {
            x: 0,
            y: 0
        },
        dots = [],
        idle = !1;
    class HoverButton {
        constructor(e) {
            this.hovered = !1, this.animatingHover = !1, this.forceOut = !1, this.timing = .65, this.el = document
                .getElementById(e)
        }
        onMouseEnter() {
            this.hoverInAnim()
        }
        hoverInAnim() {
            this.hovered || (this.hovered = !0, this.animatingHover = !0, this.forceOut = !1, TweenMax.fromTo(this
                .bg, this.timing, {
                    x: "-112%"
                }, {
                    x: "-12%",
                    ease: Power3.easeOut,
                    onComplete: () => {
                        this.animatingHover = !1, this.forceOut && (this.foceOut = !1, this
                            .hoverOutAnim())
                    }
                }))
        }
        onMouseLeave() {
            this.animatingHover ? this.forceOut = !0 : this.hoverOutAnim()
        }
        hoverOutAnim() {
            this.hovered = !1, TweenMax.to(this.bg, this.timing, {
                x: "100%",
                ease: Power3.easeOut,
                onComplete: () => {}
            })
        }
    }
    class Dot {
        constructor(e = 0) {
            this.index = e, this.anglespeed = .05, this.x = 0, this.y = 0, this.scale = 1 - .05 * e, this.range =
                width / 2 - width / 2 * this.scale + 2, this.limit = .75 * width * this.scale, this.element =
                document.createElement("span"), TweenMax.set(this.element, {
                    scale: this.scale
                }), cursor.appendChild(this.element)
        }
        lock() {
            this.lockX = this.x, this.lockY = this.y, this.angleX = 2 * Math.PI * Math.random(), this.angleY = 2 *
                Math.PI * Math.random()
        }
        draw(e) {
            !idle || this.index <= sineDots ? TweenMax.set(this.element, {
                x: this.x,
                y: this.y
            }) : (this.angleX += this.anglespeed, this.angleY += this.anglespeed, this.y = this.lockY + Math
                .sin(this.angleY) * this.range, this.x = this.lockX + Math.sin(this.angleX) * this.range,
                TweenMax.set(this.element, {
                    x: this.x,
                    y: this.y
                }))
        }
    }
    class Circle {
        constructor(e) {
            const t = document.getElementById(e);
            t.parentElement.removeChild(t)
        }
    }

    function init() {
        window.addEventListener("mousemove", onMouseMove), window.addEventListener("touchmove", onTouchMove),
            hoverButton = new HoverButton("button"), lastFrame += new Date, buildDots(), render()
    }

    function startIdleTimer() {
        timeoutID = setTimeout(goInactive, idleTimeout), idle = !1
    }

    function resetIdleTimer() {
        clearTimeout(timeoutID), startIdleTimer()
    }

    function goInactive() {
        idle = !0;
        for (let e of dots) e.lock()
    }

    function buildDots() {
        for (let e = 0; e < amount; e++) {
            let t = new Dot(e);
            dots.push(t)
        }
    }
    const onMouseMove = e => {
            mousePosition.x = e.clientX - width / 2, mousePosition.y = e.clientY - width / 2, resetIdleTimer()
        },
        onTouchMove = () => {
            mousePosition.x = event.touches[0].clientX - width / 2, mousePosition.y = event.touches[0].clientY - width /
                2, resetIdleTimer()
        },
        render = e => {
            positionCursor(e - lastFrame), lastFrame = e, requestAnimationFrame(render)
        },
        positionCursor = e => {
            let t = mousePosition.x,
                i = mousePosition.y;
            dots.forEach((o, s, n) => {
                let h = n[s + 1] || n[0];
                if (o.x = t, o.y = i, o.draw(e), !idle || s <= sineDots) {
                    const e = .35 * (h.x - o.x),
                        s = .35 * (h.y - o.y);
                    t += e, i += s
                }
            })
        },
        inkTablet = window.matchMedia("(max-width: 991px)"),
        inkMobile = window.matchMedia("(max-width: 479px)"),
        inkMediaObserver = () => {
            inkMobile.matches || inkTablet.matches || cursorInit || (cursorInit = !0, init())
        };
    inkMediaObserver(), inkTablet.addListener(inkMediaObserver), inkMobile.addListener(inkMediaObserver);

    

    $('.magnetic-big .btn-text').mouseenter(function(e) {
      $('#ink-cursor').css({ opacity: 0 });
      var bounding = this.getBoundingClientRect()
      let x = e.clientX - bounding.left;
      let y = e.clientY - bounding.top;
      $(this).css({ border: '2px solid #3072EC' });
  
      let ripple1 = document.createElement('span')
      ripple1.style.left = x + 'px'
      ripple1.style.top = y + 'px'
      ripple1.classList.add('ripple1')
      this.appendChild(ripple1)
  })
  
  $('.magnetic-big .btn-text').mouseleave(function(e) {
      $('#ink-cursor').css({ opacity: 1 });
      setTimeout(function(e) {
          $(".ripple1").remove()
      }, 50)
  
      var bounding = this.getBoundingClientRect()
      let x = e.clientX - bounding.left;
      let y = e.clientY - bounding.top;
  
      let ripple2 = document.createElement('span')
      ripple2.style.left = x + 'px'
      ripple2.style.top = y + 'px'
      ripple2.classList.add('ripple2')
      this.appendChild(ripple2)
  
      $(this).css({ border: '2px solid #FFFFFF' });
  
      setTimeout(function(e) {
          $(".ripple2").remove()
      }, 398)
  })


gsap.from(".first-slide--block .first-slide--block_1 h1", 1.2, {
  delay: 0.5,
  opacity: 0,
  y: "100%",
  ease: Expo.easeInOut
})
gsap.from(".first-slide--block .first-slide--block_2 p", 1.2, {
  delay: 0.8,
  opacity: 0,
  x: "100%",
  ease: Expo.easeInOut
})
gsap.from(".first-slide--block .first-slide--block_3 p", 1.2, {
  delay: 1.1,
  opacity: 0,
  y: "-100%",
  ease: Expo.easeInOut
})
gsap.fromTo(".first-slide--block .first-slide--block_1 a", {
  opacity: 0,
  ease: Expo.easeInOut
},
{
  duration: 1.2,
  delay: 1,
  opacity: 1,
})
gsap.from(".first-slide--block .first-slide--block_2 span", 1.2, {
  delay: 1.1,
  opacity: 0,
  ease: Expo.easeInOut
})
gsap.from(".first-slide--block .first-slide--block_3 span", 1.2, {
  delay: 1.4,
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.from(".first-slide--contact p:nth-child(1)", 1, {
  delay: 2,
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.from(".first-slide--contact p:nth-child(2)", 1, {
  delay: 2.2,
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.fromTo(".first-slide--contact a .btn-text", {
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
}, {
  y: "0vh",
  opacity: 1,
  duration: 1,
  delay: 2.3,
})

gsap.from(".first-slide--contact p:nth-child(4)", 1, {
  delay: 2.5,
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.from(".first-slide--contact p:nth-child(5)", 1, {
  delay: 2.6,
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.from(".first-slide--contact-mobile", 1, {
  delay: 2,
  y: "30vh",
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.fromTo("header .logo", {
  y: "-30vh",
  opacity: 0,
  ease: Expo.easeInOut
},
{
  delay: 1.5,
  duration: 1.2,
  y: "0vh",
  opacity: 1,
})

gsap.fromTo("header .open_modal", {
  y: "-30vh",
  opacity: 0,
  ease: Expo.easeInOut
},
{
  delay: 2,
  duration: 1.2,
  y: "0vh",
  opacity: 1,
})

gsap.from("#circle1", 3.5, {
  delay: .5,
  opacity: 0,
  ease: Expo.easeInOut
})

gsap.from("#circle2", 3.5, {
  delay: .5,
  opacity: 0,
  ease: Expo.easeInOut
})

let aboutHeader = gsap.timeline({
  scrollTrigger: {
    trigger: ".about_me--header"
  }
})

aboutHeader
  .from(".about_me--header-p1", {
    opacity: 0,
    y: '10vh',
    duration: 1,
  })
  .from(".about_me--header-p2", {
    opacity: 0,
    y: '10vh',
    duration: 1,
  })
  .from(".about_me--header-p3", {
    opacity: 0,
    y: '10vh',
    duration: 1,
  })
