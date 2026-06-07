import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching logs for extract_css or compile_css...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "extract_css" in line or "compile_css" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                # Look for tool calls or content
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    name = tc.get("name")
                    args = tc.get("args", {})
                    for k, v in args.items():
                        if isinstance(v, str) and ("extract_css" in v or "compile_css" in v):
                            print(f"Step {step} | Tool {name} | Arg {k} | Length {len(v)}")
                            pos = v.find("extract_css")
                            if pos == -1:
                                pos = v.find("compile_css")
                            print(v[max(0, pos-100):min(len(v), pos+600)] + "...")
                
                content = data.get("content", "")
                if content and ("extract_css" in content or "compile_css" in content):
                    print(f"Step {step} | Content output | length {len(content)}")
                    pos = content.find("extract_css")
                    if pos == -1:
                        pos = content.find("compile_css")
                    print(content[max(0, pos-100):min(len(content), pos+600)] + "...")
            except Exception as e:
                pass
print("Done.")
