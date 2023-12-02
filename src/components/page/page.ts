import { BaseComponent, Component } from '../components.js';

export interface Composable{
    addChild(child : Component) : void
}
type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter'| 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

interface SectionContainer extends Component, Composable{
    setOnCloseListener(listener : OnCloseListener) : void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>) : void;
}

type SectionContainerConstructor = {
    new() : SectionContainer;
}

 export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer{
    private closeListener?: OnCloseListener;
    private dragStateListener?: OnDragStateListener<PageItemComponent>
    constructor(){
        super(`
            <li draggable="true" class="page-item">
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
            this.element.addEventListener('dragstart', (event: DragEvent) => {
                this.onDragStart(event);
            })
            this.element.addEventListener('dragend', (event: DragEvent) => {
                this.onDragEnd(event);
            })
            this.element.addEventListener('dragenter', (event: DragEvent) => {
                this.onDragEnter(event);
            })
            this.element.addEventListener('dragleave', (event: DragEvent) => {
                this.onDragLeave(event);
            })
    }
    onDragStart(_: DragEvent){
        this.notifyDragObserver('start')
    }
    onDragEnd(_: DragEvent){
        this.notifyDragObserver('stop')
    }
    onDragEnter(_: DragEvent){
        this.notifyDragObserver('enter')
    }
    onDragLeave(_: DragEvent){
        this.notifyDragObserver('leave')
    }
    notifyDragObserver(state: DragState){
        this.dragStateListener && this.dragStateListener(this, state);
    }

    addChild(child: Component){
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);    
    }
    setOnCloseListener(listener : OnCloseListener) {
        this.closeListener = listener;
    }
    setOnDragStateListener(listner: OnDragStateListener<PageItemComponent>){
            this.dragStateListener = listner;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable{
    constructor(private pageItemConstructor : SectionContainerConstructor) {
        super('<ul class="page"></ul>');

        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        })
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        })
    }
    onDragOver(event: DragEvent){
        event.preventDefault();
    }
    onDrop(event: DragEvent){
        event.preventDefault();
    }

    addChild(section: Component){
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        })
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            console.log(target, state);
        })


    }
}