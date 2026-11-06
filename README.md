# Cognitive-Performance-Agent

This project is mainly for Students and Athletes, answering questions like "Should I keep going or take a break?” OR “When am I most ready to perform at my best?"


## System Architecture

```mermaid
flowchart TD

    %% 1. INPUTS
    subgraph DATA["1. Inputs"]
        CAL["Calendar"]
        WATCH["Watch"]
        LAP["Laptop"]
        FEED["Feedback"]
    end

    %% 2. APPLICATIONS
    subgraph APPS["2. Apps"]
        MOB["Mobile App"]
        WEB["Web App"]
        DESK["Desktop App"]
    end

    %% 3. BACKEND
    subgraph CORE["3. Backend"]
        API["FastAPI"]
        AUTH["Supabase Auth"]
        DB[("Supabase Database")]
        Q["Task Queue"]
        WORK["Workers"]
        FEAT["Feature Processing"]
    end

    %% 4. MULTI-AGENT SYSTEM
    subgraph AGENTS["4. Multi-Agent Layer"]
        SIG["Signal Agent"]
        EVD["Evidence Agent"]
        PLAN["Planning Agent"]
    end

    %% 5. DECISION LAYER
    subgraph DECISION["5. Decision Layer"]
        POLICY["Policy Engine"]
        EVAL["Evaluation"]
        REC["Recommendation + Explanation"]
    end

    %% 6. FEEDBACK LOOP
    subgraph LOOP["6. Feedback Loop"]
        SHOW["Show Advice"]
        CHOICE["User Choice"]
        ACT["Action Log"]
        OUT["Outcome Check"]
        LEARN["Learning Loop"]
    end

    %% 7. OPTIONAL EXTENSIONS
    subgraph EXTRA["7. Optional Extensions"]
        EXT["Student Features"]
        COMM["Community"]
        HUMAN["Human Support"]
        POINTS["Points / Leaderboard"]

        EXT --> COMM
        EXT --> HUMAN
        EXT --> POINTS
    end

    %% INPUTS TO APPLICATIONS
    CAL --> API
    WATCH --> MOB
    LAP --> DESK
    FEED --> MOB
    FEED --> WEB

    %% APPLICATIONS TO BACKEND
    MOB <--> API
    WEB <--> API
    DESK --> API

    %% BACKEND PROCESSING
    AUTH -.-> API
    API <--> DB
    API --> Q
    Q --> WORK
    WORK --> FEAT
    FEAT --> DB

    %% BACKEND TO AGENTS
    API --> SIG
    FEAT --> SIG
    DB --> EVD

    %% MULTI-AGENT REASONING
    SIG --> PLAN
    EVD --> PLAN

    %% POLICY AND EVALUATION
    PLAN --> POLICY
    POLICY --> EVAL
    EVAL --> REC

    %% RECOMMENDATION AND USER ACTION
    REC --> SHOW
    SHOW --> CHOICE
    CHOICE --> ACT
    ACT --> OUT
    OUT --> LEARN

    %% CLOSED FEEDBACK LOOP
    LEARN --> DB
    LEARN -.->|New feedback cycle| FEED

    %% OPTIONAL FEATURES
    WEB -.-> EXT
    MOB -.-> EXT
    LEARN -.->|Habit progress| POINTS

```
