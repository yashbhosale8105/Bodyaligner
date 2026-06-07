import os
import re

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\backup\unpacked_source"
files = os.listdir(dir_path)

for f in files:
    if not f.endswith(".js"):
        continue
    path = os.path.join(dir_path, f)
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
            
        for term in ["why-choose", "clinic-tour", "spotlight-card"]:
            if term in content:
                print(f"File {f} contains '{term}'!")
                # Let's extract a snippet around it
                pos = content.find(term)
                start = max(0, pos - 500)
                end = min(len(content), pos + 1500)
                print(f"--- Snippet from {f} for '{term}' ---")
                print(content[start:end])
                print("-" * 50)
    except Exception as e:
        print(f"Error reading {f}: {e}")
