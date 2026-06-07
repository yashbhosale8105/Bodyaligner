import json
import os

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"
output_dir = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_raw_steps"
os.makedirs(output_dir, exist_ok=True)

print(f"Reading logs from {log_path}...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "why-choose" in line or "clinic-tour" in line or "whyChoose" in line or "clinicTour" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                source = data.get("source")
                
                # Check for tool call content or view file content
                content = data.get("content", "")
                tool_calls = data.get("tool_calls", [])
                
                print(f"Line {line_num} | Step {step} | Type {stype} | Source {source}")
                
                # Save the full JSON line
                file_path = os.path.join(output_dir, f"step_{step}_{stype}_{source}_raw.json")
                with open(file_path, "w", encoding="utf-8") as out:
                    json.dump(data, out, indent=2)
                
                # If it's a VIEW_FILE or has code content, write that separately
                if content:
                    txt_path = os.path.join(output_dir, f"step_{step}_{stype}_{source}_content.txt")
                    with open(txt_path, "w", encoding="utf-8") as out:
                        out.write(content)
                
                for idx, tc in enumerate(tool_calls):
                    tc_name = tc.get("name")
                    tc_args = tc.get("args", {})
                    # Save large string args
                    for k, v in tc_args.items():
                        if isinstance(v, str) and len(v) > 200:
                            arg_path = os.path.join(output_dir, f"step_{step}_{tc_name}_{k}_{idx}.txt")
                            with open(arg_path, "w", encoding="utf-8") as out:
                                out.write(v)
                        elif isinstance(v, list):
                            # Chunks
                            for c_idx, chunk in enumerate(v):
                                if isinstance(chunk, dict):
                                    rc = chunk.get("ReplacementContent", "")
                                    tc_str = chunk.get("TargetContent", "")
                                    if rc:
                                        chunk_path = os.path.join(output_dir, f"step_{step}_{tc_name}_chunk_repl_{c_idx}.txt")
                                        with open(chunk_path, "w", encoding="utf-8") as out:
                                            out.write(rc)
                                    if tc_str:
                                        chunk_path = os.path.join(output_dir, f"step_{step}_{tc_name}_chunk_targ_{c_idx}.txt")
                                        with open(chunk_path, "w", encoding="utf-8") as out:
                                            out.write(tc_str)
            except Exception as e:
                print(f"Error on line {line_num}: {e}")

print("Done! All raw steps extracted to extracted_raw_steps directory.")
