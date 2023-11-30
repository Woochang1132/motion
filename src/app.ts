import { Component } from './components/components.js';
import { InputDialog } from './components/dialog/dialog.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

class App{
    private readonly page : Component & Composable
    constructor(appRoot : HTMLElement){
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/seed/picsum/200/300')
        this.page.addChild(image);

        const video = new VideoComponent('Video Title', 'https://youtu.be/DXB84VgBP18?t=8');
        this.page.addChild(video);

        const note = new NoteComponent('note Title', 'Note Body')
        this.page.addChild(note);

        const todo = new TodoComponent('Todo Title', 'Todo Item')
        this.page.addChild(todo);

        const imageBtn = document.querySelector('#new-image')! as HTMLElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(document.body);
            })
            dialog.setOnSubmitListener(() => {
                // 섹션을 만들어서 페이지에 추가 해준다.
                dialog.removeFrom(document.body);
            })

            dialog.attachTo(document.body)
        })

    }
}

new App(document.querySelector('.document')! as HTMLElement);