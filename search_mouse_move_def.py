import os
import json

brain_dir = r"C:\Users\ASUS\.gemini\antigravity-ide\brain"
for item in os.listdir(brain_dir):
    item_path = os.path.join(brain_dir, item)
    if os.path.isdir(item_path):
        logs_path = os.path.join(item_path, ".system_generated", "logs", "transcript.jsonl")
        if os.path.exists(logs_path):
            with open(logs_path, "r", encoding="utf-8") as f:
                for line_num, line in enumerate(f, 1):
                    if "handleMouseMove" in line and ("const handleMouseMove" in line or "function handleMouseMove" in line):
                        try:
                            data = json.loads(line)
                            step = data.get("step_index")
                            content = data.get("content", "")
                            # Check tool calls
                            tool_calls = data.get("tool_calls", [])
                            for tc in tool_calls:
                                args = tc.get("args", {})
                                for k, v in args.items():
                                    if isinstance(v, str) and "handleMouseMove" in v:
                                        print(f"[{item}] Step {step} | Tool {tc.get('name')} | Arg {k}")
                                        pos = v.find("handleMouseMove")
                                        print(v[max(0, pos-50):min(len(v), pos+800)] + "\n" + "="*40)
                            if content:
                                print(f"[{item}] Step {step} | Content output")
                                pos = content.find("handleMouseMove")
                                print(content[max(0, pos-50):min(len(content), pos+800)] + "\n" + "="*40)
                        except:
                            pass
