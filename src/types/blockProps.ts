export type BlockProps = {
  className?: string;
  attributes?: {
    name: string,
    value: string
  }[];
  events?: {
    eventName: string;
    eventFunc: Function;
  }[];
};
