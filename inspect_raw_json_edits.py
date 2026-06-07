import json
import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_dd960535_edits"

for step in [52, 62, 70, 75, 76, 78, 81, 83]:
    files = [f for f in os.listdir(dir_path) if f"step_{step}_" in f and f.endswith("_raw.json")]
    for f in files:
        path = os.path.join(dir_path, f)
        try:
            with open(path, "r", encoding="utf-8") as file:
                data = json.load(file)
            args = data.get("args", {})
            print(f"\n==================================================")
            print(f"File: {f}")
            print(f"==================================================")
            print(f"TargetFile: {args.get('TargetFile')}")
            print(f"Description: {args.get('Description')}")
            
            tc_str = args.get("TargetContent", "")
            rc_str = args.get("ReplacementContent", "")
            if tc_str:
                print(f"\n--- TARGET CONTENT ---")
                print(tc_str)
            if rc_str:
                print(f"\n--- REPLACEMENT CONTENT ---")
                print(rc_str)
        except Exception as e:
            print(f"Error reading {f}: {e}")
