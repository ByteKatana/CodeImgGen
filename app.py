from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import take_screenshot
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import Python3Lexer
from config import CODE, THEME
app = Flask(__name__)

@app.route("/")
@app.route("/api/code/python/generate", methods=['POST'])
def gen_code():
    formatter = HtmlFormatter(style=THEME)
    context= {
        "code": highlight(CODE, Python3Lexer(), formatter),
        "style_definitions": formatter.get_style_defs(),
        "style_bg_color": formatter.style.background_color,
    }
    return render_template("base.html", **context)
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

@app.route("/api/image/generate", methods=['POST'])
def make_image():
    try:
        # Assuming take_screenshot now returns the path or URL of the generated image
        image_url = take_screenshot(request.json.get('url')) if request.is_json else None

        if not image_url:
            return jsonify({
                "success": False,
                "error": "No URL provided or screenshot generation failed"
            }), 400

        return jsonify({
            "success": True,
            "data": {
                "image_url": image_url
            }
        }), 200
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