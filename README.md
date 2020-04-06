# UiExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.16.

### Prerequisites for development

* `Node 8.9.0 or higher`
* `NPM 6 or higher`
* `Angular-cli - npm install -g @angular/cli@x.x` 

### Installation
* `git clone` this repository
* `cd ui-exercise`
* `npm install`

### Development server

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* serve production build - `ng server --prod`
* change ports - `ng serve --port 4201 --live-reload-port 49153`
* proxy server - `ng serve --proxy-config proxy-config.json` or `npm start` (refer to proxy-config.json for proxy settings)

### Code scaffolding

* Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
* production build - `ng build --prod`

### CSS Framework

* This app uses Bootstrap-Sass as our CSS framework.
For more information on using Bootstrap-Sass, visit [The Bootstrap-Sass Github page](https://github.com/twbs/bootstrap-sass) or [The Bootstrap Website](http://getbootstrap.com/)

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### lint
* `ng lint` or `npm run lint`

### Updating angular-cli
* `npm uninstall -g @angular/cli`
* `npm cache clean`
* `rm -rf node_modules dist tmp`
* `npm install -g @angular/cli@x.x`

After installing run `ng --version or ng -v` to make sure the version is correct.

### Further help

* To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
* For documentation on angular check out the [angular docs](https://angular.io/docs/ts/latest/)
