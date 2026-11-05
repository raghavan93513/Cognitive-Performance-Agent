# Cognitive-Performance-Agent

This project is mainly for Students and Athletes, answering questions like "Should I keep going or take a break?” OR “When am I most ready to perform at my best?"

## System Design

```mermaid
flowchart TD

    %% ==========================================
    %% 1. DATA SOURCES AND CLIENTS
    %% ==========================================

    subgraph DATA["1. Data Sources and Collection"]
        CAL["Calendar Data<br/>Classes, meetings, deadlines"]
        WATCH["Watch Data<br/>Sleep, HR, HRV, steps, activity"]
        LAP["Laptop Data<br/>Study duration, app switches,<br/>active/idle time, breaks"]
        TASK["Study Outcomes and Feedback<br/>Accuracy, speed, task difficulty,<br/>focus and fatigue ratings"]

        CAL_SYNC["Calendar OAuth Connector"]
        MOBILE["React Native Mobile App<br/>Wearable sync and check-ins"]
        DESKTOP["Tauri Desktop Collector"]
        WEB["Next.js Web Dashboard"]

        CAL --> CAL_SYNC
        WATCH --> MOBILE
        LAP --> DESKTOP
        TASK --> WEB
        TASK --> MOBILE
    end

    %% ==========================================
    %% 2. API, STORAGE AND BACKGROUND PROCESSING
    %% ==========================================

    subgraph BACKEND["2. Backend and Data Processing"]
        AUTH["Supabase Auth<br/>Identity and data permissions"]
        API["FastAPI Backend<br/>Secure ingestion and APIs"]

        DB[("Supabase Database<br/>Observations, study sessions,<br/>outcomes, features, consent,<br/>recommendations, feedback, audit")]

        QUEUE["Supabase Queues - pgmq<br/>Background jobs and retries"]
        WORKER["Python Background Worker"]

        VALIDATE["Data Validation<br/>Missing values, timestamps,<br/>duplicates and signal quality"]

        FEATURES["Feature Engineering<br/>Recent behavior, personal baselines,<br/>sleep and movement context,<br/>task performance metrics"]

        AUTH -.-> API
        API --> DB
        API -->|Background jobs| QUEUE
        QUEUE --> WORKER
        DB --> WORKER
        WORKER --> VALIDATE
        VALIDATE --> FEATURES
        FEATURES --> DB
    end

    CAL_SYNC --> API
    MOBILE --> API
    DESKTOP --> API
    WEB --> API

    %% ==========================================
    %% 3. MULTI-AGENT INTELLIGENCE
    %% ==========================================

    subgraph AGENTS["3. Multi-Agent Reasoning System"]
        TRIGGER["Study Checkpoint Trigger<br/>Session event or manual request"]

        ORCH["Agent Orchestrator<br/>Coordinates specialist agents"]

        SIGNAL["Signal Interpreter Agent<br/>Interprets laptop and body context<br/>Identifies changes and uncertainty"]

        PERF["Task Performance Agent<br/>Examines accuracy, speed,<br/>difficulty and recent progress"]

        EVIDENCE["Evidence Reviewer Agent<br/>Retrieves comparable past sessions,<br/>personal history and outcomes"]

        PLANNER["Action Planner Agent<br/>Generates candidate actions:<br/>continue, screen break,<br/>or accessible movement break"]

        TRIGGER --> ORCH
        ORCH --> SIGNAL
        SIGNAL --> PERF
        PERF --> EVIDENCE
        EVIDENCE --> PLANNER
    end

    API -->|Recommendation request| TRIGGER
    FEATURES -->|Updated feature snapshot| TRIGGER
    DB -.->|Historical evidence| EVIDENCE
    DB -.->|Session context| ORCH

    %% ==========================================
    %% 4. EVALUATION AND INDEPENDENT POLICY
    %% ==========================================

    subgraph DECISION["4. Evaluation and Recommendation Decision"]
        EVAL["Pre-Recommendation Evaluation<br/>Candidate suitability, evidence strength,<br/>uncertainty, likely interruption burden"]

        POLICY["Independent Policy Engine<br/>Consent, safety, accessibility,<br/>calendar conflicts, quiet hours,<br/>notification cooldowns"]

        SELECT["Recommendation Selector<br/>Select a supported action<br/>or return no recommendation"]

        EXPLAIN["Explanation Builder<br/>Observed evidence, suggested action,<br/>limitations and user choices"]

        EVAL --> POLICY
        POLICY --> SELECT
        SELECT --> EXPLAIN
    end

    PLANNER --> EVAL
    DB -.->|Preferences and calendar context| POLICY

    %% ==========================================
    %% 5. RECOMMENDATION AND FEEDBACK LOOP
    %% ==========================================

    subgraph LOOP["5. Recommendation, Feedback and Learning"]
        DISPLAY["Deliver Recommendation<br/>Web or mobile interface"]

        CHOICE["Student Decision<br/>Accept / Postpone / Decline"]

        ACTION["Action Tracking<br/>Record whether the chosen action<br/>was actually completed"]

        FOLLOWUP["Follow-Up Measurement<br/>Comparable task results,<br/>optional focus and fatigue check-in"]

        POST_EVAL["Post-Action Outcome Evaluation<br/>Accuracy, completion time,<br/>perceived usefulness and disruption"]

        LEARN["Personal Evidence Update<br/>Record reviewed patterns and outcomes<br/>for future recommendations"]

        DISPLAY --> CHOICE
        CHOICE --> ACTION
        ACTION --> FOLLOWUP
        FOLLOWUP --> POST_EVAL
        POST_EVAL --> LEARN
    end

    EXPLAIN --> DISPLAY

    CHOICE -.->|Save decision| API
    ACTION -.->|Save actual action| API
    FOLLOWUP -.->|Submit measurements| API
    LEARN --> DB

    %% ==========================================
    %% 6. OPTIONAL EXTENSIONS - PHASE 2
    %% ==========================================

    subgraph EXT["6. Optional Student Support and Motivation"]
        EXTRA["Optional Features in Student Apps"]

        COMMUNITY["Peer Learning Community<br/>Share chosen study routines<br/>with students pursuing similar goals"]

        HUMAN["Human Support Directory<br/>Verified counselors, academic advisors,<br/>and learning-support contacts"]

        POINTS["Habit Points and Leaderboards<br/>Reward planning, completed blocks,<br/>recovery and reflection<br/>Voluntary participation"]

        EXTRA --> COMMUNITY
        EXTRA --> HUMAN
        EXTRA --> POINTS
    end

    WEB -.-> EXTRA
    MOBILE -.-> EXTRA
    LEARN -.->|Eligible habit events only| POINTS
```
