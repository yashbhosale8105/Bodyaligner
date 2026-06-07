with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# We search for any text containing "massive-title" or "title-row" or "title-base"
print("Searching for occurrences of 'massive-title'...")
for m in re.finditer(r"massive-title", content, re.IGNORECASE):
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 2000)
    print(f"\nOccurrence at {m.start()}:")
    print(content[start:end])
    print("="*60)
