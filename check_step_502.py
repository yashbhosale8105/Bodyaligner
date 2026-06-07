import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_raw_steps"
files = os.listdir(dir_path)

step_502_files = [f for f in files if "502" in f]
print(f"Files for Step 502: {step_502_files}")
for f in step_502_files:
    print(f"\n--- {f} (size: {os.path.getsize(os.path.join(dir_path, f))}) ---")
    with open(os.path.join(dir_path, f), "r", encoding="utf-8") as file:
        content = file.read()
        print(content[:1000] + ("..." if len(content) > 1000 else ""))
