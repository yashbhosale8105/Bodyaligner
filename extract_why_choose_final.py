import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\e8f9fab4-ea4b-48bd-81f9-febaa594e287\.system_generated\logs\transcript.jsonl"
output_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\why_choose_recovered.txt"

print(f"Reading logs from {log_path}...")
with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        if "why-choose" in line:
            try:
                data = json.loads(line)
                step = data.get("step_index")
                # Look specifically for step 496 or 260
                if step in [260, 496]:
                    print(f"Found step {step} on line {line_num}!")
                    content = data.get("content", "")
                    
                    # Find why-choose section
                    pos = content.find("why-choose")
                    if pos != -1:
                        # Let's extract from pos - 200 up to pos + 5000 (enough to cover the whole section)
                        snippet = content[max(0, pos-100):min(len(content), pos+8000)]
                        with open(output_path, "w", encoding="utf-8") as out:
                            out.write(snippet)
                        print(f"Written why-choose snippet from step {step} to {output_path}")
                        break
            except Exception as e:
                print(f"Error: {e}")
