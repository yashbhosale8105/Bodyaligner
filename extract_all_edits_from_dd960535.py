import json
import os

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\dd960535-21ed-496c-9cac-c6a4a553e606\.system_generated\logs\transcript.jsonl"
output_dir = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_dd960535_edits"
os.makedirs(output_dir, exist_ok=True)

print(f"Reading logs from {log_path}...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            tool_calls = data.get("tool_calls", [])
            for idx, tc in enumerate(tool_calls):
                name = tc.get("name")
                args = tc.get("args", {})
                tfile = args.get("TargetFile", "")
                if name in ["write_to_file", "replace_file_content", "multi_replace_file_content"]:
                    desc = args.get("Description", "") or args.get("Instruction", "")
                    print(f"Found code tool call: Step {step} | Tool {name} | File {tfile} | Desc: {desc[:60]}...")
                    # Save the full tool call JSON
                    with open(os.path.join(output_dir, f"step_{step}_{name}_{idx}_raw.json"), "w", encoding="utf-8") as out:
                        json.dump(tc, out, indent=2)
                    
                    # Save the code content
                    code = args.get("CodeContent", "") or args.get("ReplacementContent", "")
                    if code:
                        with open(os.path.join(output_dir, f"step_{step}_{name}_code.txt"), "w", encoding="utf-8") as out:
                            out.write(code)
                    
                    chunks = args.get("ReplacementChunks", [])
                    if isinstance(chunks, str):
                        try:
                            chunks = json.loads(chunks)
                        except:
                            pass
                    if isinstance(chunks, list):
                        for c_idx, chunk in enumerate(chunks):
                            rc = chunk.get("ReplacementContent", "")
                            tc_str = chunk.get("TargetContent", "")
                            if rc:
                                with open(os.path.join(output_dir, f"step_{step}_{name}_chunk_repl_{c_idx}.txt"), "w", encoding="utf-8") as out:
                                    out.write(rc)
                            if tc_str:
                                with open(os.path.join(output_dir, f"step_{step}_{name}_chunk_targ_{c_idx}.txt"), "w", encoding="utf-8") as out:
                                    out.write(tc_str)
        except Exception as e:
            pass
print("Done extracting edits.")
