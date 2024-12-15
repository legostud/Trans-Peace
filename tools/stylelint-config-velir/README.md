# Velir stylelint preset

## Contents

 - [Usage](#usage)
- [Development](#development)

## Description

[stylelint](https://stylelint.io/) and [prettier](https://prettier.io/) are used to ensure correct and well-formatted css.

## Installation

Run from the root of your project:

```

$ npm install
$ yarn

```

## Usage

In the project [`.stylelintrc.json`](.stylelintrc.json) file add the `@velir-fe/stylelint-plugin-velir-presets` to the plugins.

```
{
"extends": ["@velir-fe/stylelint-config-velir"]
}
 ```

Any overrides desired for specific projects can be done by adding to rules.

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
