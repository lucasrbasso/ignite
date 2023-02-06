import type { StoryObj, Meta } from '@storybook/react'
import { Heading, HeadingProps } from '@lucas-ui/react'

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Custom title.',
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}
export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 heading',
    as: 'h1',
    size: 'md',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl', '4xl', '5xl', '6xl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Por padrão o heading sempre será `h2`, mas podemos alterar isso passando o `as`.',
      },
    },
  },
}
