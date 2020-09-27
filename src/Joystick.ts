import { CanvasHandler } from "./CanvasHandler";
import { Dispatcher } from "./Dispatcher";
import { Utils } from "./Utils";
import { Vector } from "./Vector";

export default class Joystick extends Dispatcher {
    private canvasHander: CanvasHandler;
    public _draw: boolean = false;
    private dirVector: Vector;

    constructor(public domElement: HTMLElement, public options: any){
        super();
        this.domElement = domElement || document.querySelector("#joystick");
        if(!this.domElement)
            console.error("ERROR: Could not find #joystick HTMLElement.");
        else {
            this.options = options || {};
            // handling options
            this.options.scale = this.options.scale || 1;
            this.options.color = this.options.color || Utils.color;
            this.options.strokeColor = this.options.strokeColor || Utils.strokeColor;
            
            this.init();
        }
    }

    get draw() { return this._draw; }
    set draw(s: boolean) {
        if(!s && !this.draw) return;
        this._draw = s;
        this.canvasHander.draw();
    }

    private init(){
        this.canvasHander = new CanvasHandler(this);
    }

    public update(x: number, y: number){
        this.dirVector = new Vector(x, y);
        
        this.dispatch("change", { x: this.dirVector.x, y: this.dirVector.y});
    }

    // public functions for users
    directionVector (): any {
        return {
            x: this.dirVector.x,
            y: this.dirVector.y
        }
    }

    directionAngleRads(): number {
        return this.dirVector.toAngles();
    }

    directionAngleDegs(): number {
        return this.directionAngleRads() * 180 / Math.PI;
    }

    direction(): string {
        const angle: number = Math.round(this.directionAngleDegs()) + 450;
        var val: number = Math.floor((angle / 22.5) + 0.5);
        var arr: Array<string> = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
}
