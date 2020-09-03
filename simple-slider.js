
class Slider {
    constructor(elementId, interval, height = "30vh") {
        this.interval = {
            dur: interval,
            obj: null
        }

        this.sliderElement = document.getElementById(elementId);
        if (!this.sliderElement) console.log("The slider was not found!");
        this.sliderElement.style.height = height;

        this.currentSlide = 0;

        this.indexChildren();
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

    next() {
        this.children[this.currentSlide].disappear();
        this.currentSlide = (this.currentSlide+1) % this.children.length;
        this.children[this.currentSlide].appear();
    }

    start() {
        this.interval.obj = setInterval(this.next.bind(this), this.interval.dur);
    }

    pause() {
        clearInterval(this.interval.obj);
    }
}

