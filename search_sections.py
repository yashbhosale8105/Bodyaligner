import json
import re

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

print("Searching logs for section contents...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "why-choose" in line or "clinic-tour" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                source = data.get("source")
                content = data.get("content", "")
                
                # Check tool calls
                tool_calls = data.get("tool_calls", [])
                for tc in tool_calls:
                    args = tc.get("args", {})
                    # Look at contents
                    for k, v in args.items():
                        if isinstance(v, str) and ("why-choose" in v or "clinic-tour" in v):
                            # Check if it has section HTML
                            if "section" in v or "id=" in v or "className" in v:
                                print(f"\n--- Line {line_num} Step {step} Tool {tc.get('name')} Arg {k} ---")
                                print(v[:3000] + "...")
                        elif isinstance(v, list):
                            # It could be replacement chunks
                            for chunk in v:
                                if isinstance(chunk, dict):
                                    for ck, cv in chunk.items():
                                        if isinstance(cv, str) and ("why-choose" in cv or "clinic-tour" in cv):
                                            print(f"\n--- Line {line_num} Step {step} Tool {tc.get('name')} Chunks ---")
                                            print(cv[:3000] + "...")
                                            
                if content and ("why-choose" in content or "clinic-tour" in content):
                    print(f"\n--- Line {line_num} Step {step} Type {stype} Content ---")
                    print(content[:3000] + "...")
            except Exception as e:
                print(f"Error on line {line_num}: {e}")
