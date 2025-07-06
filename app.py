from flask import Flask, request, jsonify
from flask_cors import CORS
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import Python3Lexer
from config import CODE, THEME
import os

app = Flask(__name__)

# Get environment-specific configuration
ENVIRONMENT = os.getenv('FLASK_ENV', 'development')
ALLOWED_ORIGINS = {
    'development': [
        'http://localhost:5173',
        'http://127.0.0.1:5173'
    ],
    'production': [
        'https://your-production-domain.com'
    ]
}

# CORS configuration based on environment
CORS(app, resources={
    r"/api/*": {
        "origins": ALLOWED_ORIGINS.get(ENVIRONMENT, []),
        "methods": ["POST", "OPTIONS"],
        "allow_headers": [
            "Content-Type",
            "Authorization",  # for token-based auth.
        ],
        "max_age": 3600,
        # Only enable credentials if you need authentication
        #"supports_credentials": ENVIRONMENT == 'production'
    }
})


#Rate Limiting
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)


# Add security headers middleware
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

'''
# Authentication
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Add your authentication logic here
        # For example, checking for a valid token
        # auth_header = request.headers.get('Authorization')
        # if not auth_header or not is_valid_token(auth_header):
        #     return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

'''

@app.route("/api/code/python/generate", methods=['POST'])
@limiter.limit("10 per minute")
# @require_auth # Uncomment this line if you need authentication
def gen_code():
    try:
        formatter = HtmlFormatter(style=THEME)
        # Get code from request if provided, otherwise use default CODE
        code_input = request.json.get('code', CODE) if request.is_json else CODE

        highlighted_code = highlight(code_input, Python3Lexer(), formatter)

        response = {
            "success": True,
            "data": {
                "code": highlighted_code,
                "style_definitions": formatter.get_style_defs(),
                "style_bg_color": formatter.style.background_color,
            }
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    if ENVIRONMENT == 'production':
        from waitress import serve
        serve(app, host='0.0.0.0', port=8080)
    else:
        app.run(debug=True)