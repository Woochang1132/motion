import { Component } from './components/components.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

class App{
    private readonly page : Component & Composable
    constructor(appRoot : HTMLElement, dialogRoot : HTMLElement){
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

        const imageBtn = document.querySelector('#new-image')! as HTMLElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })
            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            })
        });


        const videoBtn = document.querySelector('#new-video')! as HTMLElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new MediaSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })
            dialog.setOnSubmitListener(() => {
                const image = new VideoComponent(inputSection.title, inputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            })
        });


        const noteBtn = document.querySelector('#new-note')! as HTMLElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })
            dialog.setOnSubmitListener(() => {
                const note = new NoteComponent(inputSection.title, inputSection.body)
                this.page.addChild(note);
                dialog.removeFrom(dialogRoot);
            })
        });


        const todoBtn = document.querySelector('#new-todo')! as HTMLElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new TextSectionInput();
            dialog.addChild(inputSection);
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            })
            dialog.setOnSubmitListener(() => {
                const note = new TodoComponent(inputSection.title, inputSection.body)
                this.page.addChild(note);
                dialog.removeFrom(dialogRoot);
            })
        });



    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);