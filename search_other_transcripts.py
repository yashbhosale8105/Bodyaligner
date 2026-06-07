import os
import json

brain_dir = r"C:\Users\ASUS\.gemini\antigravity-ide\brain"
output_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\unmasked_images_recovered.txt"

occurrences = []
print("Searching all transcripts for removebg or Video_background...")
for conv_id in os.listdir(brain_dir):
    item_path = os.path.join(brain_dir, conv_id)
    if os.path.isdir(item_path):
        logs_path = os.path.join(item_path, ".system_generated", "logs", "transcript.jsonl")
        if os.path.exists(logs_path):
            with open(logs_path, "r", encoding="utf-8") as f:
                for line_num, line in enumerate(f, 1):
                    if "removebg" in line or "Video_background_for_physiothera" in line:
                        try:
                            data = json.loads(line)
                            step = data.get("step_index")
                            content = data.get("content", "")
                            tool_calls = data.get("tool_calls", [])
                            
                            for tc in tool_calls:
                                args = tc.get("args", {})
                                for k, v in args.items():
                                    if isinstance(v, str) and ("removebg" in v or "Video_background_for_physiothera" in v):
                                        occurrences.append({
                                            "conv_id": conv_id,
                                            "step": step,
                                            "type": f"tool_arg:{tc.get('name')}:{k}",
                                            "val": v
                                        })
                                    elif isinstance(v, list):
                                        for chunk in v:
                                            if isinstance(chunk, dict):
                                                rc = chunk.get("ReplacementContent", "")
                                                if "removebg" in rc or "Video_background_for_physiothera" in rc:
                                                    occurrences.append({
                                                        "conv_id": conv_id,
                                                        "step": step,
                                                        "type": f"tool_chunk:{tc.get('name')}",
                                                        "val": rc
                                                    })
                            if content:
                                occurrences.append({
                                    "conv_id": conv_id,
                                    "step": step,
                                    "type": "content",
                                    "val": content
                                })
                        except:
                            pass

print(f"Found {len(occurrences)} matches. Writing to {output_path}...")
with open(output_path, "w", encoding="utf-8") as out:
    for idx, occ in enumerate(occurrences):
        out.write(f"\n========================================================================\n")
        out.write(f"OCCURRENCE {idx+1} | CONV: {occ['conv_id']} | STEP: {occ['step']} | TYPE: {occ['type']}\n")
        out.write(f"========================================================================\n")
        out.write(occ['val'])
        out.write("\n")
print("Done.")
