import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"
output_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\steps_list.txt"

steps_summary = []

with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            stype = data.get("type")
            source = data.get("source")
            
            tool_calls = data.get("tool_calls", [])
            for tc in tool_calls:
                name = tc.get("name")
                args = tc.get("args", {})
                target_file = args.get("TargetFile", "")
                if target_file and ("page.tsx" in target_file or "globals.css" in target_file):
                    steps_summary.append(
                        f"Step {step} | Tool Call: {name} | File: {target_file} | Desc: {args.get('Description', '') or args.get('Instruction', '')}"
                    )
            
            content = data.get("content", "")
            if content:
                if "page.tsx" in content or "globals.css" in content:
                    steps_summary.append(
                        f"Step {step} | Content Output: {stype} | Length: {len(content)} | Snippet: {content[:150].replace('\n', ' ')}"
                    )
        except Exception as e:
            pass

print(f"Writing {len(steps_summary)} entries to {output_path}...")
with open(output_path, 'w', encoding='utf-8') as out:
    for s in steps_summary:
        out.write(s + "\n")
print("Done!")
