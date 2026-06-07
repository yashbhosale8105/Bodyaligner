import os

brain_dir = r"C:\Users\ASUS\.gemini\antigravity-ide\brain"
if os.path.exists(brain_dir):
    contents = os.listdir(brain_dir)
    print(f"Contents of brain directory: {contents}")
    for item in contents:
        item_path = os.path.join(brain_dir, item)
        if os.path.isdir(item_path):
            # Check if there is a system_generated/logs/transcript.jsonl
            logs_path = os.path.join(item_path, ".system_generated", "logs", "transcript.jsonl")
            if os.path.exists(logs_path):
                print(f"  Found transcript at: {logs_path} (size: {os.path.getsize(logs_path)} bytes)")
else:
    print(f"Brain directory does not exist at {brain_dir}")
