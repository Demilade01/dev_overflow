# Dev Overflow | Modern StackOverflow Clone

![Dev Overflow Light Theme](devflow-white.png)
![Dev Overflow Dark Theme](devflow-black.png)

[![website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://dev-overflow-lilac.vercel.app/)

## 🌐 Live Demo

Experience Dev Overflow in action: [https://dev-overflow-lilac.vercel.app/](https://dev-overflow-lilac.vercel.app/)

## 📝 About Dev Overflow

Dev Overflow is a modern, full-stack Q&A platform inspired by StackOverflow, built with cutting-edge technologies and enhanced with AI-powered features. It's designed to help developers ask questions, share knowledge, and collaborate in a beautiful, intuitive interface.

### 🎯 What Makes It Special

- **AI-Powered Answers**: Get instant AI-generated answers using OpenAI's GPT integration
- **Modern UI/UX**: Beautiful, responsive design with dark/light theme support
- **Real-time Interactions**: Live voting, commenting, and reputation system
- **Advanced Search**: Global and local search with intelligent filtering
- **Rich Text Editing**: TinyMCE integration for detailed questions and answers
- **User Reputation System**: Gamified experience with reputation points and badges

## ✨ Key Features

### 🔐 Authentication & User Management
- **Secure Authentication** with Clerk integration
- **User Profiles** with customizable bio, location, and portfolio
- **Reputation System** with points and badges
- **User Statistics** tracking questions, answers, and reputation

### 💬 Q&A Platform
- **Ask Questions** with rich text editor and tag support
- **Answer Questions** with markdown support and code highlighting
- **Vote System** - upvote/downvote questions and answers
- **Save Questions** to personal collections
- **Edit/Delete** your own content

### 🤖 AI Integration
- **AI-Generated Answers** using OpenAI GPT-3.5-turbo
- **Smart Question Analysis** for better AI responses
- **Fallback Handling** when AI is unavailable

### 🔍 Search & Discovery
- **Global Search** across questions, answers, users, and tags
- **Local Search** within specific sections
- **Advanced Filtering** by tags, date, popularity, and more
- **Smart Recommendations** based on user activity

### 🏷️ Content Organization
- **Tag System** for categorizing questions
- **Popular Tags** tracking and display
- **Question Collections** for saving interesting content
- **Community Section** for user discovery

### 🎨 Modern UI/UX
- **Dark/Light Theme** with system preference detection
- **Responsive Design** for all device sizes
- **Smooth Animations** with Tailwind CSS
- **Accessible Components** built with Radix UI

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TinyMCE** - Rich text editor
- **Lucide React** - Beautiful icons

### Backend & Database
- **MongoDB** - NoSQL database with Mongoose ODM
- **Next.js API Routes** - Serverless backend
- **Server Actions** - Modern data fetching

### Authentication & AI
- **Clerk** - Complete authentication solution
- **OpenAI API** - AI-powered answer generation
- **Webhook Integration** - Real-time user sync

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Zod** - Schema validation
- **React Hook Form** - Form management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database
- Clerk account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dev-overflow.git
   cd dev-overflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_CLERK_WEBHOOK_SECRET=your_webhook_secret
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_TINY_EDITOR_API_KEY=your_tinymce_key
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Screenshots

The application features a clean, modern interface with both light and dark themes, providing an excellent user experience across all devices.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- StackOverflow for inspiration
- Clerk for authentication
- OpenAI for AI capabilities
- The open-source community for amazing tools and libraries