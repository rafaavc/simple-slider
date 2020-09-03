# Simple Slider

## How to use

### Includes

##### simple-slider.css
```html
<link rel="stylesheet" type="text/css" href="simple-slider.css"/>
```

##### simple-slider.js
```html
<script src="simple-slider.js" type="text/javascript"></script>
```

### Markup

```html
<div id="mySlider" class="ss-parent">
     <div class="ss-child" style="background-color: yellow;">
        <h1>Slide 1</h1>
    </div>
    <div class="ss-child" style="background-color: blue;">
        <h1>Slide 2</h1>
    </div>
    <div class="ss-child" style="background-color: green;">
        <h1>Slide 3</h1>
    </div>
    <div class="ss-child" style="background-color: purple;">
        <h1>Slide 4</h1>
    </div>
    <div class="sliderNav"></div>
</div>
```

##### Required
- Classes **ss-parent** and **ss-child**.
##### Optional
- Class **ss-nav** (There may be more than 1).
- Classes **ss-rightArrow** and **ss-leftArrow**.
- Attribute 'buttonText' of the child divs. Adds text to the respective button (if ss-nav exists), example:
```html
<div class="ss-child" buttonText="Slide 1" style="background-color: yellow;">
    <h1>Slide 1</h1>
</div>
```

### JavaScript

```JavaScript
SimpleSlider(elementId: string, interval: number, height: string, firstSlide: number);
```

- **elementId**: the id of the parent element. In the example above, the id is "mySlider".
- **interval**: the interval in milliseconds between slides. **DEFAULT: 3000**.
- **height**: the value of the css height property. **DEFAULT: "30vh"**.
- **firstSlide**: the id of the first slide to show. **DEFAULT: 0**.

---

Example:

```JavaScript
const slider = new SimpleSlider("mySlider");
slider.start();
```

#### JavaScript API

```JavaScript
SimpleSlider.start()
```

(Re)starts the slideshow.

---

```JavaScript
SimpleSlider.pause()
```

Pauses the slideshow

---

```JavaScript
SimpleSlider.goTo(id: number)
```

Jumps to the slide with id qual to the one given in the argument (ids start at 0).

---

```JavaScript
SimpleSlider.goToNext()
```

Jumps to next slide.

---

```JavaScript
SimpleSlider.goToPrev()
```

Jumps to previous slide.


