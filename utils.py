from playwright.sync_api import sync_playwright
from pathlib import Path
from config import IMG_FILENAME, IMG_DIR
def unique_path(directory, filename):
    counter = 0
    while True:
        counter += 1
        prefixed_filename= "{:03d}_".format(counter) + filename
        path = Path(directory) / prefixed_filename
        if not path.exists():
            return path

def take_screenshot(url):
    with sync_playwright() as p:
        webkit = p.webkit
        browser = webkit.launch()
        browser_context = browser.new_context(device_scale_factor=2)
        page = browser_context.new_page()
        page.goto(url)
        el = page.locator(".my_code")
        screenshot_bytes = el.screenshot()
        browser.close()
        directory= IMG_DIR
        filename = IMG_FILENAME
        filepath = unique_path(directory, filename)
        with open(filepath, mode="wb") as img:
            img.write(screenshot_bytes)

if __name__ == "__main__":
    take_screenshot("http://localhost:5000")
