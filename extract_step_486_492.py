import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            if step in [486, 492]:
                print(f"\nFound step {step} on line {line_num}!")
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    args = tc.get("args", {})
                    cc = args.get("CodeContent", "")
                    if cc:
                        filename = "extract_css_recovered.py" if step == 486 else "compile_css_recovered.py"
                        dest = f"c:\\Users\\ASUS\\OneDrive\\Desktop\\Bodyaligner\\{filename}"
                        with open(dest, "w", encoding="utf-8") as out:
                            out.write(cc)
                        print(f"  Saved to {dest} (length: {len(cc)})")
        except Exception as e:
            pass
print("Done.")
