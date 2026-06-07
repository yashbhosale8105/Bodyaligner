import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching for large writes/replacements targeting page.tsx or globals.css...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            tool_calls = data.get("tool_calls", [])
            for tc in tool_calls:
                name = tc.get("name")
                args = tc.get("args", {})
                target_file = args.get("TargetFile", "")
                if target_file and ("page.tsx" in target_file or "globals.css" in target_file):
                    # Check write_to_file
                    if name == "write_to_file":
                        content = args.get("CodeContent", "")
                        if len(content) > 10000:
                            print(f"Step {step} | Tool {name} | File {target_file} | Content Length {len(content)}")
                    # Check replace_file_content
                    elif name == "replace_file_content":
                        content = args.get("ReplacementContent", "")
                        if len(content) > 10000:
                            print(f"Step {step} | Tool {name} | File {target_file} | Replacement Content Length {len(content)}")
                    # Check multi_replace_file_content
                    elif name == "multi_replace_file_content":
                        chunks = args.get("ReplacementChunks", [])
                        if isinstance(chunks, str):
                            try:
                                chunks = json.loads(chunks)
                            except:
                                pass
                        if isinstance(chunks, list):
                            for idx, chunk in enumerate(chunks):
                                rc = chunk.get("ReplacementContent", "")
                                if len(rc) > 10000:
                                    print(f"Step {step} | Tool {name} | File {target_file} | Chunk {idx} Length {len(rc)}")
        except Exception as e:
            pass
print("Search complete.")
