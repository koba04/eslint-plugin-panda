import { isPandaAttribute, isPandaProp, resolveLonghand } from '../utils/helpers'
import { type Rule, createRule } from '../utils'
import { isIdentifier, isJSXIdentifier } from '../utils/nodes'

export const RULE_NAME = 'no-shorthand-prop'

const rule: Rule = createRule({
  name: RULE_NAME,
  meta: {
    docs: {
      description:
        'Discourage the use of shorthand properties and promote the preference for longhand CSS properties in the codebase.',
    },
    messages: {
      longhand: 'Use longhand property of `{{shorthand}}` instead. Prefer `{{longhand}}`',
      replace: 'Replace `{{shorthand}}` with `{{longhand}}`',
    },
    type: 'suggestion',
    hasSuggestions: true,
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sendReport = (node: any, name: string) => {
      const longhand = resolveLonghand(name, context)!

      const data = {
        shorthand: name,
        longhand,
      }

      return context.report({
        node,
        messageId: 'longhand' as const,
        data,
        suggest: [
          {
            messageId: 'replace',
            data,
            fix: (fixer) => {
              return fixer.replaceTextRange(node.range, longhand)
            },
          },
        ],
      })
    }

    return {
      JSXAttribute(node) {
        if (!isJSXIdentifier(node.name)) return
        if (!isPandaProp(node, context)) return

        const longhand = resolveLonghand(node.name.name, context)
        if (!longhand) return

        sendReport(node.name, node.name.name)
      },

      Property(node) {
        if (!isIdentifier(node.key)) return
        if (!isPandaAttribute(node, context)) return
        const longhand = resolveLonghand(node.key.name, context)
        if (!longhand) return

        sendReport(node.key, node.key.name)
      },
    }
  },
})

export default rule
