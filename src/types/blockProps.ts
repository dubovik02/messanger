export type BlockProps = {
  className?: string;
  attributes?: {
    name: string,
    value: string | RegExp
  }[];
  events?: {
    eventName: string;
    eventFunc: Function;
  }[];
  isActive?: boolean;
};
