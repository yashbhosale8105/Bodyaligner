with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Look for occurrences containing "pain-removebg-preview"
print("Scanning for the entire h1 block...")
for m in re.finditer(r"pain-removebg-preview", content, re.IGNORECASE):
    start = max(0, m.start() - 1000)
    end = min(len(content), m.end() + 2000)
    print(f"Match at position {m.start()}:\n{content[start:end]}\n" + "="*85)
