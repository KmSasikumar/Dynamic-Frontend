
# Project Architecture & Design Overview

This document provides a visual and structural breakdown of the Trademarkia Search Application.

## 1. System Architecture
The application follows a modern usage of Next.js 15, leveraging Server Components and Client Components for optimal performance and interaction.

```mermaid
graph TD
    Client[User Browser]
    
    subgraph "Frontend Layer (Next.js)"
        Router[App Router]
        SearchPg[Search Page (Client)]
        DBPage[Database Page (Client)]
        API_Handler[API Service Layer]
    end
    
    subgraph "Data Layer"
        ExtAPI[Trademarkia External API]
        LocalDB[Local Mock DB]
    end

    Client -->|/search| Router
    Router --> SearchPg
    Client -->|/database?query=...| Router
    Router --> DBPage
    
    SearchPg -->|Async Request| API_Handler
    API_Handler -->|HTTP POST| ExtAPI
    
    DBPage -->|Filter/Sort| LocalDB
    DBPage -->|Read State| URL_Params[URL Search Params]
    URL_Params -->|Sync| DBPage
```

## 2. User Journey Flow
The core user experience revolves around searching, viewing results, and refining data.

```mermaid
sequenceDiagram
    participant User
    participant UI as Search Interface
    participant URL as URL State
    participant Data as Data Layer

    User->>UI: Enters Keyword (e.g., "Nike")
    UI->>URL: Updates ?query=Nike
    UI->>Data: Request Search Results
    Data-->>UI: Returns List [Nike Air, Swoosh...]
    UI-->>User: Displays Grid View
    
    User->>UI: Clicks "Pending" Filter
    UI->>URL: Updates ?status=pending
    UI->>Data: Filter(Status == Pending)
    Data-->>UI: Returns Filtered List
    UI-->>User: Updates Grid
```

## 3. Component Hierarchy
A breakdown of the key structural components and their relationships.

```mermaid
classDiagram
    class Layout {
        +Global Styles
        +Font Optimization
    }
    class SearchPage {
        +SearchBar
        +TrendingResults
        +API Integration
    }
    class DatabasePage {
        +SidebarFilters
        +ResultGrid/List
        +OwnerSearch
    }
    class TrademarkCard {
        +Image
        +StatusIndicator
        +OwnerInfo
    }

    Layout <|-- SearchPage
    Layout <|-- DatabasePage
    DatabasePage *-- TrademarkCard : Renders Many
    DatabasePage *-- SidebarFilters : Contains
```

## 4. Key Data Models (TypeScript Interfaces)
The application relies on strict typing to ensure data consistency between the API and UI.

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` / `serialNumber` | `string` | Unique identifier for the trademark. |
| `name` / `wordmark` | `string` | The text or name of the trademark. |
| `owner` | `string` | The legal entity owning the trademark. |
| `status` | `string` | Current legal status (e.g., Live, Dead, Pending). |
| `statusColor` | `string` | UI helper for visual indicators (green, yellow, red). |
| `classes` | `string[]` | Array of goods/services classes (e.g., Class 25). |

## 5. File System Structure
```mermaid
graph LR
    Root[src/app] --> Page[page.tsx (Landing)]
    Root --> Search[search/page.tsx]
    Root --> DB[database/]
    DB --> DBContent[DatabasePageContent.tsx]
    DB --> DBPage[page.tsx]
    
    style Root fill:#f9f,stroke:#333
    style Search fill:#bbf,stroke:#333
    style DBContent fill:#bfb,stroke:#333
```
