const categories: { [key: string]: string[] } = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};

// Instructions to complete the project:
// I need to traverse through the messy files in the targeted folder
// Then I need to create a new directory to store the organized files
// Create inner directory based on the 'categories'

import * as fs from "fs";
import * as path from "path";

const sourceDir = path.join(__dirname, "messy-files");
const organizedDir = path.join(__dirname, "organized-files");

function fileOrganizer() {
  if (!fs.existsSync(sourceDir)) {
    console.log("Source directory does not exist!");
    return;
  }

  if (!fs.existsSync(organizedDir)) {
    fs.mkdirSync(organizedDir);
  }

  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    // file = me.jpg
    const ext = path.extname(file); // ext = .jpg
    let matched = false;

    for (const [category, extensions] of Object.entries(categories)) {
      if (extensions.includes(ext)) {
        matched = true;

        const categoryDir = path.join(organizedDir, category); // .../organized-files/images
        if (!fs.existsSync(categoryDir)) {
          fs.mkdirSync(categoryDir);
        }

        const srcPath = path.join(sourceDir, file); // ..../messy-files/me.jpg
        const destPath = path.join(categoryDir, file); // ..../organized-files/images/me.jpg

        fs.copyFileSync(srcPath, destPath);
        break; // STOP — we found the correct category!
      }
    }

    // If not matched, put in "others"
    if (!matched) {
      const othersDir = path.join(organizedDir, "others");

      if (!fs.existsSync(othersDir)) {
        fs.mkdirSync(othersDir);
      }

      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(othersDir, file);

      fs.copyFileSync(srcPath, destPath);
    }
  });
}

fileOrganizer();
