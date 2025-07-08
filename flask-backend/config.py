import os 
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    UPLOAD_FOLDER= os.getenv('UPLOAD_FOLDER', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'webp'}
    
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000, http://localhost:5000,http://localhost:5173').split(',')
    
    # api setting
    API_TITLE = 'Image-Captioning-API'
    API_VERSION = 'v1'
    
class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}