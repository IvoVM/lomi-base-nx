import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { DropdownComponent } from './dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Lomi dropdown',
  component: DropdownComponent,
  args: {
    label: 'Tienda Las Condes',
    Routes: [
      {
        name: 'Cerrar sesión',
        routeHref: '/',
        icon: '',
      },
      {
        name: 'Otro item',
        routeHref: '/',
        icon: '',
      },
    ],
  },
  decorators: [
    moduleMetadata({
        imports: [
            BrowserAnimationsModule
        ],
    }),
  ]
} as Meta<DropdownComponent>;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
  props: args,
});

export const Default = Template.bind({});
