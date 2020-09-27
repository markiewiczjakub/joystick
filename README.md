# Joystick
A simple joystick component for web app using pure TypeScript. It can be used as control element.

## Usage
You can create Joystick simply by implementing **joystick.min.js** file and run code below
```javascript
new Joystick();
```
However, to run it without any arguments you have to create HTML element with 'joystick' id before.  
Joystick class normally gets two arguments
```javascript
new Joystick([HTMLElement], [options]);
```
Where:
* HTMLElement is DOM element grabbed by javascript code using f.e. querySelector method.
* options is object containing three properties:
```javascript
const options = {
    scale: 1,
    color: "#000000",
    strokeColor: "#ffffff"
};
```
**scale** - Joystick is scalable, by default width and height are 100px,  
**color** - main color of joystick,  
**strokeColor** - stroke color of inner joystick element.  
  
Joystick contains three events to work on.  
**Change** - event dispatched when Joystick element is in move.
```javascript
const joy = new Joystick();
joy.on("change", (joystickObject) => { /* code here */ });
```
**Start** - event dispatched when Joystick starts moving.
```javascript
const joy = new Joystick();
joy.on("start", (joystickObject) => { /* code here */ });
```
**End** - event dispatched when Joystick ends moving.
```javascript
const joy = new Joystick();
joy.on("end", (joystickObject) => { /* code here */ });
```
## Example
First of all implement Joystick library
```html
<script src="joystick.min.js"></script>
```
Then create HTML element
```html
<div id="iWantItHere"></div>
```
And then final step will be
```javascript
new Joystick(
    document.querySelector("#iWantItHere"),
    {
        scale: 2,
        color: "rgb(255, 0, 255)",
        strokeColor: "rgb(0, 0, 0)"
    }
)
```
We are set!
## Demo
Live example is availible at [link](https://markiewiczjakub.github.io/joystick/demo/).
