export type DialogAction = {
  color: 'primary' | 'accent' | 'warn' | 'danger';
  onClick:() => void;
  text: string;
};

export type DialogOptions = {
  name: string;
  value: string;
};
