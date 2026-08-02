import type { ComponentType } from "react";
import { GenericsChallenge } from "./exercises/01-generics/Challenge";
import { GenericsExercise } from "./exercises/01-generics/Exercise";
import { UtilityTypesChallenge } from "./exercises/02-utility-and-mapped-types/Challenge";
import { UtilityTypesExercise } from "./exercises/02-utility-and-mapped-types/Exercise";
import { DiscriminatedUnionsChallenge } from "./exercises/03-discriminated-unions/Challenge";
import { DiscriminatedUnionsExercise } from "./exercises/03-discriminated-unions/Exercise";
import { ComponentApiChallenge } from "./exercises/04-component-api-design/Challenge";
import { ComponentApiExercise } from "./exercises/04-component-api-design/Exercise";
import { AdvancedHooksChallenge } from "./exercises/05-advanced-hooks/Challenge";
import { AdvancedHooksExercise } from "./exercises/05-advanced-hooks/Exercise";
import { ContextReducerChallenge } from "./exercises/06-context-and-reducer/Challenge";
import { ContextReducerExercise } from "./exercises/06-context-and-reducer/Exercise";
import { PolymorphicChallenge } from "./exercises/07-polymorphic-components/Challenge";
import { PolymorphicExercise } from "./exercises/07-polymorphic-components/Exercise";
import { RuntimeValidationChallenge } from "./exercises/08-runtime-validation/Challenge";
import { RuntimeValidationExercise } from "./exercises/08-runtime-validation/Exercise";
import { ApiLayerChallenge } from "./exercises/09-type-safe-api-layer/Challenge";
import { ApiLayerExercise } from "./exercises/09-type-safe-api-layer/Exercise";
import { RealProjectRefactorExercise } from "./exercises/10-real-project-refactor/Exercise";
import { FoundationsChallenge } from "./exercises/00-foundations/Challenge";
import { FoundationsExercise } from "./exercises/00-foundations/Exercise";

export type ModuleStatus = "locked" | "available" | "in-progress" | "complete";

export type ModuleDefinition = {
  id: string;
  slug: string;
  title: string;
  difficulty: "foundations" | "beginner" | "intermediate" | "advanced";
  status: ModuleStatus;
  objectives: string[];
  component: ComponentType;
  challengeComponent?: ComponentType | null;
};

export const modules: ModuleDefinition[] = [
  {
    id: "00",
    slug: "00-foundations",
    title: "Type System Foundations",
    difficulty: "foundations",
    status: "available",
    objectives: [
      "Narrow unknown and union types safely",
      "Use as const and satisfies for literal inference",
      "Model errors as discriminated unions",
      "Render UI exhaustively with assertNever",
    ],
    component: FoundationsExercise,
    challengeComponent: FoundationsChallenge,
  },
  {
    id: "01",
    slug: "01-generics",
    title: "Generics",
    difficulty: "intermediate",
    status: "available",
    objectives: [
      "Generic components and hooks",
      "Constraints and inference",
      "DataTable and useLocalStorage",
    ],
    component: GenericsExercise,
    challengeComponent: GenericsChallenge,
  },
  {
    id: "02",
    slug: "02-utility-and-mapped-types",
    title: "Utility and Mapped Types",
    difficulty: "intermediate",
    status: "available",
    objectives: ["Pick, Omit, Partial, Record", "Custom utilities and form config typing"],
    component: UtilityTypesExercise,
    challengeComponent: UtilityTypesChallenge,
  },
  {
    id: "03",
    slug: "03-discriminated-unions",
    title: "Discriminated Unions",
    difficulty: "intermediate",
    status: "available",
    objectives: ["Tagged unions and impossible states", "RequestState and payment lifecycle"],
    component: DiscriminatedUnionsExercise,
    challengeComponent: DiscriminatedUnionsChallenge,
  },
  {
    id: "04",
    slug: "04-component-api-design",
    title: "Component API Design",
    difficulty: "intermediate",
    status: "available",
    objectives: [
      "Conditional and mutually exclusive props",
      "Compound components and native prop extension",
    ],
    component: ComponentApiExercise,
    challengeComponent: ComponentApiChallenge,
  },
  {
    id: "05",
    slug: "05-advanced-hooks",
    title: "Advanced Hooks",
    difficulty: "advanced",
    status: "available",
    objectives: ["Tuple inference and generic hooks", "Refs, stable callbacks, imperative handles"],
    component: AdvancedHooksExercise,
    challengeComponent: AdvancedHooksChallenge,
  },
  {
    id: "06",
    slug: "06-context-and-reducer",
    title: "Context and Reducer",
    difficulty: "intermediate",
    status: "available",
    objectives: ["Typed context without leaked undefined", "Reducer action unions and permissions"],
    component: ContextReducerExercise,
    challengeComponent: ContextReducerChallenge,
  },
  {
    id: "07",
    slug: "07-polymorphic-components",
    title: "Polymorphic Components",
    difficulty: "advanced",
    status: "available",
    objectives: ["ElementType and as prop", "Prop merging and ref preservation"],
    component: PolymorphicExercise,
    challengeComponent: PolymorphicChallenge,
  },
  {
    id: "08",
    slug: "08-runtime-validation",
    title: "Runtime Validation",
    difficulty: "intermediate",
    status: "available",
    objectives: ["Parse vs cast for API data", "Zod schemas and inferred types"],
    component: RuntimeValidationExercise,
    challengeComponent: RuntimeValidationChallenge,
  },
  {
    id: "09",
    slug: "09-type-safe-api-layer",
    title: "Type-Safe API Layer",
    difficulty: "advanced",
    status: "available",
    objectives: ["Typed endpoints and pagination", "Request/response inference with validation"],
    component: ApiLayerExercise,
    challengeComponent: ApiLayerChallenge,
  },
  {
    id: "10",
    slug: "10-real-project-refactor",
    title: "Real Project Refactor",
    difficulty: "advanced",
    status: "available",
    objectives: ["Incremental refactor of your own code", "Remove any and unsafe assertions"],
    component: RealProjectRefactorExercise,
    challengeComponent: null,
  },
];
