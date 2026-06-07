with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\backup\unpacked_source\template.html", "r", encoding="utf-8") as f:
    content = f.read()

import re

for term in ["choose", "clinic"]:
    print(f"\n--- Occurrences of '{term}' ---")
    for m in re.finditer(re.escape(term), content, re.IGNORECASE):
        start = max(0, m.start() - 200)
        end = min(len(content), m.end() + 500)
        print(f"Position {m.start()}:\n{content[start:end]}\n" + "-"*40)
