[//]: # (This file is generated by eslint-docgen. Do not edit it directly.)

# no-hardcoded-color

Enforce the exclusive use of design tokens as values for colors within the codebase.

📋 This rule is enabled in `plugin:@pandacss/all`.

## Rule details

❌ Examples of **incorrect** code:
```js
import { css } from './panda/css';

const styles = css({ color: '#FEE2E2' });

import { css } from './panda/css';

function App(){
  return  <div className={css({ background: 'rgb(134, 239, 172)' })} />;
};

import { Circle } from './panda/jsx';

function App(){
  return  <Circle _hover={{  borderColor: 'hsl(220deg, 14%, 96%)' }} />;
}
```

✔️ Examples of **correct** code:
```js
import { css } from './panda/css';

const styles = css({ color: 'red.100' });

import { css } from './panda/css';

function App(){
  return  <div className={css({ background: 'green.300' })} />;
};

import { Circle } from './panda/jsx';

function App(){
  return  <Circle _hover={{  borderColor: 'gray.100' }} />;
}
```

## Resources

* [Rule source](/plugin/src/rules/no-hardcoded-color.ts)
* [Test source](/tests/no-hardcoded-color.test.ts)