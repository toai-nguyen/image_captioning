from flask import Flask, jsonify, request, Blueprint
from controllers.ImageController import ImageController
image_bp = Blueprint('image', __name__)

image_controller = ImageController()

@image_bp.route('/upload', methods=['POST'])
def upload():
    return image_controller.upload_and_caption()

@image_bp.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Image API is working!"})