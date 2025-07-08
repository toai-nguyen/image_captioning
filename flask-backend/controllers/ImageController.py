from flask import request
from app.services.image_service import ImageService
from app.utils.response_utils import success_response, error_response

class ImageController:
    def __init__(self):
        self.image_service = ImageService()
    
    def upload_and_caption(self):
        try:
            caption = self.image_service.generateCaption(request.files['file'])
            return "Upload and caption successful", 200
        except Exception as e:
            return error_response(message=str(e), status_code=500)