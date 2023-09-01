import { HeaderComponent } from './header.component';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Lomi Header',
  component: HeaderComponent,
  args: {
    LogoIMG: '',
    Route: [
      {
        name: 'Pedidos',
        routeHref: '/',
      },
      {
        name: 'Historial de Pedidos',
        routeHref: '/',
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
} as Meta<HeaderComponent>;

const Template: Story<HeaderComponent> = (args: HeaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});

export const withDropdown = Template.bind({});
withDropdown.args = {
  LogoIMG: '',
  Route: [
    {
      name: 'Pedidos',
      routeHref: '/',
    },
    {
      name: 'Historial de Pedidos',
      routeHref: '/',
    },
  ],
  dropdown: true,
  dropdownLabel: 'Tienda Las Condes',
  dropdownRoute:[{
    name: 'Cerrar sesión',
    routeHref: '/',
    icon: '',
  },{
    name: 'Otro item',
    routeHref: '/',
    icon: '',
  },]
};
