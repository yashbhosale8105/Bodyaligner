import json
import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_dd960535_edits"

# Recover Step 78 ReplacementContent (CSS)
with open(os.path.join(dir_path, "step_78_replace_file_content_0_raw.json"), "r", encoding="utf-8") as f:
    data = json.load(f)
rc = data.get("args", {}).get("ReplacementContent", "")
with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\step_78_css_recovered.txt", "w", encoding="utf-8") as out:
    out.write(rc)

# Recover Step 81 ReplacementContent (CSS)
with open(os.path.join(dir_path, "step_81_replace_file_content_0_raw.json"), "r", encoding="utf-8") as f:
    data = json.load(f)
rc = data.get("args", {}).get("ReplacementContent", "")
with open(r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\step_81_css_recovered.txt", "w", encoding="utf-8") as out:
    out.write(rc)

print("Done writing untruncated files.")
