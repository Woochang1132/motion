import { Component } from './components/components.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

type InputConponentConstructor<T = MediaSectionInput | TextSectionInput> = {
    new () : T;
}

class App{
    private readonly page : Component & Composable
    constructor(appRoot : HTMLElement,private dialogRoot : HTMLElement){
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
         
/*         
        const image = new ImageComponent('Image Title', 'https://picsum.photos/seed/picsum/200/300')
        this.page.addChild(image); 

        const video = new VideoComponent('Video Title', 'https://youtu.be/DXB84VgBP18?t=8');
        this.page.addChild(video); 

        const note = new NoteComponent('note Title', 'Note Body')
        this.page.addChild(note);

        const todo = new TodoComponent('Todo Title', 'Todo Item')
        this.page.addChild(todo); 
*/        
        this.bindElementDialog<MediaSectionInput>('#new-image', MediaSectionInput, 
        (input : MediaSectionInput) => new ImageComponent(input.title, input.url))

        this.bindElementDialog<MediaSectionInput>('#new-video',MediaSectionInput,
        (input : MediaSectionInput) => new VideoComponent(input.title, input.url))

        this.bindElementDialog<TextSectionInput>('#new-note', TextSectionInput,
        (input : TextSectionInput) => new NoteComponent(input.title, input.body))

        this.bindElementDialog<TextSectionInput>('#new-todo', TextSectionInput,
        (input : TextSectionInput) => new TodoComponent(input.title, input.body))


    }
    private bindElementDialog<T extends MediaSectionInput | TextSectionInput>(
     selector: string, 
     InputComponent: InputConponentConstructor<T>,
     makeSection: (input: T) => Component,
     )
     {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new InputComponent();
            dialog.addChild(inputSection);
            dialog.attachTo(this.dialogRoot);
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot)
            });

            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            })
        })
     }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);