import { TableComponent } from './table.component';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Lomi table',
  component: TableComponent,
} as Meta<TableComponent>;

const Template: Story<TableComponent> = (args: TableComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  displayedColumns: [
    'Número de pedido',
    'fecha',
    'estado',
    'pago',
    'envio',
    'Email del cliente',
    'total',
  ],
  dataSource: [
    {
      'Número de pedido': {
        value: 'R64285960',
        style: 'text-black',
      },
      fecha: {
        value: ' 14 de julio de 2022 9:21 AM - 04',
      },
      estado: {
        value: 'incompleto',
        style: 'btn-red',
      },
      pago: {
        value: 'Pendiente',
        style: 'btn-blue',
      },
      envio: {
        value: 'Pendiente de envio',
        style: 'btn-blue',
        css: 'background-color:green',
      },
      'Email del cliente': {
        value: 'danielaamboage@lomi.cl',
      },
      total: {
        value: '$66150',
        style: 'text-black',
      },
    },
    {
      'Número de pedido': {
        value: 'R64285960',
        style: '',
      },
      fecha: {
        value: ' 14 de julio de 2022 9:21 AM - 04',
        style: '',
      },
      estado: {
        value: 'incompleto',
        style: 'btn-red',
      },
      pago: {
        value: 'Pendiente',
        style: 'btn-blue',
      },
      envio: {
        value: 'Pendiente de envio',
        style: 'btn-blue',
      },
      'Email del cliente': {
        value: 'danielaamboage@lomi.cl',
        style: '',
      },
      total: {
        value: '$66150',
        style: 'text-black',
      },
    },
    {
      'Número de pedido': {
        value: 'R64285960',
        style: 'text-black',
      },
      fecha: {
        value: ' 14 de julio de 2022 9:21 AM - 04',
        style: '',
      },
      estado: {
        value: 'incompleto',
        style: 'btn-red',
      },
      pago: {
        value: 'Pendiente',
        style: 'btn-blue',
      },
      envio: {
        value: 'Pendiente de envio',
        style: 'text-black',
      },
      'Email del cliente': {
        value: 'danielaamboage@lomi.cl',
        style: '',
      },
      total: {
        value: '$66150',
        style: 'text-black',
      },
    },
  ],
};
