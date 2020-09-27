export class Vector {
    constructor(public x: number, public y: number){
        this.x = x || 0;
        this.y = y || 0;
    }

	negative (): Vector {
		this.x = -this.x;
		this.y = -this.y;
		return this;
    }
    
	add (v: any): Vector  {
		if (v instanceof Vector) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}
		return this;
    }
    
	subtract (v: any): Vector {
		if (v instanceof Vector) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}
		return this;
    }
    
	multiply (v: any): Vector  {
		if (v instanceof Vector) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}
		return this;
    }
    
	divide (v: any): Vector  {
		if (v instanceof Vector) {
			if(v.x != 0) this.x /= v.x;
			if(v.y != 0) this.y /= v.y;
		} else {
			if(v != 0) {
				this.x /= v;
				this.y /= v;
			}
		}
		return this;
    }
    
	equals (v: any): boolean  {
		return this.x == v.x && this.y == v.y;
    }
    
	dot (v: any): number  {
		return this.x * v.x + this.y * v.y;
    }
    
	cross (v: any): number  {
		return this.x * v.y - this.y * v.x
    }
    
	length (): number  {
		return Math.sqrt(this.dot(this));
    }
    
	normalize (): Vector {
		return this.divide(this.length());
    }
    
	min (): number  {
		return Math.min(this.x, this.y);
    }
    
	max (): number  {
		return Math.max(this.x, this.y);
    }
    
	toAngles (): number  {
		return -Math.atan2(-this.y, this.x);
    }
    
	angleTo (a: any): number  {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
    }
    
	toArray (n: number): Array<number>  {
		return [this.x, this.y].slice(0, n || 2);
    }
    
	clone (): Vector  {
		return new Vector(this.x, this.y);
    }
    
	set (x: number, y: number): Vector  {
		this.x = x; this.y = y;
		return this;
	}
}