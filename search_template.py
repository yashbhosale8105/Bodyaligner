with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\backup\unpacked_source\template.html", "r", encoding="utf-8") as f:
    content = f.read()

print(f"File length: {len(content)}")
# Search for lowercase terms
for term in ["why", "clinic", "tour", "choose"]:
    count = content.lower().count(term)
    print(f"Term '{term}' occurs {count} times")
