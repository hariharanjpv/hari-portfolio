export const person = {
  name: "Hariharan JP",
  initials: "JP",
  email: "hariharan.jpv@gmail.com",
  phone: "+91 9360641549",
  location: "Bengaluru, KA",
  summary: `Backend Software Engineer with 3.5+ years of experience building scalable, fault-tolerant systems powering cloud-scale security products. Specialized in Java, Spring Boot, and Kafka-based microservices, with deep experience in real-time event processing, Elasticsearch analytics, and OAuth2-secured APIs.`,
  experience: [
    {
      role: "Software Engineer II",
      company: "Zoho Corporation",
      product: "EventLog Analyzer & Log360 Cloud – SIEM Platform",
      period: "January 2022 – Present",
      location: "Chennai, TN",
      bullets: [
        "Led migration of Threat Processing into a decoupled Kafka-based microservice architecture, improving throughput by 45% and enabling horizontal scalability.",
        "Built AWS-based log ingestion pipelines for CloudTrail and S3 using SNS & SQS for near real-time monitoring.",
        "Integrated threat-intel platforms (Kaspersky, CrowdStrike, Bitdefender) and ingested millions of IOCs daily; cached lookups in Redis.",
        "Designed and maintained Elasticsearch clusters for billions of log entries; optimized sharding and queries for analytics.",
        "Built secure REST APIs with OAuth2 and API token access control for internal/external integrations.",
        "Implemented automated test suites using QEngine, raising test coverage and halving manual regression effort."
      ]
    }
  ],
  projects: [
    {
      title: "Network Monitoring Software",
      subtitle: "PSNACET Network Security Lab",
      period: "Jan 2022 – Apr 2022",
      desc: "Engineered a comprehensive network monitoring solution to identify and prevent phishing using 10 years of threat feed data, integrating with organizational firewalls.",
      tech: ["Python", "Scapy", "TensorFlow"]
    },
    {
      title: "Real-time Log Analytics",
      subtitle: "Zoho EventLog",
      period: "May 2022 – Dec 2022",
      desc: "Built a Kafka-based real-time log ingestion and processing system handling 100K+ events per second with sub-second latency dashboards.",
      tech: ["Kafka", "Elasticsearch", "Java"]
    },
    {
      title: "API Gateway Service",
      subtitle: "Internal Infrastructure",
      period: "Jan 2023 – Jun 2023",
      desc: "Designed and implemented OAuth2-secured API gateway with rate limiting, request validation, and comprehensive audit logging for 20+ microservices.",
      tech: ["Spring Boot", "OAuth2", "Redis"]
    },
    {
      title: "Threat Intelligence Engine",
      subtitle: "Zoho Log360",
      period: "Jul 2023 – Present",
      desc: "Integrated third-party threat feeds (Kaspersky, CrowdStrike) and built ML-based anomaly detection pipeline for detecting and correlating security threats.",
      tech: ["Java", "Machine Learning", "AWS"]
    },
    {
      title: "Database Optimization",
      subtitle: "Performance Engineering",
      period: "Aug 2023 – Dec 2023",
      desc: "Optimized Elasticsearch queries and PostgreSQL indexes, reducing query latency by 60% and enabling analytics on 10B+ historical records.",
      tech: ["Elasticsearch", "PostgreSQL", "Query Optimization"]
    }
  ],
  skills: {
    languages: ["Java", "JavaScript", "Python", "NodeJS"],
    frameworks: ["Spring Boot", "Apache Kafka", "REST APIs"],
    dbs: ["PostgreSQL", "MySQL", "Redis", "Elasticsearch", "MongoDB"],
    devops: ["Docker", "Kubernetes", "AWS (EC2, S3, CloudTrail)", "Git"]
  },
  awards: [
    "2024 — Spokesperson for ATA at Zoho technical expo",
    "2023 — Outstanding Contributor for EventLog Analyzer",
    "2020 — 2nd/130 Competitive Programming, PSNACET",
    "2019 — Runner-up, Line-following Robot Competition, Kumaraguru CT"
  ],
  education: {
    school: "Anna University",
    degree: "BE in Computer Science",
    period: "Jun 2018 - May 2022",
    gpa: "8.14/10"
  }
};
