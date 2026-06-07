from PIL import Image
from collections import Counter

img = Image.open("public/assets/4.png")
w, h = img.size
# Crop to the text region (x from 250 onwards)
text_img = img.crop((250, 0, w, h))
text_rgb = text_img.convert("RGB")
pixels = list(text_rgb.getdata())

non_neutral = []
for r, g, b in pixels:
    # We want saturated colors that are blue/cyan/greenish blue
    # Aligner is likely light blue/cyan, while Body is darker blue
    if r < 200 and g > 50 and b > 100:
        non_neutral.append((r, g, b))

counter = Counter(non_neutral)
print("Dominant colors in the text part of the logo:")
for color, count in counter.most_common(10):
    hex_color = f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}"
    print(f"{hex_color}: {count} pixels (RGB: {color})")
