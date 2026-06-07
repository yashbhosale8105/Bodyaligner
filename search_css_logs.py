import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching logs for globals.css edits with bento or spotlight...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "bento" in line or "spotlight" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    name = tc.get("name")
                    args = tc.get("args", {})
                    target_file = args.get("TargetFile", "")
                    if "globals.css" in target_file:
                        print(f"Step {step} | Tool {name} | File {target_file}")
                        # Print the replacement or target content
                        for k, v in args.items():
                            if isinstance(v, str) and ("bento" in v or "spotlight" in v):
                                print(f"  Arg {k} length: {len(v)}")
                                print(v[:1000] + "...")
                            elif isinstance(v, list):
                                for chunk in v:
                                    if isinstance(chunk, dict):
                                        rc = chunk.get("ReplacementContent", "")
                                        if "bento" in rc or "spotlight" in rc:
                                            print(f"  Chunk Replacement Content length: {len(rc)}")
                                            print(rc[:1000] + "...")
                
                content = data.get("content", "")
                if content and "globals.css" in content and ("bento" in content or "spotlight" in content):
                    print(f"Step {step} | Content output | length {len(content)}")
                    print(content[:1000] + "...")
            except Exception as e:
                pass
print("Done.")
