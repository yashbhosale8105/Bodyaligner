with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt", "r", encoding="utf-8") as f:
    content = f.read()

import re

# We want to search for occurrences of "pain-removebg-preview" or similar inside a JSX element
print("Searching for JSX snippets containing the word images...")
for m in re.finditer(r"className=\"[^\"]*hero[^\"]*\".*?<h1", content, re.DOTALL | re.IGNORECASE):
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 2000)
    print(f"Match at {m.start()}:\n{content[start:end]}\n" + "="*80)

# Let's search for "pain-removebg" or "Video_background_for_physiothera" and print the surrounding JSX
for term in ["pain-removebg", "Video_background_for_physiothera"]:
    print(f"\n--- Snippets for {term} ---")
    for m in re.finditer(re.escape(term), content, re.IGNORECASE):
        start = max(0, m.start() - 500)
        end = min(len(content), m.end() + 1500)
        print(f"Match at {m.start()}:\n{content[start:end]}\n" + "="*80)
        break # Just print the first one for each term to see the format
