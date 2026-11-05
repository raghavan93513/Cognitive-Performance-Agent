# Cognitive-Performance-Agent

This project is mainly for Students and Athletes, answering questions like "Should I keep going or take a break?” OR “When am I most ready to perform at my best?"

## System Design

```mermaid
flowchart TD

    subgraph DATA["1. Inputs"]
        CAL["Calendar"]
        WATCH["Watch"]
        LAP["Laptop"]
        TASK["Tasks"]
        FEED["Feedback"]
    end

    subgraph APPS["2. Apps"]
        MOB["Mobile App"]
        WEB["Web App"]
        DESK["Desktop App"]
    end

    subgraph CORE["3. Backend"]
        API["FastAPI"]
        AUTH["Auth"]
        DB["Supabase"]
        Q["Queue"]
        WORK["Workers"]
        FEAT["Features"]
    end

    subgraph AGENTS["4. Multi-Agent Layer"]
        ORCH["Orchestrator"]
        SIG["Signal Agent"]
        PERF["Performance Agent"]
        EVD["Evidence Agent"]
        PLAN["Planning Agent"]
    end

    subgraph DECISION["5. Decision Layer"]
        EVAL["Evaluation"]
        POLICY["Policy Engine"]
        REC["Recommendation"]
        EXPLAIN["Explanation"]
    end

    subgraph LOOP["6. Closed Loop"]
        SHOW["Show Advice"]
        CHOICE["User Choice"]
        ACT["Action Log"]
        OUT["Outcome Check"]
        LEARN["Learning Loop"]
    end

    subgraph EXTRA["7. Optional Extensions"]
        COMM["Community"]
        HUMAN["Human Support"]
        POINTS["Points / Leaderboard"]
    end

    CAL --> API
    WATCH --> MOB
    LAP --> DESK
    TASK --> WEB
    FEED --> MOB
    FEED --> WEB

    MOB --> API
    WEB --> API
    DESK --> API

    AUTH --> API
    API --> DB
    API --> Q
    Q --> WORK
    DB --> WORK
    WORK --> FEAT
    FEAT --> DB

    API --> ORCH
    FEAT --> ORCH
    DB --> EVD

    ORCH --> SIG
    SIG --> PERF
    PERF --> EVD
    EVD --> PLAN

    PLAN --> EVAL
    EVAL --> POLICY
    POLICY --> REC
    REC --> EXPLAIN

    EXPLAIN --> SHOW
    SHOW --> CHOICE
    CHOICE --> ACT
    ACT --> OUT
    OUT --> LEARN
    LEARN --> DB

    WEB -.-> COMM
    WEB -.-> HUMAN
    WEB -.-> POINTS
    MOB -.-> COMM
    MOB -.-> HUMAN
    MOB -.-> POINTS
```
