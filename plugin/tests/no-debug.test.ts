import { tester } from '../test-utils'
import rule, { RULE_NAME } from '../src/rules/no-debug'

const javascript = String.raw

const valids = [
  {
    code: javascript`
import { css } from './panda/css';

const styles = css({ bg: 'gray.900' })`,
  },

  {
    code: javascript`
import { css } from './panda/css';

const styles = css.raw({ color: 'gray.50' })`,
  },
]

const invalids = [
  {
    code: javascript`
import { css } from './panda/css';

const styles = css({ bg: 'gray.900', debug: true })`,
  },

  {
    code: javascript`
import { css } from './panda/css';

const styles = css.raw({ color: 'gray.50', debug: true })`,
  },
]

tester.run(RULE_NAME, rule, {
  valid: valids.map(({ code }) => ({
    code,
  })),
  invalid: invalids.map(({ code }) => ({
    code,
    errors: 1,
  })),
})
