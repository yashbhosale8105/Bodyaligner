import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_raw_steps"
files = os.listdir(dir_path)

for f in files:
    path = os.path.join(dir_path, f)
    if not os.path.isfile(path):
        continue
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        
        if "why-choose" in content or "whyChoose" in content:
            print(f"\n==================================================")
            print(f"File: {f} (size: {len(content)})")
            print(f"==================================================")
            # Find all occurrences of why-choose
            for i, line in enumerate(content.splitlines()):
                if "why-choose" in line or "whyChoose" in line:
                    print(f"Line {i+1}: {line}")
    except Exception as e:
        pass
