import os

lost_found_dir = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\.git\lost-found"
if not os.path.exists(lost_found_dir):
    print(f"lost-found directory does not exist at {lost_found_dir}")
else:
    print(f"lost-found directory exists. Walking files...")
    # Walk all files in lost-found
    for root, dirs, files in os.walk(lost_found_dir):
        for f in files:
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    content = file.read()
                if "why-choose" in content or "clinic-tour" in content or "whyChoose" in content or "clinicTour" in content:
                    print(f"Found match in {path} (size: {len(content)} bytes)!")
                    # Check if it looks like page.tsx
                    if "Counter" in content and "booking" in content:
                        print("  This looks like a page.tsx backup!")
                        # Copy it to our workspace as a backup
                        import shutil
                        dest = r"c:\Users\ASUS\OneDrive\Desktop\Bodyaligner\recovered_page_from_git.tsx"
                        shutil.copy(path, dest)
                        print(f"  Copied to {dest}")
                    elif "bento-grid" in content:
                        print("  This contains bento-grid/clinic-tour elements!")
            except Exception as e:
                pass
print("Done checking lost-found.")
