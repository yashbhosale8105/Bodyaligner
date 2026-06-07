import json
import os

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\dd960535-21ed-496c-9cac-c6a4a553e606\.system_generated\logs\transcript.jsonl"
output_dir = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_dd960535"
os.makedirs(output_dir, exist_ok=True)

print(f"Reading logs from {log_path}...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "pain-removebg-preview.png" in line or "Video_background_for_physiothera" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                stype = data.get("type")
                source = data.get("source")
                
                print(f"Found match: Step {step} | Type {stype}")
                # Save raw step JSON
                with open(os.path.join(output_dir, f"step_{step}_{stype}_raw.json"), "w", encoding="utf-8") as out:
                    json.dump(data, out, indent=2)
                
                # Extract code content or replacement content
                content = data.get("content", "")
                if content:
                    with open(os.path.join(output_dir, f"step_{step}_{stype}_content.txt"), "w", encoding="utf-8") as out:
                        out.write(content)
                        
                tool_calls = data.get("tool_calls", [])
                for idx, tc in enumerate(tool_calls):
                    name = tc.get("name")
                    args = tc.get("args", {})
                    for k, v in args.items():
                        if isinstance(v, str) and ("pain-removebg" in v or "Video_background" in v):
                            with open(os.path.join(output_dir, f"step_{step}_{name}_arg_{k}_{idx}.txt"), "w", encoding="utf-8") as out:
                                out.write(v)
                        elif isinstance(v, list):
                            for c_idx, chunk in enumerate(v):
                                if isinstance(chunk, dict):
                                    rc = chunk.get("ReplacementContent", "")
                                    tc_str = chunk.get("TargetContent", "")
                                    if rc and ("pain-removebg" in rc or "Video_background" in rc):
                                        with open(os.path.join(output_dir, f"step_{step}_{name}_chunk_repl_{c_idx}.txt"), "w", encoding="utf-8") as out:
                                            out.write(rc)
                                    if tc_str and ("pain-removebg" in tc_str or "Video_background" in tc_str):
                                        with open(os.path.join(output_dir, f"step_{step}_{name}_chunk_targ_{c_idx}.txt"), "w", encoding="utf-8") as out:
                                            out.write(tc_str)
            except Exception as e:
                pass
print("Done extracting conversation dd960535.")
