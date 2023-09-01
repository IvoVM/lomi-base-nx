import { KeyValueTableComponent } from './key-value-table.component';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Lomi KeyValueTable',
  component: KeyValueTableComponent,
} as Meta<KeyValueTableComponent>;

const Template: Story<KeyValueTableComponent> = (
  args: KeyValueTableComponent
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Dirección de envío',
  dataSource: [
    { key: 'Nombre completo:', value: 'Daniela Amboage' },
    { key: 'Dirección completa (calle+número)', value: 'Buenos Aires 123' },
    { key: 'Número de  departamento o residencia', value: '1A' },
    { key: 'Ciudad', value: 'Santiago' },
    { key: 'Región', value: 'Metropolitana' },
    { key: 'Cómuna', value: 'Las Condes' },
    { key: 'País', value: 'Chile' },
    { key: 'Teléfono', value: '+56 1234 5678' },
    { key: 'Notas', value: 'Timbre blanco' },
  ],
};
