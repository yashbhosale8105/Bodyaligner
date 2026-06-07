import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"
out_path = "recovered_sections.txt"

print("Searching logs and writing full matched items to file...")
with open(log_path, 'r', encoding='utf-8') as f:
    with open(out_path, 'w', encoding='utf-8') as out:
        for line_num, line in enumerate(f, 1):
            if "why-choose" in line or "clinic-tour" in line:
                try:
                    data = json.loads(line)
                    step = data.get("step_index")
                    stype = data.get("type")
                    source = data.get("source")
                    
                    out.write(f"\n============================================================\n")
                    out.write(f"LINE {line_num} | STEP {step} | TYPE {stype} | SOURCE {source}\n")
                    out.write(f"============================================================\n")
                    
                    # Dump the JSON nicely
                    out.write(json.dumps(data, indent=2))
                    out.write("\n")
                except Exception as e:
                    out.write(f"ERROR ON LINE {line_num}: {e}\n")
                    
print("Done! Check recovered_sections.txt")
