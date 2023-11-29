import { Component } from './components/components.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';

class App{
    private readonly page : Component & Composable
    constructor(appRoot : HTMLElement){
        this.page = new PageComponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/seed/picsum/200/300')
        this.page.addChild(image);

        const video = new VideoComponent('Video Title', 'https://youtu.be/DXB84VgBP18?t=8');
        this.page.addChild(video);

        const note = new NoteComponent('note Title', 'Note Body')
        this.page.addChild(note);

        const todo = new TodoComponent('Todo Title', 'Todo Item')
        this.page.addChild(todo);

    }
}

new App(document.querySelector('.document')! as HTMLElement);