from app.utils.file_utils import save_uploaded_file, get_file_path
from typing import Optional, Dict, Any
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.efficientnet import EfficientNetB7, preprocess_input
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import os
import pickle
class ImageService:
    def __init__(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.model_path = os.path.join(current_dir, '..', 'trained_model', 'caption_model.keras')
        self.tokenizer_path = os.path.join(current_dir, '..', 'trained_model', 'tokenizer.pkl')
        self.max_length = 37
        self.feature_extractor = EfficientNetB7(weights='imagenet', include_top=False, pooling='avg')
        self.tokenizer = None
        self._load_model()
        pass
    def _load_model(self):
        try: 
            if (os.path.exists(self.model_path)):
                self.caption_model = load_model(self.model_path)
                print("Model loaded successfully.")
            else:
                raise FileNotFoundError(f"Model file not found at {self.model_path}")
            
            if (os.path.exists(self.tokenizer_path)):
                with open(self.tokenizer_path, 'rb') as f:
                    self.tokenizer = pickle.load(f)
                print("Tokenizer loaded successfully.")
            else:
                raise FileNotFoundError(f"Tokenizer file not found at {self.tokenizer_path}")
        except Exception as e:
            print(f"Error loading model or tokenizer: {str(e)}")
            return None
    
    def _extract_features(self, image_path: str):
        try:
            img = load_img(image_path, target_size=(600, 600))
            img_array = img_to_array(img)
            img_array = preprocess_input(img_array)
            img_array = np.expand_dims(img_array, axis=0)
            features = self.feature_extractor.predict(img_array, verbose=0)
            
            return features[0]
        except Exception as e:
            print(f"Error extracting features from image: {str(e)}")
            return None
        
    def _generateCaption(self, photo_feature) -> str:
        try:
            in_text = 'startseq'
            for _ in range(self.max_length):
                # Convert text to sequence
                sequence = self.tokenizer.texts_to_sequences([in_text])[0]
                sequence = pad_sequences([sequence], maxlen=self.max_length)
                
                # Predict next word
                yhat = self.caption_model.predict([photo_feature.reshape((1, 2560)), sequence], verbose=0)
                yhat = np.argmax(yhat)
                
                # Convert prediction to word
                word = next((w for w, idx in self.tokenizer.word_index.items() if idx == yhat), None)
                
                # Break if end sequence or no word found
                if word is None or word == 'endseq':
                    break
                
                in_text += ' ' + word
            
            # Remove 'startseq' and return clean caption
            caption = ' '.join(in_text.split()[1:])
            return caption
        except Exception as e:
            print(f"Error generating caption: {str(e)}")
            return "Error generating caption"
    
    def processImageUpload(self, file):
        try:
            success, message = save_uploaded_file(file)
            if not success:
                return None, message
            filename = message
            file_path = get_file_path(filename)
            return file_path, None
        except Exception as e:
            print(f"Error processing image upload: {str(e)}")
            return None, str(e)
    def predictCaption(self, image_path):
        try:
            # store the uploaded image
            # image_path = save_uploaded_file(image_path)
            image_path, error = self.processImageUpload(image_path)
            if image_path is None:
                return None, "Error saving uploaded file"
            features = self._extract_features(image_path)
            if features is None:
                return None, "Error extracting features"
            
            caption = self._generateCaption(features)
            return caption, None
        except Exception as e:
            print(f"Error predicting caption: {str(e)}")
            return None, str(e)