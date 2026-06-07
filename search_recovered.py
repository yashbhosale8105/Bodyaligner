import re

recovered_path = "recovered_sections.txt"

print("Searching recovered_sections.txt for why-choose...")
with open(recovered_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of why-choose
for m in re.finditer(r'(why-choose|whyChoose|Why Us)', content, re.IGNORECASE):
    start = max(0, m.start() - 300)
    end = min(len(content), m.end() + 1500)
    print(f"\n--- Occurrence at position {m.start()} ---")
    print(content[start:end])
    print("="*60)
