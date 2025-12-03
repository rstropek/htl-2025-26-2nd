import './styles.css';
import { FishManager, HorizontalFish, CrissCrossFish, SinusFish } from './fish';

// Note that we can import images as strings. The result will be the path to the image.
import fish1 from '../assets/fish1.png';
import fish2 from '../assets/fish2.png';
import fish3 from '../assets/fish3.png';
import fish4 from '../assets/fish4.png';
import fish5 from '../assets/fish5.png';
import fish6 from '../assets/fish6.png';

const aquarium = document.getElementById('aquarium')!;

const manager = new FishManager(aquarium);

// Add sample fish
// Horizontal Fish
manager.addFish(new HorizontalFish(aquarium, fish1, 100, 100, 1.5, 0));
manager.addFish(new HorizontalFish(aquarium, fish2, 500, 200, -2, 0));

// Random Fish
manager.addFish(new CrissCrossFish(aquarium, fish3, 200, 300, 1.5, 1.5));
manager.addFish(new CrissCrossFish(aquarium, fish4, 400, 400, -1.5, 2));

// Sinus Fish
manager.addFish(new SinusFish(aquarium, fish5, 50, 150, 1.5));
manager.addFish(new SinusFish(aquarium, fish6, 600, 350, -1.5));

function animate() {
  manager.update();

  // Check: Can you remember what `requestAnimationFrame` does?
  requestAnimationFrame(animate);
}

animate();
