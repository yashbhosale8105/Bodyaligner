import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Scanning for VIEW_FILE on page.tsx...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            tool_calls = data.get("tool_calls", [])
            for tc in tool_calls:
                if tc.get("name") == "view_file":
                    args = tc.get("args", {})
                    path = args.get("AbsolutePath", "")
                    if "page.tsx" in path:
                        print(f"Step {step} | VIEW_FILE on page.tsx | Start: {args.get('StartLine')} | End: {args.get('EndLine')}")
            
            # Check system outputs of VIEW_FILE
            stype = data.get("type")
            if stype == "VIEW_FILE":
                content = data.get("content", "")
                if "page.tsx" in content:
                    # Look at lines range in content snippet
                    pos = content.find("Showing lines")
                    range_str = content[pos:pos+50] if pos != -1 else "Unknown range"
                    print(f"Step {step} | VIEW_FILE output | {range_str} | Length: {len(content)}")
        except Exception as e:
            pass
