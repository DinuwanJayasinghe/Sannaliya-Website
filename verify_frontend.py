from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_sannaliya_frontend(page: Page):
    # 1. Go to the homepage
    page.goto("http://localhost:5173/")

    # 2. Wait for animations and data
    time.sleep(3)

    # 3. Assert Branding
    brand = page.get_by_text("Sannaliya")
    expect(brand.first).to_be_visible()

    # 4. Scroll to Delivery section
    delivery_section = page.get_by_text("Islandwide Fast Delivery")
    delivery_section.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/slmap_fixed_v2.png")

    # 5. Scroll to Footer
    footer = page.locator("footer")
    footer.scroll_into_view_if_needed()
    time.sleep(1)
    page.screenshot(path="/home/jules/verification/footer_final.png")

    print("Screenshots captured successfully.")

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_sannaliya_frontend(page)
        finally:
            browser.close()
