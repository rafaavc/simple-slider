
class SimpleSlider {
    constructor(elementId, interval = 3000, height = "30vh", firstSlide = 0) {
        this.dir = {
            RIGHT: 0,
            LEFT: 1
        }

        this.interval = {
            dur: interval,
            obj: null
        }

        this.sliderElement = document.getElementById(elementId);
        if (!this.sliderElement) console.log("The slider was not found!");
        this.sliderElement.style.height = height;

        this.currentSlide = firstSlide;

        this.indexChildren();

        this.generateNav();
    }

    indexChildren() {
        this.children = [];

        const childElements = this.sliderElement.getElementsByClassName('sliderChild');
        let counter = 0;
        for(const c of childElements) {
            let childObj = {
                id: counter,
                element: c,
                appear: function(slider, dir) {
                    this.element.style.left = "-100%";
                    this.element.classList.remove('disappearToLeft');
                    this.element.classList.remove('disappearToRight');
                    if (dir === slider.dir.RIGHT) {
                        this.element.classList.add('appearFromRight');
                    } else {
                        this.element.classList.add('appearFromLeft');
                    }
                },
                disappear: function(slider, dir) {
                    this.element.style.left = "0";
                    this.element.classList.remove('appearFromRight');
                    this.element.classList.remove('appearFromLeft');
                    if (dir === slider.dir.RIGHT) {
                        this.element.classList.add('disappearToLeft');
                    } else {
                        this.element.classList.add('disappearToRight');
                    }
                }
            }

            if (counter === this.currentSlide) childObj.element.style.left = "0";
            counter++;

            this.children.push(childObj);
        }
    }

    generateNav() {
        const navElements = this.sliderElement.getElementsByClassName('sliderNav');
        if (navElements.length === 0) this.nav = false;

        for (const child of this.children) {
            let navButton = document.createElement("button");

            navButton.onclick = (function () { this.goTo(child.id); }).bind(this);

            if (child.element.getAttribute('buttonText')) {
                navButton.appendChild(document.createTextNode(child.element.getAttribute('buttonText')));
            }
            for (const nav of navElements) {
                nav.appendChild(navButton);
            }
        }
    }

    updateSlide(changes, direction) {
        this.children[changes.disappear].disappear(this, direction);
        this.children[changes.appear].appear(this, direction);
    }

    setCurrentSlide(n) {
        const res = {
            disappear: this.currentSlide
        };
        this.currentSlide = n % this.children.length;
        res.appear = this.currentSlide;
        return res;
    }

    incrementCurrentSlide() {
        return this.setCurrentSlide(this.currentSlide+1);
    }

    decrementCurrentSlide() {
        return this.setCurrentSlide(this.currentSlide === 0 ? this.children.length - 1 : this.currentSlide-1);
    }

    goToNext() {
        this.updateSlide(this.incrementCurrentSlide(), this.dir.RIGHT);
    }
    goToPrev() {
        this.updateSlide(this.decrevementCurrentSlide(), this.dir.RIGHT);
    }

    goTo(id) {
        if (id === this.currentSlide) return;
        this.pause();
        const dir = id > this.currentSlide ? this.dir.RIGHT : this.dir.LEFT;
        this.updateSlide(this.setCurrentSlide(id), dir);
        this.start();
    }

    start() {
        this.interval.obj = setInterval(this.goToNext.bind(this), this.interval.dur);
    }

    pause() {
        clearInterval(this.interval.obj);
    }
}
