# DatingAppSPA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

when we do ng serve or ng build JIT compilation takes place
when we do ng build --prod AOT(ahed of time) compiler takes place

AOT gives several benifits :
1: Faaster rendering
2: Fewer async request
3: Smaller Framework download size
4: Detect template errors earlier
5: Better security

If you find css related issue with production build then turn off build optimiser 
which on by default in production build. But this increase little bit your main file size.

command to off optimizer : ng build --prod --build-optimizer=false


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Automating header passing

we use JwtModule to inject authentication automatically to request. for detail see appmodule. 
it will inject auth token to all whitelist domain . it will skip blacklist domain route to inject token
Example 

 JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:27050'],
            blacklistedRoutes: ['localhost:27050/api/auth']
         }
      })


## Photo uploading

we use ng2 file uploade library to upload file.
npm i ng2-file-upload --save