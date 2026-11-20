# Videos

Put site videos here (`.mp4` or `.webm`) with their captions (`.vtt`), then set the file names in the
page's YAML, e.g. in `src/content/pages/he/home.yaml`:

```yaml
video:
  file: "novidea-overview.mp4"
  captions: "novidea-overview.he.vtt"
  title: "סרטון היכרות עם נובידאה"
```

- **Size:** keep each file under about 20 MB (H.264 MP4, 720p or 1080p). GitHub refuses files over 100 MB, and
  every visitor downloads what they play. Longer videos are better on YouTube (design-system.md §10.25).
- **Captions:** a video with speech needs captions (WCAG 1.2.2, Israeli Standard 5568).
- No autoplay with sound.
