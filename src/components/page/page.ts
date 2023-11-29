import { BaseComponent, Component } from '../components.js';

export interface Composable{
    addChild(child : Component) : void
}
type OnCloseListener = () => void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{
    private closeListener?: OnCloseListener;
    constructor(){
        super(`
            <li class="page-item">
                <section class="page-item__body">
                    <div class="page-item__controals">
                        <button class="close">&times;</button>
                    </div>
                </section>
            </li>`);
            const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
            closeBtn.onclick = () => {
                this.closeListener && this.closeListener();
            }
    }
    addChild(child: Component){
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);    
    }
    setOnCloseListener(listener : OnCloseListener) {
        this.closeListener = listener;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor() {
        super('<ul class="page"></ul>')
    }

    addChild(section: Component){
        const item = new PageItemComponent();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })
    }
}