import type { StoryObj, Meta } from '@storybook/react'
import { Text, TextProps } from '@lucas-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    size: 'md',
    children:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde sit excepturi dolor. Beatae ratione odit voluptates illo, quibusdam blanditiis facere! Deserunt incidunt consectetur autem perspiciatis voluptate, sint earum repellat laborum.,',
  },

  argTypes: {
    size: {
      options: [
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}
export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'strong text',
    as: 'strong',
  },
}
