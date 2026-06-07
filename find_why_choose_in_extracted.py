import os

dir_path = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\extracted_raw_steps"
files = os.listdir(dir_path)

print(f"Searching {len(files)} files for 'why-choose' or 'clinic-tour'...")
for f in files:
    path = os.path.join(dir_path, f)
    if not os.path.isfile(path):
        continue
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
        
        # Check if this file contains a large portion of code
        if "id=\"why-choose\"" in content or "id='why-choose'" in content or "why-choose" in content.lower():
            if "section" in content:
                print(f"Match: {f} | Size: {len(content)} bytes")
                # Look for section tags
                import re
                sections = re.findall(r"<section[^>]*id=[\"']why-choose[\"'][^>]*>.*?</section>", content, re.DOTALL | re.IGNORECASE)
                for idx, sec in enumerate(sections):
                    print(f"  Found why-choose section {idx+1} (length {len(sec)}):")
                    print(sec[:1000] + "...\n")
                    
        if "id=\"clinic-tour\"" in content or "id='clinic-tour'" in content:
            if "section" in content:
                print(f"Match (tour): {f} | Size: {len(content)} bytes")
                import re
                sections = re.findall(r"<section[^>]*id=[\"']clinic-tour[\"'][^>]*>.*?</section>", content, re.DOTALL | re.IGNORECASE)
                for idx, sec in enumerate(sections):
                    print(f"  Found clinic-tour section {idx+1} (length {len(sec)}):")
                    print(sec[:1000] + "...\n")
    except Exception as e:
        print(f"Error on {f}: {e}")
