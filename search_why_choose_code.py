import os
import json
import re

brain_dir = r"C:\Users\ASUS\.gemini\antigravity-ide\brain"
for item in os.listdir(brain_dir):
    item_path = os.path.join(brain_dir, item)
    if os.path.isdir(item_path):
        logs_path = os.path.join(item_path, ".system_generated", "logs", "transcript.jsonl")
        if os.path.exists(logs_path):
            with open(logs_path, "r", encoding="utf-8") as f:
                for line_num, line in enumerate(f, 1):
                    if "why-choose" in line and ("<section" in line or "section className=" in line):
                        try:
                            data = json.loads(line)
                            step = data.get("step_index")
                            content = data.get("content", "")
                            tool_calls = data.get("tool_calls", [])
                            
                            for tc in tool_calls:
                                args = tc.get("args", {})
                                for k, v in args.items():
                                    if isinstance(v, str) and "why-choose" in v:
                                        pos = v.find("why-choose")
                                        # Find surrounding section
                                        print(f"[{item}] Step {step} | Tool {tc.get('name')}")
                                        print(v[max(0, pos-200):min(len(v), pos+2000)] + "\n" + "="*40)
                                    elif isinstance(v, list):
                                        for idx, chunk in enumerate(v):
                                            if isinstance(chunk, dict):
                                                rc = chunk.get("ReplacementContent", "")
                                                if "why-choose" in rc:
                                                    pos = rc.find("why-choose")
                                                    print(f"[{item}] Step {step} | Tool {tc.get('name')} | Chunk {idx}")
                                                    print(rc[max(0, pos-200):min(len(rc), pos+2000)] + "\n" + "="*40)
                                                    
                            if content:
                                if "why-choose" in content:
                                    pos = content.find("why-choose")
                                    print(f"[{item}] Step {step} | Content")
                                    print(content[max(0, pos-200):min(len(content), pos+2000)] + "\n" + "="*40)
                        except:
                            pass
