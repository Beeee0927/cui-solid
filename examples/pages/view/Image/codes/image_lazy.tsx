export default `import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import img7 from './7.jpg';
import img8 from './8.jpg';
import img9 from './9.jpg';
import img10 from './10.jpg';

const verticalUrlList = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
]

<Space dir="v">
    <div class="demo-image-lazy-vertical">
        <For each={verticalUrlList}>
            {(url: string) => {
                return <Image src={url} lazy scrollContainer='.demo-image-lazy-vertical'/>
            }}
        </For>
    </div>
</Space>`
