import { Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Lomi Button',
  component: ButtonComponent,
  args: {
    color: 'primary',
    label: 'Button',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    color: {
        options: ['primary', 'accent', 'warn'],
        control: {
            type: 'select',
        }
    }
  }
} as Meta<ButtonComponent>;

export const Default = {
  render: (args: {
    color: 'primary' | 'accent' | 'warn';
  }) => ({
    template: `<lm-button (onclick)="onclick($event)" [color]="color">{{label}}</lm-button>`,
    props: args,
  }),
};

export const Raised = {
    render: (args: {
      color: 'primary' | 'accent' | 'warn';
    }) => ({
      template: `<lm-raised-button [color]="color">{{label}}</lm-raised-button>`,
      props: args,
    }),
    args: {
        label: 'Raised Button',
    },
  };


export const Stroked = {
    render: (args: {
      color: 'primary' | 'accent' | 'warn';
    }) => ({
      template: `<lm-stroked-button [color]="color">{{label}}</lm-stroked-button>`,
      props: args,
    }),
    args: {
        label: 'Stroked Button',
    },
  };

export const Flat = {
    render: (args: {
        color: 'primary' | 'accent' | 'warn';
        }) => ({
        template: `<lm-flat-button [color]="color">{{label}}</lm-flat-button>`,
        props: args,
    }),
    args: {
        label: 'Flat Button',
    },
}
  
  