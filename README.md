# Trivia Visualization Dashboard

Interactive data visualization dashboard for exploring questions from the [Open Trivia Database API](https://opentdb.com/).
The tool provides visual analytics of trivia questions distribution by categories and difficulty levels with interactive
filtering capabilities.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![npm](https://img.shields.io/npm/v/recharts?label=Recharts)

## Features

-  **Main Distribution Chart**: Visualize question distribution across categories
-  **Detailed Breakdown**: Drill down into difficulty levels for each category
-  **Interactive Selection**: Click on chart slices or use dropdown to filter data by categories

## Architecture

### Custom Hooks
- [useGetDataWithCounts.ts](src/hooks/useGetDataWithCounts.ts) - transforms an input array into aggregated count data suitable for charts.
- [useHtmlDecodedCategoriesData.ts](src/hooks/useHtmlDecodedCategoriesData.ts) - decodes HTML categories field in data from Trivia API

### Providers
- `AccessibilityProvider` - manages accessibility settings throughout the application

### Components
- [Dashboard.tsx](src/components/Dashboard/Dashboard.tsx) - main component with data fetching and visualization
- [MainChart.tsx](src/components/MainChart/MainChart.tsx) - main BarChart by category (or by provided main slice selector - `mainSliceFieldSelector`)
- [DetailedBySliceChart.tsx](src/components/DetailedBySliceChart/DetailedBySliceChart.tsx) - wrapper with information about selected slice around `DetailsChart`
- [DetailsChart.tsx](src/components/DetailsChart/DetailsChart.tsx) - PieChart visualizations by difficulty (or by provided details selector - `detailedSelector`)
- [MainSliceSelection.tsx](src/components/MainSliceSelection/MainSliceSelection.tsx) - selection dropdown for main slice
- [Header.tsx](src/components/Header/Header.tsx) - application header
- [LoadingPage.tsx](src/components/LoadingPage/LoadingPage.tsx)- loading state display
- [FetchErrorMessage.tsx](src/components/FetchErrorMessage/FetchErrorMessage.tsx) - error state for data loading
- [VisuallyHidden.tsx](src/components/VisuallyHidden/VisuallyHidden.tsx) - accessibility helper component

## App configuration

Properties of [App.tsx](src/App.tsx).

`@property {AppConfig} [appConfig]`: application configuration settings. Defaults to `defaultAppConfig` (see [AppConfig.ts](src/AppConfig.ts)) if not provided.

`@property {Question[]} [data]`: array of data to display. If provided, the app will use this data instead of fetching from API (see [trivia.ts](src/api/trivia.ts)).

`@property {DataFieldSelectorType} [mainSliceFieldSelector]`: main field selector from the data used to build the primary dashboard chart.
Expected to have up to 30 different values for optimal visualization.
Defaults to `categoryFieldSelector` (see [AppConfig.ts](src/AppConfig.ts)) if not provided.

`@property {DataFieldSelectorType} [detailedSelector]`: additional breakdown selector for detailed view.
Expected to have between 2 to 6 different values for optimal UI.
More values may result in uncomfortable UI experience.
Defaults to `difficultyFieldSelector` (see [AppConfig.ts](src/AppConfig.ts)) if not provided.

## API Integration

If data isn't provided the application uses data from an external trivia API (see [trivia.ts](src/api/trivia.ts)).
API configuration can be found in [ApiConfig.ts](src/api/ApiConfig.ts).

## Integration challenges
Keeping in mind the objectives of the project I am applying for, I tried to expose this solution as a configurable component.

### ***Key challenges***

1.  **Scalability**  
    The current implementation assumes moderate data variance (10-20 categories, 3-5 difficulty levels). This visual solution is designed for a certain variability of the sample.

2.  **Data contracts**  
    The tool operates on string names rather than IDs due to the Trivia API structure. Production systems require ID-based operations and normalized data models (`{id, name}`).

3.  **UI consistency**  
    No design system integration exists. The component needs theming support (colors, fonts etc.) to match host application styles.


### **Summary**

To integrate, this component needs to be made more abstract, the logic for receiving and cleaning data needs to be removed from it, and support for IDs and configurability of styles needs to be added. Also, with large amounts of data, it's always a good idea to take another look at performance.
