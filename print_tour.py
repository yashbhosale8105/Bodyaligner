import json
import re

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching logs for clinic-tour and why-choose sections...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "clinic-tour" in line or "why-choose" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                tool_calls = data.get("tool_calls", [])
                
                # Check tool calls
                for tc in tool_calls:
                    name = tc.get("name")
                    args = tc.get("args", {})
                    # Look at contents
                    for k, v in args.items():
                        if isinstance(v, str) and ("clinic-tour" in v or "why-choose" in v) and len(v) > 500:
                            print(f"Line {line_num} | Step {step} | Tool {name} | Arg {k} | Length {len(v)}")
                            with open(f"step_{step}_{name}_{k}.txt", "w", encoding="utf-8") as out:
                                out.write(v)
                        elif isinstance(v, list):
                            # Chunks
                            for idx, chunk in enumerate(v):
                                if isinstance(chunk, dict):
                                    rc = chunk.get("ReplacementContent", "")
                                    if ("clinic-tour" in rc or "why-choose" in rc) and len(rc) > 500:
                                        print(f"Line {line_num} | Step {step} | Tool {name} | Chunk {idx} | Length {len(rc)}")
                                        with open(f"step_{step}_{name}_chunk_{idx}.txt", "w", encoding="utf-8") as out:
                                            out.write(rc)
                
                # Check view_file output in content
                content = data.get("content", "")
                if stype == "VIEW_FILE" and ("clinic-tour" in content or "why-choose" in content) and len(content) > 500:
                    print(f"Line {line_num} | Step {step} | VIEW_FILE content | Length {len(content)}")
                    with open(f"step_{step}_view_file.txt", "w", encoding="utf-8") as out:
                        out.write(content)
            except Exception as e:
                pass
