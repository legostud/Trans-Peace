# Velir eslint preset

## Contents
- [Usage](#usage)
- [Development](#development)

## Description

[eslint](https://eslint.org/) and [prettier](https://prettier.io/) are used to ensure correct and well-formatted javascript.

 
## Usage

In the project `.eslintrc` add `@velir-fe/eslint-config-velir`
the pacakage has the dependencies for any presets so all that is needed in project package.json file is:

```JSON
    "@velir-fe/eslint-config-velir": "file:./path-to/eslint-config-velir",
```

Then in your projects `.eslintrc` file add:

```
...
"extends":["@velir-fe/eslint-config-velir"],
...
```
You can remove any plugins related to prettier or storybook and remove them from package.json as they are already included.

This will add Velirs default eslint configuration for react projects if you are working on a project that uses a different framework you can use extend the common config.

```
...
"extends":["@velir-fe/eslint-config-velir/common"],
...
```
to lint files you will  need to add eslint config command to npm scripts.
```
...
eslint: "eslint ./path/to/js/"
...
```


#### Run eslint

  With the npm scripts in place, you can  run these commands in your terminal to see all linter errors in your project:

  ```
  npm run eslint
  ```

  To fix these errors in place, make sure you have a clean git working directory and run the following:

  ```
  npm run eslint -- --fix
  ```


### Linter integration with text editor

ESLint and Stylelint should be enabled in your editor so it will highlight errors as you develop. In addition, code should be formatted/fixed on save using eslint/stylelint. To do this, follow the specific instructions below for VS Code.

#### VS Code linter integration

1. Install the following packages:
    - [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

2. Configure VS Code to fix on save in settings.json:
    ```json
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true
      },
    ```

3. You should now see linter errors in your editor and it should fix most of them when you save the file.
