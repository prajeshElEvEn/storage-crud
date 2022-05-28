import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './assets/config';

function App() {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const uploadFile = async () => {
    if (image) {
      const imageRef = ref(storage, `images/wallpapers/${image.name}`)
      await uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setImageUrl(url)
        })
      })
    }
  }

  return (
    <div className="App">
      <div>
        <input
          type='file'
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
        />
        <input
          type='submit'
          value='Upload'
          onClick={() => {
            uploadFile()
          }}
        />
      </div>
      <div>
        {imageUrl}
      </div>
    </div>
  );
}

export default App;
