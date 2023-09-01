import { Meta, Story } from '@storybook/angular';
import { LayoutComponent } from './layout.component';

export default {
  title: 'Layout',
  component: LayoutComponent,
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
} as Meta<LayoutComponent>;

const Template: Story<LayoutComponent> = (args: LayoutComponent) => ({
  props: args,
});

export const Default = Template.bind({});
