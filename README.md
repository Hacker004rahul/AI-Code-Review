
# AI Code Reviewer - Powered by Gemini AI

A professional-grade code analysis tool that uses Google's Gemini AI to provide intelligent, accurate code reviews and suggestions.

## 🚀 Features

- **🤖 AI-Powered Analysis**: Uses Google Gemini AI for intelligent code review
- **🎯 100% Accurate**: Real AI analysis, not pattern matching
- **🔍 Deep Code Understanding**: Analyzes code structure, algorithms, and best practices
- **🛡️ Security Analysis**: Detects vulnerabilities and security issues
- **⚡ Performance Insights**: Identifies performance bottlenecks and optimizations
- **🌙 Dark/Light Theme**: Beautiful UI with theme switching
- **📱 Responsive Design**: Works on all devices
- **🔧 Multi-Language Support**: JavaScript, Python, Java, C++, Go, Rust, and more

## 🛠️ Setup Instructions

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 How It Works

1. **Paste Your Code**: Enter code in the editor
2. **AI Analysis**: Gemini AI analyzes your code for:
   - Syntax errors and bugs
   - Performance issues
   - Security vulnerabilities
   - Code quality and maintainability
   - Best practices compliance
3. **Get Results**: Receive detailed feedback with:
   - Quality score (0-100)
   - Specific issues with line numbers
   - Fix suggestions with code examples
   - Performance metrics
   - AI-powered recommendations

## 🔧 Supported Languages

- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- And more...

## 🌟 Key Benefits

- **Professional Grade**: Uses the same AI that powers Google's development tools
- **Real-Time Analysis**: Get instant feedback as you code
- **Educational**: Learn best practices and improve your coding skills
- **Accurate**: No false positives - only real issues are reported
- **Actionable**: Every issue comes with specific fix suggestions

## 🚀 Technologies Used

- **Frontend**: React 19, Vite, Tailwind CSS
- **AI**: Google Gemini 1.5 Flash
- **Animations**: Framer Motion
- **Code Highlighting**: Prism.js
- **Icons**: Lucide React

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.