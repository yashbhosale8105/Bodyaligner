import json
import re

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"
output_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_sections.txt"

print(f"Reading logs from {log_path}...")
sections_found = []

with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        # We look for steps around the time these were modified.
        # Specifically, let's check for any mention of why-choose or clinic-tour in tool calls
        if "why-choose" in line or "clinic-tour" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                tool_calls = data.get("tool_calls", [])
                
                # Check tool calls
                for tc in tool_calls:
                    name = tc.get("name")
                    args = tc.get("args", {})
                    for k, v in args.items():
                        if isinstance(v, str) and ("why-choose" in v or "clinic-tour" in v):
                            sections_found.append({
                                "line_num": line_num,
                                "step": step,
                                "type": f"TOOL_CALL:{name}:{k}",
                                "content": v
                            })
                        elif isinstance(v, list):
                            for idx, chunk in enumerate(v):
                                if isinstance(chunk, dict):
                                    rc = chunk.get("ReplacementContent", "")
                                    tc_str = chunk.get("TargetContent", "")
                                    if ("why-choose" in rc or "clinic-tour" in rc or "why-choose" in tc_str or "clinic-tour" in tc_str):
                                        sections_found.append({
                                            "line_num": line_num,
                                            "step": step,
                                            "type": f"TOOL_CALL:{name}:chunk_{idx}",
                                            "content": f"TARGET:\n{tc_str}\n\nREPLACEMENT:\n{rc}"
                                        })
                
                # Check VIEW_FILE results and others
                content = data.get("content", "")
                if content and ("why-choose" in content or "clinic-tour" in content):
                    sections_found.append({
                        "line_num": line_num,
                        "step": step,
                        "type": f"CONTENT:{stype}",
                        "content": content
                    })
            except Exception as e:
                pass

print(f"Found {len(sections_found)} items. Writing to {output_path}...")
with open(output_path, 'w', encoding='utf-8') as out:
    for item in sections_found:
        out.write("=" * 80 + "\n")
        out.write(f"LINE: {item['line_num']} | STEP: {item['step']} | TYPE: {item['type']}\n")
        out.write("=" * 80 + "\n")
        out.write(item['content'])
        out.write("\n\n")

print("Done! Check extracted_sections.txt.")
