
export function getNumberFromCSSString(str:string,unit:string = "px"):number{
    return Number(str.split(unit)[0])
}

export default class WebUtils {
    static lockedBody:boolean = false

    static lockBodyScroll(){

        if(this.lockedBody) return
        this.lockedBody = true
        document.documentElement.style.scrollBehavior = "auto"
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.bottom = "0";
        document.body.style.position = "fixed";
        console.log("lockBodyScroll")
    }

    static unLockBodyScroll(){

        if(!this.lockedBody) return
        this.lockedBody = false
        document.body.style.position = "static";
        window.scrollTo({
            top: -getNumberFromCSSString(document.body.style.top),
            behavior: 'auto'
        })
        document.documentElement.style.scrollBehavior = "smooth"
        document.body.style.top = "auto";
        document.body.style.left =  "auto";
        document.body.style.right = "auto";
        document.body.style.bottom =  "auto";


    }
}