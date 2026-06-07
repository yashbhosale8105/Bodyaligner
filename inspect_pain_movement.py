with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\pain_movement_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Look for occurrences containing "span" and "first.png" or "clinic_frontage.png" or "lounge.jpeg" or "treatment_demo.png"
# and let's search for "letter" or CSS classes that style these letters.
print("Searching for letter mask details...")
matches = re.finditer(r"([^\n]*PAIN[^\n]*\n[^\n]*MOVEMENT[^\n]*)|(class.*mask)|(background-clip.*text)|(span.*style.*backgroundImage)", content, re.IGNORECASE)

# Let's just find where "/assets/" occurs in close proximity to letters of PAIN or MOVEMENT
pos = 0
for term in ["first.png", "owner.png", "clinic_frontage.png", "lounge.jpeg", "treatment_demo.png", "clinic_interior.png", "full_shoot.jpeg", "first.jpeg", "4.png"]:
    count = content.lower().count(term)
    print(f"Term '{term}' occurs {count} times")

# Let's extract any occurrence that has a lot of letters or spans
print("\nExtracting long JSX sections with spans:")
for m in re.finditer(r"className=\"[^\"]*\"[^>]*>P</span>", content):
    start = max(0, m.start() - 200)
    end = min(len(content), m.end() + 2500)
    print(f"Match at {m.start()}:\n{content[start:end]}\n" + "="*50)

for m in re.finditer(r"className=\"[^\"]*\"[^>]*>M</span>", content):
    start = max(0, m.start() - 200)
    end = min(len(content), m.end() + 3500)
    print(f"Match at {m.start()}:\n{content[start:end]}\n" + "="*50)
