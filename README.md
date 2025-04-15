# 🧠 AI Attribute Enricher

A full-stack AI-powered product enrichment platform designed to help businesses fill in missing SKU data like descriptions, specs, and rich attributes — intelligently and at scale.

---

## 📌 Project Overview

Retailers often have thousands of products (SKUs) with minimal information — just a name, brand, barcode, and maybe an image. This platform allows users to **enrich those SKUs with AI** to generate additional attributes like descriptions, specs, and category tags, dramatically improving catalog quality with minimal effort.

---

## 🚀 Features

- ⚡ **Vite + React Frontend** for lightning-fast load and dev experience
- ☁️ **AWS S3 for Image Storage** – securely store and retrieve product images in the cloud  
- 🧠 **AI Enrichment via Gemini Pro** with Google Search grounding + multimodal support  
- 🔐 **User Authentication** – users can only access and enrich **their own data**  
- 📋 **Product List View** – browse imported SKUs with current and enriched attributes  
- ✨ **"Enrich with AI"** – enrich product data using custom prompts + self-correcting logic  
- 📐 **Supports Complex Attribute Types**:
  - Short text
  - Long text
  - Rich text (HTML)
  - Numbers
  - Single/multi-select
  - Measure (value + unit)

---

## 🧰 Tech Stack

| Layer        | Tech                                      |
|--------------|-------------------------------------------|
| **Frontend** | React (Vite) + TypeScript                 |
| **Backend**  | FastAPI + Python                          |
| **Database** | MongoDB (document-based for schema flexibility) |
| **AI Layer** | Gemini Pro (multimodal) + Google Search grounding |
| **Image Store** | AWS S3 for cloud image hosting         |
| **Deployment** | Frontend: Vercel • Backend: Google Cloud Run |

---

## 🛠️ How It Works

1. User logs in and sees a table of their own products (SKUs)
2. Each product shows basic info: name, brand, barcode, image
3. User clicks **"Enrich with AI"**
4. Backend sends data to the AI engine (Gemini + Google Search)
5. AI generates and returns enriched attributes:
   - Descriptions
   - Specs (in rich, structured format)
6. Data is saved per user and updated in the UI

---

## 🔐 Authentication & Data Isolation

- Each user is issued a secure token after login
- All product data is user-scoped
- Users **cannot view or modify** other users' SKUs or enrichment history

---

## 🌍 Live Demo

- 🔗 **Frontend**: https://product-enrichment-page.vercel.app/  
- 🔗 **Backend**: https://fastapi-gemini-541848277869.us-central1.run.app/

> Replace with your actual deployment URLs

---

## 📦 Getting Started (Locally)

### 🖥 Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🖥 Frontend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

