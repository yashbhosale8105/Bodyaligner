with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\pain_movement_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Find any image extensions
paths = re.findall(r"[\w/._-]+\.(?:png|jpe?g|gif|webp|svg)", content, re.IGNORECASE)
print(f"Unique image paths found in recovered file: {set(paths)}")

# Find any style attribute containing background or background-image
styles = re.findall(r"style=\{\{[^}]*background[^}]*\}\}", content, re.IGNORECASE)
print(f"\nUnique style background attributes: {set(styles)}")

# Let's search for the words PAIN and MOVEMENT in the logs and print 500 chars before and after them
print("\nScanning for occurrences of 'PAIN' in recovered logs:")
for m in re.finditer(r"PAIN", content):
    start = max(0, m.start() - 300)
    end = min(len(content), m.end() + 300)
    print(f"Match at {m.start()}:\n{content[start:end]}\n" + "="*80)
