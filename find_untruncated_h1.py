with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# We search for <h1 and follow it until </h1>
matches = re.finditer(r"<h1[^>]*>.*?</h1>", content, re.DOTALL | re.IGNORECASE)
for idx, m in enumerate(matches):
    print(f"\nMatch {idx+1} (position {m.start()}):")
    print(m.group(0))
    print("="*60)
