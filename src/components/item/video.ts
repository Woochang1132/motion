import { BaseComponent } from '../components.js'


export class VideoComponent extends BaseComponent<HTMLElement>{
    constructor(title : string, src : string){
        super(`
        <section class='video'>
            <div class='video__player'>
                <iframe src=""class="video__iframe"></iframe>
                <h3 class="page-item__title video__title"></h3>
            </div>
        </section>`
    );

    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.covertToEmbededURL(src); // url => videoId로 변환해야 한다.
    }

    private covertToEmbededURL(url: string) : string{
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        console.log("match >>" , match)

        const videoId = match ? match[1] || match[2] : undefined;

        if(videoId){
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }

}