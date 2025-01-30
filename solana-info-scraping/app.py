from bs4 import BeautifulSoup
import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

html_text = requests.get('https://solana.com/docs/intro/installation').text
soup = BeautifulSoup(html_text, 'lxml')

content = soup.find('main')

app = Flask(__name__)
CORS(app)

def get_data():
    data = []
    current_section = None

    if content:
        for element in content.find_all(['h2', 'h3', 'h4', 'p', 'span', 'ul', 'a'], recursive=True):
            tag_name = element.name
            if tag_name in ['h2', 'h3', 'h4']:
                current_section = {
                    "section": element.text.strip(),
                    "details": []
                }
                data.append(current_section)
            elif tag_name == 'a' and current_section:
                link_text = element.text.strip()
                link_href = element.get('href', '')
                current_section["details"].append({
                    "text": link_text,
                    "url": link_href
                })
            elif tag_name in ['p', 'span', 'ul'] and current_section:
                content_text = element.text.strip()
                if content_text:
                    current_section["details"].append({
                        "text": content_text
                    })
    return data

@app.route('/api/data', methods=['GET'])
def data():
    data = get_data()
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=4)
    return jsonify(data)

if __name__ == '__main__':
    app.run()