export class Utils {
    static width: number = 100;
    static height: number = 100;
    static color: string = "#FF0000";
    static strokeColor: string = "#000000";

    static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r: number = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    static getCursorPosition(event: any): any {
        let x: number;
        let y: number;

        if(event instanceof MouseEvent){
            x = event.pageX;
            y = event.pageY;
        }else if(event instanceof TouchEvent){
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        }
        
        return {x: x, y: y};  
    }
}