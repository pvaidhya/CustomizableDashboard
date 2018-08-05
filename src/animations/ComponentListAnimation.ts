import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const ComponentListAnimation = trigger('ComponentListAnimation', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', [
            animate('1s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
            ]))]), { optional: true }),
        query(':leave', stagger('100ms', [
            animate('.5s ease-in-out', style({
                transform: 'translateY(-10%)',
                opacity: 0
            }))

        ]), { optional: true })


    ])
])