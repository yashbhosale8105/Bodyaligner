import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_conversations_data"
files = os.listdir(dir_path)

for f in files:
    if not f.endswith(".txt"):
        continue
    path = os.path.join(dir_path, f)
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        print(f"\n==================================================")
        print(f"File: {f} (size: {len(content)} bytes)")
        print(f"==================================================")
        print(content)
    except Exception as e:
        print(f"Error reading {f}: {e}")
