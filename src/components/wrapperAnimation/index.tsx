import { onMount } from "solid-js"
import Lenis from '@studio-freight/lenis'

export function WrapperAnimation (props : any) {
    onMount(() => {

        // for lenis
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // background stars
        const generateStart = (n: number) => {
            let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(
            Math.random() * 2000
            )}px rgba(165, 190, 195, ${Math.random().toFixed(1)})`;

            for (let i = 0; i <= n; i++) {
            value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(
                Math.random() * 2000
            )}px rgba(184, 174, 131, ${Math.random().toFixed(1)})`;
            }

            return value;
        };
        let starsElement1 = document.getElementById("stars1");
        let starsElement2 = document.getElementById("stars2");
        let starsElement3 = document.getElementById("stars3");
        let starsElement4 = document.getElementById("stars4");


        starsElement1!.style.boxShadow = generateStart(200);
        starsElement2!.style.boxShadow = generateStart(300);
        starsElement3!.style.boxShadow = generateStart(400);
        starsElement4!.style.boxShadow = generateStart(500);

    }) 

    return (
        <>
            <div id="stars1"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
            {props.children}
        </>
    )
}