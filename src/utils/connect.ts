import { StoreEvents } from "../core/store";
import isEqual from "./isequal";

export function connect(mapStateToProps : Function) {
  return function (Component : any) {//тип конструктора блока не совпаддает с конструктором Block
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props : object) {
        const store = window.store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentWillUnmount() {
        super.componentWillUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
