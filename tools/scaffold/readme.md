## Get Started

## What Does This Comand-line Tool Do?

Veir's Scaffold tool helps create boilerplate code for projects.

Current scaffold templates available:
- React/JS Component
- React/JS Twig Component
- React Hook
- React Context
- JavaScript Service
- JavaScript Tests

It will automatically add index files and imports/exports to speed up developement.

## Out of the Box Project Structure
```
frontend
--| js
----| index.js
----| components
------| index.js
------| ExampleComponent
--------| index.{js, ts}
--------| ExampleComponent.{jsx, tsx}
--------| ExampleComponent.mockData.{ts, js}
--------| ExampleComponent.propTypes.{ts, js}
--------| ExampleComponent.propTypes.{ts, js}
--------| ExampleComponent.render.{tsx, jsx}
--------| ExampleComponent.init.{ts, js}
--------| example-component.scss
----| hooks
------| exampleHook.{ts, js}
----| context
------| example.context.{ts, js}
------| example.reducer.{ts, js}
------| index.{tsx, jsx}
----| services
------| exampleService.{ts, js}
```



<!-- ## Installation  -->

## CLI Usage

Run the `setup` command from your project root directory to setup the scaffold tool for your project.

_Note: The tool saves its settings in your package.json_

```sh
$ scaffold setup
```

You can copy all templates to your project for easy customization.

```sh
$ npm run scaffold copy
```
Create a react component

```sh
$ npm run scaffold component
```

react context context

```sh
$ npm run scaffold context
```

react hook

```sh
$ npm run scaffold hook
```

or javascript service

```sh
$ npm run scaffold service
```

## Customizing
The scaffold templates are built with handlebars. the template names are suffixed by their function. for example `Component.mockData.hbs` is the mockData js template.

You may have noticed some of the templates have special comments ie `/* PLOP_INJECT_LIB_EXPORT */` and `/* PLOP_INDEX_IMPORT */` these are used by the scaffold to inject templates with specific code from templates.

`PLOP_INDEX_IMPORT` injects the template plop-templates/React/Js/injection-template.hbs. Used to add imports to the project index.

`PLOP_INJECT_LIB_EXPORT` injects the template ploptemplates/React/Js/Components/injection-template.hbs. Used to add exports to the components index file.
 
By default the scaffold tool will import any init or render files into the project index.js and it will create a component library file to speed up development.

