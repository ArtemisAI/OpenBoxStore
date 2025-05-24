# System Architecture

This document outlines the architecture of The Open Box / La Boîte Ouverte (TOB/LBO) system.

## Components

The system is comprised of the following main components:

### 1. Frontend
- **Technology:** Next.js 14 with Vercel Commerce template
- **Styling:** Tailwind CSS, shadcn/ui
- **Hosting:** Vercel
- **Description:** The frontend is responsible for the user interface and user experience of the online marketplace. It allows users to browse products, view product details, and complete purchases. It supports both English and French locales.

### 2. Backend
- **Technology:** Choice between Medusa.js (self-hosted) and Saleor Cloud solution.
- **Description:** The backend manages product catalogs, inventory, orders, user accounts, and payment processing.

### 3. AI Service (Chatbot)
- **Technology:** LangChain agents with OpenAI GPT-4 integration.
- **Vector Database:** ChromaDB or pgvector.
- **Framework:** FastAPI
- **Description:** The AI service provides an advanced chatbot for price negotiation and customer interaction. It uses Retrieval-Augmented Generation (RAG) for dynamic and context-aware conversations.

### 4. Orchestration (Workflows)
- **Technology:** n8n
- **Description:** n8n workflows are used for automating various tasks, including:
    - Product ingestion from CSV, Google Sheets, or web forms.
    - Hourly inventory synchronization with alerts.
    - Nightly vector refresh for the AI service to ensure up-to-date embeddings.

## Interactions

The components interact as follows:

- Users interact with the **Frontend** to browse and purchase products.
- The **Frontend** communicates with the **Backend** to fetch product information, manage user accounts, and process orders.
- The **Frontend** integrates the **AI Service** to provide chatbot functionality for price negotiation and customer support.
- The **AI Service** utilizes its vector database (ChromaDB or pgvector) to retrieve relevant information for generating responses.
- **n8n Workflows** automate data pipelines:
    - Ingesting product data into the **Backend**.
    - Synchronizing inventory levels between the **Backend** and other potential sources.
    - Updating the vector database for the **AI Service** with the latest product information.

## Infrastructure

- **Cloud Provider:** AWS (Amazon Web Services)
- **Services:** Fargate, RDS, S3, CloudFront
- **Principles:** Secure networking and least privilege IAM roles.

This architecture is designed to be scalable, maintainable, and provide a premium user experience with a high degree of automation.
