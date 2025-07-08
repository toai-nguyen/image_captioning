import os
from werkzeug.utils import secure_filename

from flask import current_app

def allowed_file(filename: str) -> bool:
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']
        
def save_uploaded_file(file) -> tuple[bool, str]:
    """Save uploaded file and return success status and filename/error message"""
    try:
        if file.filename == '':
            return False, "No file selected"
        
        if not allowed_file(file.filename):
            return False, "File type not allowed"
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        return True, filename
    except Exception as e:
        return False, str(e)

def get_file_path(filename: str) -> str:
    """Get full path of uploaded file"""
    return os.path.join(current_app.config['UPLOAD_FOLDER'], filename)