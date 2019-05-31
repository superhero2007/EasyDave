import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state,
} from '@angular/animations';

export const transAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}'
  }),
  animate('{{ time }}')
]); 

export const fadeInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('100ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('100ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({opacity: 0})
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('100ms ease-out', style({opacity: 0}))
        ], { optional: true }),
        query(':enter', [
          animate('100ms ease-out', style({opacity: 1}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);



export const routerTransition = trigger('routerTransition', [
  transition('* => home', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ], { optional: true }),
    ])
  ]),
  transition('* => about', [
    group([
      query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
])


export const transAddress = trigger('openClose', [
  // ...
  state('open', style({
    height: '400px',
    width:'33.5rem',
    opacity: 1,
    overflow:'hidden',
    backgroundColor: 'white'
  })),
  state('closed', style({
    height: '37px',
    opacity: 1,
    overflow:'hidden', 
    backgroundColor: 'rgba(168, 48, 75, 1)'
  })),
  transition('open => closed', [
    animate('300ms')
  ]),
  transition('closed => open', [
    animate('300ms')
  ]),
])