# Cognitive-Performance-Agent

This project is mainly for Students and Athletes, answering questions like "Should I keep going or take a break?” OR “When am I most ready to perform at my best?"

## System Design

```mermaid
flowchart TD

    subgraph INPUTS["1. Inputs"]
        CAL["Calendar"]
        WATCH["Watch"]
        LAP["Laptop"]
        FEEDBACK["Feedback"]
    end

    subgraph APPS["2. Apps"]
        MOBILE["Mobile App"]
        WEB["Web App"]
        DESKTOP["Desktop App"]
    end

    subgraph BACKEND["3. Backend"]
        API["FastAPI"]
        AUTH["Supabase Auth"]
        DB[("Supabase Database")]
        QUEUE["Job Queue"]
        WORKER["Workers"]
        FEATURES["Features"]
    end

    subgraph AGENTS["4. Multi-Agent Reasoning"]
        SIGNAL["Signal Agent"]
        EVIDENCE["Evidence Agent"]
        PLANNER["Planning Agent"]
    end

    subgraph DECISION["5. Decision Layer"]
        POLICY["Policy Engine"]
        EVAL["Evaluation"]
        ADVICE["Advice + Reason"]
    end

    subgraph LOOP["6. Feedback Loop"]
        DISPLAY["Show Advice"]
        CHOICE["Student Choice"]
        ACTION["Action Log"]
        OUTCOME["Outcome Check"]
        LEARN["Evidence Update"]
    end

    subgraph EXT["7. Optional Extensions"]
        OPTIONAL["Opt-in Features"]
        COMMUNITY["Peer Community"]
        HUMAN["Human Support"]
        POINTS["Points + Leaderboard"]
        OPTIONAL --> COMMUNITY
        OPTIONAL --> HUMAN
        OPTIONAL --> POINTS
    end

    CAL --> API
    WATCH --> MOBILE
    LAP --> DESKTOP
    FEEDBACK --> MOBILE
    FEEDBACK --> WEB

    DESKTOP --> API
    MOBILE <--> API
    WEB <--> API

    AUTH -.-> API
    API --> DB
    API --> QUEUE
    QUEUE --> WORKER
    WORKER --> FEATURES
    FEATURES --> DB

    API -->|Study checkpoint| SIGNAL
    API -->|Study checkpoint| EVIDENCE
    DB -.-> SIGNAL
    DB -.-> EVIDENCE
    SIGNAL --> PLANNER
    EVIDENCE --> PLANNER

    PLANNER --> POLICY
    DB -.-> POLICY
    POLICY --> EVAL
    EVAL --> ADVICE

    ADVICE --> DISPLAY
    DISPLAY --> CHOICE
    CHOICE --> ACTION
    ACTION --> OUTCOME
    OUTCOME --> LEARN
    LEARN --> DB

    DISPLAY -.-> OPTIONAL
```
