
# AI Article Generator ✍️

## OpenxAI Global AI Accelerator - CONTENT-TRACK Submission

### Project Overview
**AI Article Generator** is an AI-powered tool that generates high-quality articles in real-time. Users provide a topic, and the AI produces content while updating word and character counts, and storing a history of recent topics.

### 🌟 Features
- **Natural Language Input**: Type a topic and get AI-generated content instantly.
- **Streaming Output**: Watch the article appear as it is generated.
- **Word & Character Metrics**: Real-time counts displayed during generation.
- **Recent Topics History**: Keeps track of recent topics with timestamps and response times.
- **Example Topics**: Quick-start buttons for exploring the AI.
- **Error Handling**: Shows warnings for missing input or failed generation.

### 🛠️ Tech Stack
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI Integration**: Ollama (or other AI backend)

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+
- AI backend (e.g., Ollama)
- Git

#### Installation

1. **Clone Repository**
```bash
git clone <your-repo-url>
cd ai-article-generator
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open in Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### 🎮 How to Use
1. Enter a topic in the input field.
2. Click **Generate Article**.
3. Watch the article appear in real-time.
4. Check word and character counts.
5. Review previous topics in the **Recent Topics** section.
6. Click example topics for quick testing.

### 🤖 AI Integration
The AI:
- Parses user input.
- Generates content in real-time.
- Streams content to the UI.
- Tracks generation metrics and history.

### 🎨 Customization
- **UI & Features**: Modify `ArticleGenerator.tsx`.
- **Styling**: Update `globals.css` or `tailwind.config.js`.
- **AI Model**: Change the endpoint in `/api/process-command`.

### 📊 Educational Impact
- Demonstrates AI-assisted writing.
- Shows real-time streaming and metrics.
- Offers insights into AI-generated content.

### 🔧 Development

#### Project Structure
```
ai-article-generator/
├── app/
│   ├── api/
│   │   └── process-command/ # AI API route
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   └── ArticleGenerator.tsx # Main AI component
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

#### Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build production version
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript type checking

### 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

### 📄 License
Part of the OpenxAI Global AI Accelerator.

---

*"The best way to improve your writing is to start writing."*

**✍️ AI Article Generator - Real-time AI Writing Assistant**
