import json

log_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\5eacdc66-5dd1-4475-9595-1f94483b6a37\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data = json.loads(line)
            step = data.get("step_index")
            if step in [488, 489, 490, 494, 495]:
                print(f"Step {step} | Type {data.get('type')} | Content length {len(data.get('content', ''))}")
                print(data.get("content"))
                print("="*60)
        except Exception as e:
            pass
