import type { StoryObj, Meta } from '@storybook/react'
import { Box, MultiStep, MultiStepProps } from '@ignite-ui/react'

export default {
  title: 'Form/Multi step',
  component: MultiStep,
  decorators: [
    (Story) => {
      return <Box>{Story()}</Box>
    },
  ],
  args: {
    currentStep: 1,
    size: 4,
  },
} as Meta<MultiStepProps>

export const Primary: StoryObj<MultiStepProps> = {}

export const Full: StoryObj<MultiStepProps> = {
  args: {
    currentStep: 4,
  },
}
