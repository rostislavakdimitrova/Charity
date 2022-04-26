import { trigger, style, animate, transition } from '@angular/animations';


const appAnimations = [
    trigger('left', [
        transition("void => *", [
            style({
                opacity: 0,
                transform: 'translateX(-150px)'
            }),
            animate(700)
        ])
    ]),
    trigger('right', [
        transition("void => *", [
            style({
                opacity: 0,
                transform: 'translateX(150px)'
            }),
            animate(700)
        ])
    ]),
];


export { appAnimations };