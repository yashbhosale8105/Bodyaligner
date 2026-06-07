with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

for term in ["pain-keyword", "pain_keyword", "painKeyword"]:
    print(f"\n--- Searching for {term} ---")
    for m in re.finditer(re.escape(term), content, re.IGNORECASE):
        start = max(0, m.start() - 300)
        end = min(len(content), m.end() + 1000)
        print(f"Position {m.start()}:\n{content[start:end]}\n" + "-"*80)
