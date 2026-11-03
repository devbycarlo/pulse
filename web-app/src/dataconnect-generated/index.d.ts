import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateIntervalData {
  interval_insert: Interval_Key;
}

export interface CreateIntervalVariables {
  name: string;
  durationSeconds: number;
  sequenceOrder: number;
  routineId: UUIDString;
}

export interface CreateRoutineData {
  routine_insert: Routine_Key;
}

export interface CreateRoutineVariables {
  name: string;
  workDurationSeconds: number;
  restDurationSeconds: number;
  rounds: number;
  description?: string | null;
  workoutCategoryId?: UUIDString | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
}

export interface CreateWorkoutCategoryData {
  workoutCategory_insert: WorkoutCategory_Key;
}

export interface CreateWorkoutCategoryVariables {
  name: string;
}

export interface CreateWorkoutSessionData {
  workoutSession_insert: WorkoutSession_Key;
}

export interface CreateWorkoutSessionVariables {
  routineId: UUIDString;
  completedAt: TimestampString;
  totalDurationSeconds: number;
}

export interface DeleteIntervalData {
  interval_delete?: Interval_Key | null;
}

export interface DeleteIntervalVariables {
  id: UUIDString;
}

export interface DeleteRoutineData {
  routine_delete?: Routine_Key | null;
}

export interface DeleteRoutineVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteWorkoutCategoryData {
  workoutCategory_delete?: WorkoutCategory_Key | null;
}

export interface DeleteWorkoutCategoryVariables {
  id: UUIDString;
}

export interface DeleteWorkoutSessionData {
  workoutSession_delete?: WorkoutSession_Key | null;
}

export interface DeleteWorkoutSessionVariables {
  id: UUIDString;
}

export interface GetIntervalData {
  interval?: {
    name: string;
    durationSeconds: number;
    sequenceOrder: number;
  };
}

export interface GetIntervalVariables {
  id: UUIDString;
}

export interface GetRoutineData {
  routine?: {
    name: string;
    workDurationSeconds: number;
    rounds: number;
    description?: string | null;
  };
}

export interface GetRoutineVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
    profilePhotoUrl?: string | null;
  };
}

export interface GetWorkoutCategoryData {
  workoutCategory?: {
    name: string;
  };
}

export interface GetWorkoutCategoryVariables {
  id: UUIDString;
}

export interface GetWorkoutSessionData {
  workoutSession?: {
    completedAt: TimestampString;
    totalDurationSeconds: number;
  };
}

export interface GetWorkoutSessionVariables {
  id: UUIDString;
}

export interface Interval_Key {
  id: UUIDString;
  __typename?: 'Interval_Key';
}

export interface ListIntervalsForRoutineData {
  intervals: ({
    name: string;
    sequenceOrder: number;
  })[];
}

export interface ListIntervalsForRoutineVariables {
  routineId: UUIDString;
}

export interface ListMyRoutinesData {
  routines: ({
    id: UUIDString;
    name: string;
  } & Routine_Key)[];
}

export interface ListMyWorkoutCategoriesData {
  workoutCategories: ({
    id: UUIDString;
    name: string;
  } & WorkoutCategory_Key)[];
}

export interface ListMyWorkoutSessionsData {
  workoutSessions: ({
    id: UUIDString;
    completedAt: TimestampString;
    totalDurationSeconds: number;
  } & WorkoutSession_Key)[];
}

export interface ListUsersData {
  users: ({
    username: string;
    profilePhotoUrl?: string | null;
  })[];
}

export interface Routine_Key {
  id: UUIDString;
  __typename?: 'Routine_Key';
}

export interface UpdateIntervalData {
  interval_update?: Interval_Key | null;
}

export interface UpdateIntervalVariables {
  id: UUIDString;
  durationSeconds?: number | null;
}

export interface UpdateRoutineData {
  routine_update?: Routine_Key | null;
}

export interface UpdateRoutineVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  username?: string | null;
  email?: string | null;
  profilePhotoUrl?: string | null;
}

export interface UpdateWorkoutCategoryData {
  workoutCategory_update?: WorkoutCategory_Key | null;
}

export interface UpdateWorkoutCategoryVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateWorkoutSessionData {
  workoutSession_update?: WorkoutSession_Key | null;
}

export interface UpdateWorkoutSessionVariables {
  id: UUIDString;
  totalDurationSeconds: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WorkoutCategory_Key {
  id: UUIDString;
  __typename?: 'WorkoutCategory_Key';
}

export interface WorkoutSession_Key {
  id: UUIDString;
  __typename?: 'WorkoutSession_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface CreateWorkoutCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutCategoryVariables): MutationRef<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWorkoutCategoryVariables): MutationRef<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
  operationName: string;
}
export const createWorkoutCategoryRef: CreateWorkoutCategoryRef;

export function createWorkoutCategory(vars: CreateWorkoutCategoryVariables): MutationPromise<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
export function createWorkoutCategory(dc: DataConnect, vars: CreateWorkoutCategoryVariables): MutationPromise<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;

interface UpdateWorkoutCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutCategoryVariables): MutationRef<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWorkoutCategoryVariables): MutationRef<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
  operationName: string;
}
export const updateWorkoutCategoryRef: UpdateWorkoutCategoryRef;

export function updateWorkoutCategory(vars: UpdateWorkoutCategoryVariables): MutationPromise<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
export function updateWorkoutCategory(dc: DataConnect, vars: UpdateWorkoutCategoryVariables): MutationPromise<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;

interface DeleteWorkoutCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutCategoryVariables): MutationRef<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWorkoutCategoryVariables): MutationRef<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
  operationName: string;
}
export const deleteWorkoutCategoryRef: DeleteWorkoutCategoryRef;

export function deleteWorkoutCategory(vars: DeleteWorkoutCategoryVariables): MutationPromise<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
export function deleteWorkoutCategory(dc: DataConnect, vars: DeleteWorkoutCategoryVariables): MutationPromise<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;

interface CreateRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
  operationName: string;
}
export const createRoutineRef: CreateRoutineRef;

export function createRoutine(vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;
export function createRoutine(dc: DataConnect, vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface UpdateRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRoutineVariables): MutationRef<UpdateRoutineData, UpdateRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRoutineVariables): MutationRef<UpdateRoutineData, UpdateRoutineVariables>;
  operationName: string;
}
export const updateRoutineRef: UpdateRoutineRef;

export function updateRoutine(vars: UpdateRoutineVariables): MutationPromise<UpdateRoutineData, UpdateRoutineVariables>;
export function updateRoutine(dc: DataConnect, vars: UpdateRoutineVariables): MutationPromise<UpdateRoutineData, UpdateRoutineVariables>;

interface DeleteRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRoutineVariables): MutationRef<DeleteRoutineData, DeleteRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteRoutineVariables): MutationRef<DeleteRoutineData, DeleteRoutineVariables>;
  operationName: string;
}
export const deleteRoutineRef: DeleteRoutineRef;

export function deleteRoutine(vars: DeleteRoutineVariables): MutationPromise<DeleteRoutineData, DeleteRoutineVariables>;
export function deleteRoutine(dc: DataConnect, vars: DeleteRoutineVariables): MutationPromise<DeleteRoutineData, DeleteRoutineVariables>;

interface CreateIntervalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateIntervalVariables): MutationRef<CreateIntervalData, CreateIntervalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateIntervalVariables): MutationRef<CreateIntervalData, CreateIntervalVariables>;
  operationName: string;
}
export const createIntervalRef: CreateIntervalRef;

export function createInterval(vars: CreateIntervalVariables): MutationPromise<CreateIntervalData, CreateIntervalVariables>;
export function createInterval(dc: DataConnect, vars: CreateIntervalVariables): MutationPromise<CreateIntervalData, CreateIntervalVariables>;

interface UpdateIntervalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateIntervalVariables): MutationRef<UpdateIntervalData, UpdateIntervalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateIntervalVariables): MutationRef<UpdateIntervalData, UpdateIntervalVariables>;
  operationName: string;
}
export const updateIntervalRef: UpdateIntervalRef;

export function updateInterval(vars: UpdateIntervalVariables): MutationPromise<UpdateIntervalData, UpdateIntervalVariables>;
export function updateInterval(dc: DataConnect, vars: UpdateIntervalVariables): MutationPromise<UpdateIntervalData, UpdateIntervalVariables>;

interface DeleteIntervalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteIntervalVariables): MutationRef<DeleteIntervalData, DeleteIntervalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteIntervalVariables): MutationRef<DeleteIntervalData, DeleteIntervalVariables>;
  operationName: string;
}
export const deleteIntervalRef: DeleteIntervalRef;

export function deleteInterval(vars: DeleteIntervalVariables): MutationPromise<DeleteIntervalData, DeleteIntervalVariables>;
export function deleteInterval(dc: DataConnect, vars: DeleteIntervalVariables): MutationPromise<DeleteIntervalData, DeleteIntervalVariables>;

interface CreateWorkoutSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutSessionVariables): MutationRef<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWorkoutSessionVariables): MutationRef<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
  operationName: string;
}
export const createWorkoutSessionRef: CreateWorkoutSessionRef;

export function createWorkoutSession(vars: CreateWorkoutSessionVariables): MutationPromise<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
export function createWorkoutSession(dc: DataConnect, vars: CreateWorkoutSessionVariables): MutationPromise<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;

interface UpdateWorkoutSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutSessionVariables): MutationRef<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWorkoutSessionVariables): MutationRef<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
  operationName: string;
}
export const updateWorkoutSessionRef: UpdateWorkoutSessionRef;

export function updateWorkoutSession(vars: UpdateWorkoutSessionVariables): MutationPromise<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
export function updateWorkoutSession(dc: DataConnect, vars: UpdateWorkoutSessionVariables): MutationPromise<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;

interface DeleteWorkoutSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutSessionVariables): MutationRef<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteWorkoutSessionVariables): MutationRef<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
  operationName: string;
}
export const deleteWorkoutSessionRef: DeleteWorkoutSessionRef;

export function deleteWorkoutSession(vars: DeleteWorkoutSessionVariables): MutationPromise<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
export function deleteWorkoutSession(dc: DataConnect, vars: DeleteWorkoutSessionVariables): MutationPromise<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface GetWorkoutCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkoutCategoryVariables): QueryRef<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkoutCategoryVariables): QueryRef<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
  operationName: string;
}
export const getWorkoutCategoryRef: GetWorkoutCategoryRef;

export function getWorkoutCategory(vars: GetWorkoutCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
export function getWorkoutCategory(dc: DataConnect, vars: GetWorkoutCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;

interface ListMyWorkoutCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyWorkoutCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyWorkoutCategoriesData, undefined>;
  operationName: string;
}
export const listMyWorkoutCategoriesRef: ListMyWorkoutCategoriesRef;

export function listMyWorkoutCategories(options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutCategoriesData, undefined>;
export function listMyWorkoutCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutCategoriesData, undefined>;

interface GetRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRoutineVariables): QueryRef<GetRoutineData, GetRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRoutineVariables): QueryRef<GetRoutineData, GetRoutineVariables>;
  operationName: string;
}
export const getRoutineRef: GetRoutineRef;

export function getRoutine(vars: GetRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<GetRoutineData, GetRoutineVariables>;
export function getRoutine(dc: DataConnect, vars: GetRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<GetRoutineData, GetRoutineVariables>;

interface ListMyRoutinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyRoutinesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyRoutinesData, undefined>;
  operationName: string;
}
export const listMyRoutinesRef: ListMyRoutinesRef;

export function listMyRoutines(options?: ExecuteQueryOptions): QueryPromise<ListMyRoutinesData, undefined>;
export function listMyRoutines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyRoutinesData, undefined>;

interface GetIntervalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetIntervalVariables): QueryRef<GetIntervalData, GetIntervalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetIntervalVariables): QueryRef<GetIntervalData, GetIntervalVariables>;
  operationName: string;
}
export const getIntervalRef: GetIntervalRef;

export function getInterval(vars: GetIntervalVariables, options?: ExecuteQueryOptions): QueryPromise<GetIntervalData, GetIntervalVariables>;
export function getInterval(dc: DataConnect, vars: GetIntervalVariables, options?: ExecuteQueryOptions): QueryPromise<GetIntervalData, GetIntervalVariables>;

interface ListIntervalsForRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListIntervalsForRoutineVariables): QueryRef<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListIntervalsForRoutineVariables): QueryRef<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
  operationName: string;
}
export const listIntervalsForRoutineRef: ListIntervalsForRoutineRef;

export function listIntervalsForRoutine(vars: ListIntervalsForRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
export function listIntervalsForRoutine(dc: DataConnect, vars: ListIntervalsForRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;

interface GetWorkoutSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkoutSessionVariables): QueryRef<GetWorkoutSessionData, GetWorkoutSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkoutSessionVariables): QueryRef<GetWorkoutSessionData, GetWorkoutSessionVariables>;
  operationName: string;
}
export const getWorkoutSessionRef: GetWorkoutSessionRef;

export function getWorkoutSession(vars: GetWorkoutSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutSessionData, GetWorkoutSessionVariables>;
export function getWorkoutSession(dc: DataConnect, vars: GetWorkoutSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutSessionData, GetWorkoutSessionVariables>;

interface ListMyWorkoutSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyWorkoutSessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyWorkoutSessionsData, undefined>;
  operationName: string;
}
export const listMyWorkoutSessionsRef: ListMyWorkoutSessionsRef;

export function listMyWorkoutSessions(options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutSessionsData, undefined>;
export function listMyWorkoutSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutSessionsData, undefined>;

