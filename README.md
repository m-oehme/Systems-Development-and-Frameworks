# Systems Development and Frameworks - Group Assignments - Winter Term 2019/20

| Github Alias                                     | Name   |
| ------------------------------------------------ | ------ |
| [@m-oehme](https://github.com/m-oehme)           | Max O. |
| [@6csharpmajor](https://github.com/6csharpmajor) | Victor |

## Development Envorment Setup

[WebStrom IDE by Jetbrains](https://www.jetbrains.com/webstorm/) is preferred for development.

As Package Manager `npm` was used.  
Before starting make sure you have a `package.json` file in your Project root. If not, create it! (its used for configuration!)

### Linter: Prettier

Documentation: [https://prettier.io](https://prettier.io)

**Required** Installing

```npm
npm install prettier --save-dev --save-exact
```

Test out if it works:

```npm
npx prettier --write 1/index.js
```

If using WebStorm IDE you can also do it from Context Menu for a file or selected code. (Click on `Reformat with Prettier`)

**(Optional)** Automatically running Prettier when committing code with git:

```npm
npm install pretty-quick husky --save-dev
```

After successfully running the command add the following to your `package.json`

```json
{ "husky": { "hooks": { "pre-commit": "pretty-quick --staged" } } }
```

### Jest

Documentation: [https://jestjs.io/docs/en/getting-started](https://jestjs.io/docs/en/getting-started)

**Required** Installing:

```npm
npm install --save-dev jest
```

Check out the Jest documentation for examples!

### Vue-Test-Utils

Documentation: [https://github.com/vuejs/vue-test-utils](https://github.com/vuejs/vue-test-utils)

**Required)** Installing:

```npm
npm install --save-dev @vue/test-utils
npm install --save-dev @vue/server-test-utils

npm install --save-dev vue-template-compiler
```

Documentation with Getting Started and a example project: [here](https://vue-test-utils.vuejs.org/guides/getting-started.html)
