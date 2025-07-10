from flask import request
from services.ImageService import ImageService
from app.utils.response_utils import success_response, error_response

class ImageController:
    def __init__(self):
        self.image_service = ImageService()
    
    def upload_and_caption(self):
        try:
            if 'image' not in request.files:
                return error_response(message="No image file provided", status_code=400)
            
            caption = self.image_service.generateCaption(request.files['image'])
            return success_response(data={"caption": caption}, message="Caption generated successfully")
        except Exception as e:
            return error_response(message=str(e), status_code=500)