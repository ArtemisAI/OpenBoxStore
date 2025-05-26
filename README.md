 # The Open Box / La Bo\xEF\xBF\xBD Bo\xEF\xBF\xBDte Ouverte
 
 Version 1.0 – 23 May 2025
 
 ## Overview
 
 The Open Box / La Bo\xEF\xBF\xBDte Ouverte (TOB/LBO) is an online marketplace dedicated to high-quality second-hand goods. The platform aims to deliver a premium user experience by combining an open-source commerce storefront with automated catalog ingestion workflows (using n8n) and an advanced AI chatbot (using Retrieval-Augmented Generation) for price negotiation and customer interaction. It supports both English and French locales.
 
 ## Business & Technical Specification Overview
 
 This document summarizes the high-level business, functional, and non-functional requirements for the project. It serves as a roadmap for development and outlines essential technical details for the successful implementation and deployment of the platform.
 
 ### 1. Executive Summary
 - Online re-commerce marketplace with low manual overhead.
 - Focus on quality and automation, combining modern storefront and AI-driven interactions.
 
 ### 2. Business Requirements
 - **Mission & Value Proposition:** Re-commerce made effortless with automated operations and a premium user experience.
 - **Stakeholders:** Product Owner, Operations Lead, Dev Team, and Customers.
 - **Success Metrics:**
   - Time-to-publish per new product ≤ 5 min.
   - Chatbot CSAT ≥ 4.5/5.
   - Monthly active users ≥ 10k within 6 months.
 
 ### 3. Functional Requirements
 - Catalogue management with automated product ingestion via CSV/Google Sheet/web form.
 - Product listing and search with server-side rendering and advanced text/vector search.
 - Detailed product pages with high-resolution images, structured metadata, and integrated negotiation chat.
 - Secure checkout and payments via Stripe with TaxJar integration.
 - User account management including social logins and email/password support.
 - Admin dashboard for order tracking, inventory, and chatbot transcripts.
 - Content management (MDX-based CMS), multilingual routing (EN/FR), and SEO optimizations.
 - AI chatbot using Retrieval-Augmented Generation for dynamic, context-aware interactions and negotiation.
 
 ### 4. Non-Functional Requirements
 - Performance: < 100 ms TTFB (95th percentile).
 - Scalability: Handle 1k concurrent users.
 - Availability: 99.9% monthly SLA.
 - Accessibility: WCAG 2.2 AA compliant.
 - Security & Compliance: PCI-DSS, GDPR, PIPEDA.
 - Localization: Support for multiple currencies (CAD, EUR, USD) and date formats.
 
 ### 5. System Architecture
 - **Frontend:** Next.js 14 with Vercel Commerce template, Tailwind CSS, shadcn/ui, hosted on Vercel.
 - **Backend:** Choice between Medusa.js (self-hosted) and Saleor Cloud solution.
 - **Orchestration:** n8n workflows for product ingestion, inventory sync, and vector refresh.
 - **AI & RAG:** LangChain agents with OpenAI GPT-4 integration for a negotiation chatbot; vector DB via ChromaDB or pgvector.
 - **Infrastructure:** AWS (Fargate, RDS, S3, CloudFront) with secure networking and least privilege IAM roles.
 
 ### 6. Detailed Integration & Deployment
 - n8n workflows for:
   - Product ingestion (CSV/Google Drive/Web form triggers).
   - Hourly inventory synchronization with alerts.
   - Nightly vector refresh for updated embeddings.
 - Chatbot service using hybrid retrieval (BM25 + dense) and negotiation logic.
 - Environment configurations for Dev, Staging, and Prod with domain, scaling, and backup specifics.
 - CI/CD pipeline including linting, testing, Docker builds, security scanning, and automated deployments.
 
 ## Project Structure
 
 Below is the high-level repository structure:
 
 ```
 openbox/
   ├── frontend/    # Next.js application (Vercel Commerce template)
   ├── backend/     # Medusa modules or Saleor hooks
   ├── ai-service/  # LangChain FastAPI for chatbot and negotiation service
   ├── workflows/   # n8n JSON exports (Product ingestion, inventory sync, vector refresh)
   ├── infra/       # Terraform, Helm charts, and other infrastructure as code
   └── docs/        # Detailed specifications, architecture diagrams, and additional documentation
 ```

 ## Deployment

 This project is configured for deployment on [Render.com](https://render.com/) using the `render.yaml` file located in the root of the repository. This file defines all the necessary services, databases, environment variables, and build configurations.

 To deploy, connect your Git repository to Render and create a new "Blueprint" instance, pointing Render to the `render.yaml` file. Render will then provision and deploy all the services automatically.

 ## Local Development

 For local development, a `docker-compose.yml` file is provided (or will be provided) to orchestrate the services.

 To start the services locally:
 ```bash
 docker-compose up --build -d
 ```
 Ensure you have Docker and Docker Compose installed. Environment variables for local development should be managed via `.env` files within each service directory, based on their respective `.env.example` files. The `docker-compose.yml` is designed to align with the `render.yaml` setup, but always refer to the specific `.env.example` files for local configuration details.

 ## TODO List / Roadmap
 
 - [ ] Setup the Next.js storefront in the frontend directory.
 - [ ] Implement backend functionality using Medusa.js or integrate Saleor APIs.
 - [ ] Develop the AI service with LangChain and FastAPI for chatbot integration.
 - [ ] Integrate n8n workflows for automated product ingestion and inventory sync.
 - [ ] Create infrastructure automation scripts in the infra directory (Terraform/Helm).
 - [ ] Populate the docs directory with architecture diagrams, detailed specs, and API contracts.
 - [ ] Setup CI/CD pipeline with linting, testing, Docker builds, and deployment workflows.
 - [ ] Implement multilingual routing (EN/FR) and SEO optimizations with Next-SEO.
 - [ ] Complete unit, integration, and end-to-end tests.
 
 ## Additional Placeholders and Considerations
 
 - Placeholder files for API contracts within the ai-service and backend directories.
 - JSON workflow files for n8n under workflows/ (e.g., product-ingestion.json).
 - Templates and placeholder documents in docs/ for detailed technical specs and diagrams.
 - Environment-specific configuration files for dev, staging, and production in the infra directory.
 - Continuous refinement based on evolving design and development discussions.
 
 ---
 
 See full Technical & Business Specification in [docs/specification.md] for further details.