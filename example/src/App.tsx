import { Turntable } from '../../.';

const images = [
  'https://via.placeholder.com/1200x800?text=You',
  'https://via.placeholder.com/1200x800?text=Spin',
  'https://via.placeholder.com/1200x800?text=Me',
  'https://via.placeholder.com/1200x800?text=Right',
  'https://via.placeholder.com/1200x800?text=Round',
  'https://via.placeholder.com/1200x800?text=Baby',
  'https://via.placeholder.com/1200x800?text=Right',
  'https://via.placeholder.com/1200x800?text=Round',
];

function App() {
  return <Turntable images={images} />;
}

export default App;
