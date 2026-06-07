import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_raw_steps"
files = os.listdir(dir_path)

for f in files:
    path = os.path.join(dir_path, f)
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        if "lounge.jpeg" in content or "clinic_frontage.png" in content:
            print(f"File: {f} | Size: {len(content)}")
            # Print matching lines
            for i, line in enumerate(content.splitlines()):
                if "lounge.jpeg" in line or "clinic_frontage.png" in line or "clinic-tour" in line:
                    print(f"  Line {i+1}: {line}")
    except Exception as e:
        pass
