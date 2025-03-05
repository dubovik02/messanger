import Block from "./block";

export function renderDOM(rootSelectorName : string, block: Block) {
  const root = document.querySelector(rootSelectorName);
  root!.innerHTML = "";
  root!.appendChild(block.getContent());
}

export function render(rootSelectorName : string, block : Block) {
  const root = document.querySelector(rootSelectorName);
  if (root) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }
  return root;
}

export function addToElement(rootSelectorName : string, position : InsertPosition, block : Block) {
  const root = document.querySelector(rootSelectorName);
  if (root) {
    root.insertAdjacentElement(position, block.getContent());
    block.dispatchComponentDidMount();
  }
  return root;
}
