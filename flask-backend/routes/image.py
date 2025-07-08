from flask import Flask, jsonify, request, Blueprint
from app.controllers.image_controller import ImageController
image_bp = Blueprint('iamge', __name__)

image_controller = ImageController()

@image_bp.route('/upload', methods=['POST'])
def upload_and_caption():
    return image_controller.upload_and_caption()