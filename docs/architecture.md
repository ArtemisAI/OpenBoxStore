# System Architecture

This document outlines the architecture of The Open Box / La Boîte Ouverte (TOB/LBO) system.

## Components

The system is comprised of the following main components:

### 1. Frontend
- **Technology:** Medusa Next.js starter, Next.js 14
- **Styling:** Tailwind CSS. `shadcn/ui` is planned for integration.
- **Internationalization (i18n):** Built-in Next.js i18n support for English and French.
- **Hosting:** Vercel
- **Description:** The frontend is responsible for the user interface and user experience of the online marketplace. It allows users to browse products, view product details, and complete purchases.

### 2. Backend
- **Technology:** Medusa.js (self-hosted)
- **Database:** PostgreSQL (via AWS RDS)
- **Cache & Job Queue:** Redis (via AWS ElastiCache)
- **Hosting:** AWS Fargate
- **Description:** The Medusa.js backend manages product catalogs, inventory, orders, user accounts, and payment processing. It runs on AWS Fargate, utilizing PostgreSQL for its database and Redis for caching and job queue management.

### 3. AI Service (Chatbot)
- **Technology:** LangChain agents with OpenAI GPT-4 integration.
- **Vector Database:** ChromaDB or pgvector (hosted on AWS, potentially using RDS for pgvector).
- **Framework:** FastAPI
- **Hosting:** AWS Fargate
- **Description:** The AI service provides an advanced chatbot for price negotiation and customer interaction. It uses Retrieval-Augmented Generation (RAG) for dynamic and context-aware conversations. It interacts with the Medusa backend to fetch up-to-date product information for RAG and may update Medusa with negotiation outcomes.

### 4. Orchestration (Workflows)
- **Technology:** n8n (self-hosted or cloud version, deployed on AWS if self-hosted)
- **Description:** n8n workflows are used for automating various tasks, including:
    - Product ingestion from various sources (CSV, Google Sheets, web forms) into the Medusa backend.
    - Hourly inventory synchronization with the Medusa backend, including alerts.
    - Nightly vector refresh for the AI service, sourcing data from the Medusa backend to ensure up-to-date embeddings.

## Interactions

The components interact as follows:

- Users interact with the **Frontend** (hosted on Vercel) to browse and purchase products.
- The **Frontend** communicates with the **Medusa Backend** (running on AWS Fargate) to fetch product information, manage user accounts, and process orders.
- The **Frontend** integrates the **AI Service** (running on AWS Fargate) to provide chatbot functionality for price negotiation and customer support.
- The **AI Service** utilizes its **Vector Database** (on AWS) to retrieve relevant information for generating responses.
- The **AI Service** also interacts with the **Medusa Backend** (on AWS) to fetch real-time product details for RAG and to potentially record negotiation outcomes.
- **n8n Workflows** (potentially on AWS) automate data pipelines:
    - Ingesting product data directly into the **Medusa Backend**.
    - Synchronizing inventory levels within the **Medusa Backend**.
    - Sourcing data from the **Medusa Backend** to update the vector database for the **AI Service**.

## Infrastructure

- **Cloud Provider:** AWS (Amazon Web Services)
- **Key Services:**
    - **AWS Fargate:** For running containerized applications (Medusa Backend, AI Service).
    - **AWS RDS (PostgreSQL):** For Medusa's primary database and potentially pgvector.
    - **AWS ElastiCache (Redis):** For Medusa's caching and job queue.
    - **AWS S3:** For storing static assets, product images, and potentially workflow artifacts.
    - **AWS Application Load Balancer (ALB):** To distribute traffic to backend services.
    - Other services like VPC, Subnets, Security Groups, IAM roles are configured following best practices for secure networking and least privilege.
- **Frontend Hosting:** Vercel

This architecture is designed to be scalable, maintainable, and provide a premium user experience with a high degree of automation, leveraging managed AWS services for the backend infrastructure and Vercel for frontend deployment.
