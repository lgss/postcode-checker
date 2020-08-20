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
    
    ## Step definitions
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

    def step_continue(self,step):
        button = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "btn-continue")),
            "Failed to locate start button"
        )
        button.click()

    step_types = {
        "start": step_start,
        "enter_postcode": step_enter_postcode,
        "continue": step_continue,
    }

    ## Common
    
    def open_json(self, path):
        with open(path) as f:
            return json.load(f)

    def run_script(self, scriptname):
        script = self.open_json(f'test/scripts/{scriptname}.json')
        entry_path = script.get("entry_path", "")
        self.browser.get(self.ROOT + entry_path)
        steps = script.get("steps", [])
        for step in steps:
            step_type = step.get('type',"")
            func = self.step_types.get(step_type)
            if func is None:
                raise TypeError(f'{step_type} is not a valid step type')
            else:
                func(self,step)
        if "data" in script:
            return script["data"]
        return
    
    ## Simple pages
    def page_home(self):
        return

    ## Tests
   
    def test_start(self):
        self.run_script('test_start')
        
    def test_enter_postcode(self):
        self.run_script("test_enter_postcode")
        
    def test_check_postcode(self):
        self.run_script("test_check_postcode")
        
    def test_results(self):
        self.run_script("test_results")
    
    def test_results_default(self):
        self.run_script("test_results_default")

    def test_results_bookmarked(self):
        self.run_script("test_results_bookmarked")

