
class Slider {
    constructor(elementId, interval = 3000, height = "30vh", firstSlide = 0) {
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
                appear: function() {
                    this.element.style.left = "-100%";
                    this.element.classList.remove('disappearToLeft');
                    this.element.classList.add('appearFromRight');
                },
                disappear: function() {
                    this.element.style.left = "0";
                    this.element.classList.remove('appearFromRight');
                    this.element.classList.add('disappearToLeft');
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

    next() {
        this.children[this.currentSlide].disappear();
        this.currentSlide = (this.currentSlide+1) % this.children.length;
        this.children[this.currentSlide].appear();
    }

    goTo(id) {
        if (id === this.currentSlide) return;
        this.pause();
        this.children[this.currentSlide].disappear();
        this.currentSlide = id % this.children.length;
        this.children[this.currentSlide].appear();
        this.start();
    }

    start() {
        this.interval.obj = setInterval(this.next.bind(this), this.interval.dur);
    }

    pause() {
        clearInterval(this.interval.obj);
    }
}

