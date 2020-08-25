import unittest
import os
import platform
import json

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class PlayerTests(unittest.TestCase):
    ROOT = os.getenv('ROOT')

    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1600x1000')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--no-zygote')
        chrome_options.add_argument('--hide-scrollbars')
        chrome_options.add_argument('--enable-logging')
        chrome_options.add_argument('--log-level=0')
        chrome_options.add_argument('--v=99')
        chrome_options.add_argument('--ignore-certificate-errors')
        if platform.system() != "Windows":
            chrome_options.add_argument('--headless')
            chrome_options.add_argument('--single-process')
        self.browser = webdriver.Chrome(options=chrome_options)
        self.addCleanup(self.browser.quit)

    # Step definitions
    def step_start(self, step):
        button = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "btn-start")),
            "Failed to locate start button"
        )
        button.click()

    def step_enter_postcode(self, step):
        pc_input = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "user_postcode")),
            "Failed to locate postcode input"
        )
        pc_input.send_keys(step['value'])
        self.assertEqual(pc_input.get_attribute('value'), step['value'])

    def step_continue(self, step):
        button = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "btn-continue")),
            "Failed to locate continue button"
        )
        button.click()

    step_functions = {
        "start": step_start,
        "enter_postcode": step_enter_postcode,
        "continue": step_continue,
    }

    # Common

    def open_json(self, path):
        with open(path) as f:
            return json.load(f)

    def run_script(self, scriptname):
        script = self.open_json(f'test/scripts/{scriptname}.json')
        entry_path = script.get("entry_path", "")
        self.browser.get(self.ROOT + entry_path)
        steps = script.get("steps", [])
        for step in steps:
            step_type = step.get('type', "")
            func = self.step_functions.get(step_type)
            if func is None:
                raise TypeError(f'{step_type} is not a valid step type')
            else:
                func(self, step)
        if "data" in script:
            return script["data"]
        return

    # Simple pages
    def page_home(self):
        return

    def assertNotices(self, expected):
        notices = WebDriverWait(self.browser, 10).until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "notice")),
            "Failed to locate any notices"
        )
        self.assertEqual(len(expected), len(notices), "Located an unexpected number of notices")
        for idx, notice in enumerate(notices):
            self.assertEqual(notice.text, expected[idx], "Unexpected notice contents")


    ## Tests

    # Test start page
    def test_start(self):
        self.run_script('test_start')

    # Test a postcode can be input
    def test_enter_postcode(self):
        self.run_script("test_enter_postcode")

    # Test an invalid postcode is rejected
    def test_enter_postcode_invalid(self):
        self.run_script("test_enter_postcode_invalid")
        WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "postcode-error")),
            "Failed to locate error message"
        )
        return

    # Test a postcode with nonstandard characters is normalised
    def test_enter_postcode_normalised(self):
        data = self.run_script("test_enter_postcode_normalised")
        if data is None:
            raise TypeError("Missing payload data")
        expected = data.get("normalised_postcode", None)
        if expected is None:
            raise TypeError("Missing payload data: normalised_postcode")
        title = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1")),
            "Failed to locate results title"
        )
        self.assertEqual(title.text, "Results for " + expected)
        return

    # Test that expected results show
    def test_results(self):
        data = self.run_script("test_results")
        if data is None:
            raise TypeError("Missing payload data")
        expected = data.get("notices", [])
        self.assertNotices(expected)
        return

    # Test that default results show
    def test_results_default(self):
        data = self.run_script("test_results_default")
        if data is None:
            raise TypeError("Missing payload data")
        expected = data.get("notices", [])
        self.assertNotices(expected)

    # Test that the results page can be accessed directly
    def test_results_bookmarked(self):
        data = self.run_script("test_results_bookmarked")
        if data is None:
            raise TypeError("Missing payload data")
        expected = data.get("notices", [])
        self.assertNotices(expected)
