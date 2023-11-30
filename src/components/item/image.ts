import { BaseComponent } from '../components.js';

export class ImageComponent extends BaseComponent<HTMLElement>{
   
    constructor(title: string, url: string){
        super(
            `<section class="image">
                <div class="image__holder">
                    <img src="" alt="" class="image__thumbnail">
                </div>
                <h2 class="image__title"></h2>
            </section>
            `)

               const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        imageElement.title = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        titleElement.textContent = title;
    }
    

}