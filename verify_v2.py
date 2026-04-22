from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_sannaliya_v2(page: Page):
    # 1. Home Page & Slider
    page.goto("http://localhost:5173/")
    time.sleep(5) # Wait for slider and animations
    page.screenshot(path="/home/jules/verification/home_v2_hero.png")

    # 2. Dark Mode Toggle
    toggle = page.locator('button[aria-label="Toggle Theme"]').first
    if not toggle.is_visible():
        # Fallback if tooltip/aria-label differs
        toggle = page.locator('button:has(svg[data-testid="DarkModeOutlinedIcon"])')

    toggle.click()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/home_v2_dark.png")

    # 3. Product Discovery (Scroll to Trending)
    trending = page.get_by_text("Trending Now")
    trending.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/home_v2_trending.png")

    # 4. Product Detail & Zoom
    first_product = page.locator('a[href^="/product/"]').first
    first_product.click()
    time.sleep(3)

    # Verify Size selection
    size_l = page.get_by_role("button", name="L")
    if size_l.is_visible():
        size_l.click()
        time.sleep(1)

    page.screenshot(path="/home/jules/verification/product_detail_v2.png")

    # Hover for zoom
    zoom_area = page.locator('.cursor-zoom-in').first
    zoom_area.hover()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/product_zoom_v2.png")

    print("Verification screenshots captured.")

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_sannaliya_v2(page)
        finally:
            browser.close()
