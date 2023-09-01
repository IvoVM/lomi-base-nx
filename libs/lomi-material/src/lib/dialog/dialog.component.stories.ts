import { DialogComponent } from './dialog.component';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Lomi Dialog',
  component: DialogComponent,
} as Meta<DialogComponent>;

const Template: Story<DialogComponent> = (args: DialogComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: '¿Qué ha salido mal?',
  options: [
    {
      name: 'Error de envio - producto equivocado',
      value: 'Error de envio - producto equivocado',
    },
    {
      name: 'Error de envio - producto equivocado',
      value: 'Error de envio - producto equivocado',
    },
  ],
  dialogActions: [
    {
      color: 'accent',
      text: 'Siguiente',
      onClick: () => {
        console.log('hola');
      },
    },
  ],
};
