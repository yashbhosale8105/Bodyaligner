import os
import json

brain_dir = r"C:\Users\ASUS\.gemini\antigravity-ide\brain"
output_dir = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_conversations_data"
os.makedirs(output_dir, exist_ok=True)

transcripts = []
for item in os.listdir(brain_dir):
    item_path = os.path.join(brain_dir, item)
    if os.path.isdir(item_path):
        logs_path = os.path.join(item_path, ".system_generated", "logs", "transcript.jsonl")
        if os.path.exists(logs_path):
            transcripts.append((item, logs_path))

print(f"Found {len(transcripts)} transcripts. Searching...")

matches_found = 0
for conv_id, path in transcripts:
    # We don't want to get confused by our own files or scripts, we just want tool calls or large content outputs in the logs
    with open(path, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, 1):
            if "why-choose" in line or "clinic-tour" in line:
                try:
                    data = json.loads(line)
                    step = data.get("step_index")
                    stype = data.get("type")
                    
                    # Look for tool calls writing code
                    tool_calls = data.get("tool_calls", [])
                    for tc_idx, tc in enumerate(tool_calls):
                        tc_name = tc.get("name")
                        tc_args = tc.get("args", {})
                        tfile = tc_args.get("TargetFile", "")
                        
                        if tc_name in ["write_to_file", "replace_file_content", "multi_replace_file_content"] and ("page.tsx" in tfile or "globals.css" in tfile):
                            print(f"[{conv_id}] Step {step} | Tool {tc_name} | File {tfile}")
                            matches_found += 1
                            
                            # Write this tool call out to a file
                            out_path = os.path.join(output_dir, f"{conv_id}_step_{step}_{tc_name}_{tc_idx}.json")
                            with open(out_path, "w", encoding="utf-8") as out:
                                json.dump(tc, out, indent=2)
                                
                            # Extract code contents specifically
                            code = tc_args.get("CodeContent", "") or tc_args.get("ReplacementContent", "")
                            if code:
                                code_path = os.path.join(output_dir, f"{conv_id}_step_{step}_{tc_name}_code.txt")
                                with open(code_path, "w", encoding="utf-8") as out:
                                    out.write(code)
                            
                            chunks = tc_args.get("ReplacementChunks", [])
                            if isinstance(chunks, str):
                                try:
                                    chunks = json.loads(chunks)
                                except:
                                    pass
                            if isinstance(chunks, list):
                                for c_idx, chunk in enumerate(chunks):
                                    rc = chunk.get("ReplacementContent", "")
                                    if rc and ("why-choose" in rc or "clinic-tour" in rc):
                                        chunk_path = os.path.join(output_dir, f"{conv_id}_step_{step}_{tc_name}_chunk_{c_idx}.txt")
                                        with open(chunk_path, "w", encoding="utf-8") as out:
                                            out.write(rc)
                except Exception as e:
                    pass

print(f"Done! Found {matches_found} matching edits across all transcripts. Details in {output_dir}")
