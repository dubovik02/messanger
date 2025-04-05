import { expect } from "chai";
import { ButtonProps } from "../../types/buttonProps";
import Button from "./button";
import Sinon from "sinon";

describe('Компонент Button', () => {

  const props : ButtonProps = {
    buttonText : 'Test',
    type: 'submit'
  };

  function createComponent() {
    return new Button(props);
  }

  it('Проверка корректности установления свойств', () => {
    const button = createComponent();
    const compText = button.element.textContent;
    expect(compText).to.eq(props.buttonText);
  });

  it('Проверка реактивного изменения свойств ', () => {
    const button = createComponent();
    const newText = 'new text'
    button.setProps({buttonText : newText});
    const compText = button.element.textContent;
    expect(compText).to.eq(newText);
  });

  it('Проверка установки обработчика событий', () => {
    const eventStub = Sinon.stub();
    const button = createComponent();
    button.setProps({
      events: [
        {
          eventName: 'click',
          eventFunc: eventStub
        }
      ]
    })

    const event = new MouseEvent('click');
    button.element.dispatchEvent(event);

    expect(eventStub.calledOnce).to.be.true;
  });

  it('Проверка установки свойства display у компонента', () => {
    const button = createComponent();
    const elem = button.element;

    button.hide();

    expect(elem.style.display).to.eq('none');
  });

  it('У компонента вызывается dispatchComponentDidMount при монтировании в DOM', () => {
    const clock = Sinon.useFakeTimers();
    const button = createComponent();

    const spy = Sinon.spy(button, 'componentDidMount');
    button.getContent();
    clock.next();

    expect(spy.calledOnce).to.be.true;
  })

});
