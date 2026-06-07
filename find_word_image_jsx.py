with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\pain_movement_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

for term in ["pain-removebg-preview.png", "Video_background_for_physiothera", "removebg-preview"]:
    print(f"\n--- Searching for {term} ---")
    for m in re.finditer(re.escape(term), content, re.IGNORECASE):
        start = max(0, m.start() - 500)
        end = min(len(content), m.end() + 1500)
        print(f"Position {m.start()}:\n{content[start:end]}\n" + "-"*80)
