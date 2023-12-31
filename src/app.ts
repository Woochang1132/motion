import { Component } from './components/components.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';

type InputConponentConstructor<T = (MediaData | TextData) & Component> = {
    new () : T;
}

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
      this.page = new PageComponent(PageItemComponent);
      this.page.attachTo(appRoot);
  
      this.bindElementToDialog<MediaSectionInput>(
        '#new-image',
        MediaSectionInput,
        (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
      );
  
      this.bindElementToDialog<MediaSectionInput>(
        '#new-video',
        MediaSectionInput,
        (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
      );
  
      this.bindElementToDialog<TextSectionInput>(
        '#new-note',
        TextSectionInput,
        (input: TextSectionInput) => new NoteComponent(input.title, input.body)
      );
  
      this.bindElementToDialog<TextSectionInput>(
        '#new-todo',
        TextSectionInput,
        (input: TextSectionInput) => new TodoComponent(input.title, input.body)
      );

      //For demo : 
      this.page.addChild(new ImageComponent('ImageTitle', 'https://picsum.photos/800/400'));
      this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/DXB84VgBP18?t=8'));
      this.page.addChild(new NoteComponent('Note Title', "Don't forgot to code your dream"))
      this.page.addChild(new TodoComponent('Todo Title', "TypeScript Course"))
      this.page.addChild(new ImageComponent('ImageTitle2', 'https://picsum.photos/800/400'));
      this.page.addChild(new VideoComponent('Video Title2', 'https://youtu.be/DXB84VgBP18?t=8'));
      this.page.addChild(new NoteComponent('Note Title2', "Don't forgot to code your dream"))
      this.page.addChild(new TodoComponent('Todo Title2', "TypeScript Course"))
  
    }
  
    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
      selector: string,
      InputComponent: InputConponentConstructor<T>,
      makeSection: (input: T) => Component
    ) {
      const element = document.querySelector(selector)! as HTMLButtonElement;
      element.addEventListener('click', () => {
        const dialog = new InputDialog();
        const input = new InputComponent();
        dialog.addChild(input);
        dialog.attachTo(this.dialogRoot);
  
        dialog.setOnCloseListener(() => {
          dialog.removeFrom(this.dialogRoot);
        });
        dialog.setOnSubmitListener(() => {
          const image = makeSection(input);
          this.page.addChild(image);
          dialog.removeFrom(this.dialogRoot);
        });
      });
    }
  }
  

new App(document.querySelector('.document')! as HTMLElement, document.body);