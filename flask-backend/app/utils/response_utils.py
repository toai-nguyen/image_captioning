from flask import jsonify
from typing import Any, Dict, Optional

def success_response(data: Any = None, message: str = "Success", status_code: int = 200):
    response = {
        "success": True,
        "message": message,
        "data": data
    }
    return jsonify(response), status_code
def error_response(message: str = "An error occurred", status_code: int = 400, error_code: Optional[str] = None):
    response = {
        "success": False,
        "message": message,
        "error_code": error_code
    }
    return jsonify(response), status_code