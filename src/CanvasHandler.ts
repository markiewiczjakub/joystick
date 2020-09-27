import Joystick from "./Joystick";
import { Utils } from "./Utils";
import { Vector } from "./Vector";

export class CanvasHandler {
    public canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;
    private maxLength: number;
    private circleRadius: any;
    public joystickPoistion: any;

    constructor(private joystick: Joystick){
        this.canvas = document.createElement("canvas");
        this.canvas.id = Utils.uuidv4();
        this.canvas.width = Utils.width * this.joystick.options.scale;
        this.canvas.height = Utils.height * this.joystick.options.scale;
        this.canvasContext = this.canvas.getContext("2d");

        this.joystick.domElement.appendChild(this.canvas);

        // max vector's length
        this.circleRadius = {
            background: this.canvas.width/2 - (3 * this.joystick.options.scale),
            joystick: this.canvas.width/2 - (20 * this.joystick.options.scale),
            joystickStroke: this.canvas.width/2 - (21.5 * this.joystick.options.scale),
        }
        this.maxLength = this.canvas.width/2  - this.circleRadius.joystick;

        this.joystickPoistion = {
            x: this.canvas.width/2,
            y: this.canvas.height/2
        }

        this.bindEvents();
        this.draw();
    }

    calculate(x: number, y: number){
        let joystickVector: Vector = new Vector(this.canvas.offsetLeft + this.canvas.width/2, this.canvas.offsetTop + this.canvas.height/2);
        let clickVector: Vector = new Vector(x, y);

        let finalVector: Vector = clickVector.subtract(joystickVector);
        if(finalVector.length() > this.maxLength) {
            finalVector.normalize();
            finalVector.multiply(this.maxLength);
        }

        this.joystickPoistion.x = finalVector.x + this.canvas.width/2;
        this.joystickPoistion.y = finalVector.y + this.canvas.width/2;

        finalVector.divide(this.maxLength);
        this.joystick.update(finalVector.x, finalVector.y);
    }

    bindEvents(): void {
        const handleClickEvent = (event: any, state: boolean): void => {
            if(state === false && this.joystick.draw === true){
                this.joystick.dispatch("end", this.joystick);
                this.joystickPoistion.x = this.canvas.width/2;
                this.joystickPoistion.y = this.canvas.height/2;
                this.joystick.update(0, 0);
                this.joystick.draw = state;
                return;
            }
            this.joystick.draw = state;
            this.joystick.dispatch("start", this.joystick);
            const pos = Utils.getCursorPosition(event); 
            this.calculate(pos.x, pos.y);  
        }

        const handleMoveEvent = (event: any): void => {
            if(!this.joystick.draw) return;

            const pos = Utils.getCursorPosition(event); 
            this.calculate(pos.x, pos.y);       
        }

        // for dekstop
        this.canvas.addEventListener("mousedown", (e) => handleClickEvent(e, true));
        document.addEventListener("mouseup", (e) => handleClickEvent(e, false));
        document.addEventListener("mousemove", (e) => handleMoveEvent(e));

        // for mobile
        this.canvas.addEventListener("touchstart", (e) => handleClickEvent(e, true));
        document.addEventListener("touchend", (e) => handleClickEvent(e, false));
        document.addEventListener("touchmove", (e) => handleMoveEvent(e));
    }

    drawBackground(): void {
        this.canvasContext.beginPath();
        this.canvasContext.lineWidth = 3 * this.joystick.options.scale;
        this.canvasContext.strokeStyle = this.joystick.options.color;
        this.canvasContext.arc(this.canvas.width/2, this.canvas.height/2, this.circleRadius.background, 0, 2*Math.PI);
        this.canvasContext.stroke();
    }

    drawJoystick(x: number, y: number): void {
        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.circleRadius.joystick, 0, 2*Math.PI)
        this.canvasContext.fillStyle = this.joystick.options.color;
        this.canvasContext.fill();

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, this.circleRadius.joystickStroke, 0, 2*Math.PI)
        this.canvasContext.strokeStyle = this.joystick.options.strokeColor;
        this.canvasContext.stroke();
    }

    draw(): void {
        if(!this.canvasContext) return;
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawJoystick(this.joystickPoistion.x, this.joystickPoistion.y);
        
        // check whether joystick needs to move
        if(this.joystick.draw)
            window.requestAnimationFrame(() => this.draw());
    }
}