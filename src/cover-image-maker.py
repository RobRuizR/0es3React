import os
from shutil import copyfile
import random

# traverse root directory, and list directories as dirs and files as files
for root, dirs, files in os.walk("./content"):
    path = root.split(os.sep)
    images = [file for file in files if file.endswith("jpg")]
    if len(images) > 0:
        cover_image = random.choice(images)

        if cover_image is not None:
            try:
                copyfile(root + "/" + cover_image, root + "/cover.jpg")
            except Exception as e:
                print("Error: " + root + "/" + cover_image)
                print(e)
