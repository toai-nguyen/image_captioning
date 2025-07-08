from flask import Flask
from flask_cors import CORS
import os

def create_app(config_name='default'):
    app = Flask(__name__)
    
    from config import config
    app.config.from_object(config[config_name])
    
    # Initialize CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    from routes.image import image_bp
    
    app.register_blueprint(image_bp, url_prefix='/api')
    
    return app