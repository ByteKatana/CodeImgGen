from flask import (Flask, render_template, redirect, request, url_for)
from utils import take_screenshot
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import Python3Lexer
from config import CODE, THEME
app = Flask(__name__)

@app.route("/")
def gen_code():
    formatter = HtmlFormatter(style=THEME)
    context= {
        "code": highlight(CODE, Python3Lexer(), formatter),
        "style_definitions": formatter.get_style_defs(),
        "style_bg_color": formatter.style.background_color,
    }
    return render_template("base.html", **context)

@app.route("/make-image")
def make_image():
    target_url = request.host_url + url_for("gen_code")
    take_screenshot(target_url)
    return redirect(url_for("gen_code"))