import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"
output_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\step_4_details.txt"

with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            if step in [4, 218, 239]:
                print(f"Found step {step} at line {line_num}")
                with open(f"c:\\Users\\ASUS\\OneDrive\\Desktop\\Bodyaligner\\raw_step_{step}.json", "w", encoding="utf-8") as out:
                    json.dump(data, out, indent=2)
        except Exception as e:
            pass
print("Done")
