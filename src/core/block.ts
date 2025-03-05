import Handlebars from 'handlebars';
import { BlockProps } from "../types/blockProps";
import EventBus from "./eventBus";

export default class Block {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private _element : any;

  _meta : {
    tagName : string,
    props: BlockProps,
  };

  private _eventBus : EventBus;

  private _id;

  private _childrens : Record<string, Block | Block[]>;


  constructor(tagName = "div", props : BlockProps = {}, childrens : Record<string, Block | Block[]> = {}) {
    this._meta = {
      tagName,
      props
    };
    this._meta.props = this._makePropsProxy(props);

    this._childrens = childrens;

    this._id = crypto.randomUUID();

    this._eventBus = new EventBus();
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _makePropsProxy(props : BlockProps) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof BlockProps] as any;
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop as keyof BlockProps] = value;
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _render() {
    this._removeEvents();

    this._element.textContent = '';//

    const block = this.compile();

    if (Object.keys(this.getChildrens()).length === 0) {
      this._element.appendChild(block);
    } else {
      this._element.replaceChildren(block);
    }

    this._addEvents();
  }

  render() {
    return '';
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);

    if (this.getProperties().className) {
      const classes = this.getProperties().className?.split(" ");
      if (classes !== undefined) {
        this._element.classList.add(...classes);
      }
    }

    if (this.getProperties().attributes) {
      const attr = this.getProperties().attributes;
      if (attr) {
        attr.forEach((item) => {
        this._element.setAttribute(item.name, item.value);
      });
      }
    }

    if (this.getProperties().isActive !== undefined) {
      const isDisabled = this.getProperties().isActive;
      isDisabled ? this._element.removeAttribute('disabled') : this._element.setAttribute('disabled', 'disabled');
    }
  }

  private _registerEvents() {
    if (this._eventBus) {
      this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  }


  private _addEvents() {
    const { events = []} = this.getProperties();

    events.forEach((event) => {
      this._element.addEventListener(event.eventName, event.eventFunc);
    });

  }

  private _removeEvents() {
    const { events = [] } = this.getProperties();

    events.forEach((event) => {
      this._element.removeEventListener(event.eventName, event.eventFunc);
    });
  }

  compile() {

    const propsAndStubs : {[index: string]:any} = { ...this.getProperties() };

    Object.keys(this.getChildrens()).forEach((key) => {
        if (Array.isArray(this.getChildrens()[key])) {
          const arr = this.getChildrens()[key] as Block[];
          propsAndStubs[key] = arr.map(
            (component : Block) => `<div data-id="${component.id}"></div>`,
          );
        }
        else {
          propsAndStubs[key] = `<div data-id="${(this.getChildrens()[key] as Block).id}"></div>`;
        }
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.keys(this.getChildrens()).forEach((key) => {
        if (Array.isArray(this.getChildrens()[key])) {
          const arr = this.getChildrens()[key] as Block[];
          arr.forEach((component) => {
            const stub = fragment.content.querySelector(
              `[data-id="${component.id}"]`,
            );
            stub?.replaceWith(component.getContent());
          });
        }
        else {
          const stub = fragment.content.querySelector(`[data-id="${(this.getChildrens()[key] as Block).id}"]`);
          stub?.replaceWith((this.getChildrens()[key] as Block).getContent());
        }
    });

    return fragment.content;
  }

  getContent() {
    return this._element;
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {

  }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps : BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps : BlockProps, newProps : BlockProps) {
    return true;
  }

  private _createDocumentElement(tagName : string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  getProperties() {
      return this._meta.props ? this._meta.props : {};
    }

  getChildrens() {
    return this._childrens;
  }

  setProps = (nextProps : any) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this._meta.props, nextProps);
  };

  get element() {
    return this._element;
  }
}
