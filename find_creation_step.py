import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching logs for first introduction of clinic-tour or why-choose...")
found = False
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "clinic-tour" in line or "why-choose" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                # Look for model tool calls or code actions
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    name = tc.get("name")
                    if name in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
                        args = tc.get("args", {})
                        tfile = args.get("TargetFile", "")
                        if "page.tsx" in tfile or "globals.css" in tfile:
                            print(f"Step {step} | Tool {name} | File {tfile} | Description: {args.get('Description')}")
                            # Dump the full tool call to a file
                            with open(f"c:\\Users\\ASUS\\OneDrive\\Desktop\\Bodyaligner\\creation_step_{step}_{name}.json", "w", encoding="utf-8") as out:
                                json.dump(tc, out, indent=2)
                            found = True
            except Exception as e:
                pass
if not found:
    print("No creation step found with those terms in tool calls.")
else:
    print("Search complete.")
