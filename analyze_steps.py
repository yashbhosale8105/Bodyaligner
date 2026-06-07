import json
import sys

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Scanning steps for page.tsx edits...")
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
                    steps_summary.append({
                        "step": step,
                        "type": "tool_call",
                        "tool_name": name,
                        "file": target_file,
                        "desc": args.get("Description", "") or args.get("Instruction", "")
                    })
            
            content = data.get("content", "")
            if content:
                # If content is a code change or view file output
                if "page.tsx" in content or "globals.css" in content:
                    steps_summary.append({
                        "step": step,
                        "type": "content_output",
                        "stype": stype,
                        "length": len(content),
                        "snippet": content[:200].replace('\n', ' ')
                    })
        except Exception as e:
            pass

for s in steps_summary:
    print(json.dumps(s))
