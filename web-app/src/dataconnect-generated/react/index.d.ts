import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, CreateWorkoutCategoryData, CreateWorkoutCategoryVariables, UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables, DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables, CreateRoutineData, CreateRoutineVariables, UpdateRoutineData, UpdateRoutineVariables, DeleteRoutineData, DeleteRoutineVariables, CreateIntervalData, CreateIntervalVariables, UpdateIntervalData, UpdateIntervalVariables, DeleteIntervalData, DeleteIntervalVariables, CreateWorkoutSessionData, CreateWorkoutSessionVariables, UpdateWorkoutSessionData, UpdateWorkoutSessionVariables, DeleteWorkoutSessionData, DeleteWorkoutSessionVariables, GetUserData, ListUsersData, GetWorkoutCategoryData, GetWorkoutCategoryVariables, ListMyWorkoutCategoriesData, GetRoutineData, GetRoutineVariables, ListMyRoutinesData, GetIntervalData, GetIntervalVariables, ListIntervalsForRoutineData, ListIntervalsForRoutineVariables, GetWorkoutSessionData, GetWorkoutSessionVariables, ListMyWorkoutSessionsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useCreateWorkoutCategory(options?: useDataConnectMutationOptions<CreateWorkoutCategoryData, FirebaseError, CreateWorkoutCategoryVariables>): UseDataConnectMutationResult<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
export function useCreateWorkoutCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateWorkoutCategoryData, FirebaseError, CreateWorkoutCategoryVariables>): UseDataConnectMutationResult<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;

export function useUpdateWorkoutCategory(options?: useDataConnectMutationOptions<UpdateWorkoutCategoryData, FirebaseError, UpdateWorkoutCategoryVariables>): UseDataConnectMutationResult<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
export function useUpdateWorkoutCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateWorkoutCategoryData, FirebaseError, UpdateWorkoutCategoryVariables>): UseDataConnectMutationResult<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;

export function useDeleteWorkoutCategory(options?: useDataConnectMutationOptions<DeleteWorkoutCategoryData, FirebaseError, DeleteWorkoutCategoryVariables>): UseDataConnectMutationResult<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
export function useDeleteWorkoutCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteWorkoutCategoryData, FirebaseError, DeleteWorkoutCategoryVariables>): UseDataConnectMutationResult<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;

export function useCreateRoutine(options?: useDataConnectMutationOptions<CreateRoutineData, FirebaseError, CreateRoutineVariables>): UseDataConnectMutationResult<CreateRoutineData, CreateRoutineVariables>;
export function useCreateRoutine(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRoutineData, FirebaseError, CreateRoutineVariables>): UseDataConnectMutationResult<CreateRoutineData, CreateRoutineVariables>;

export function useUpdateRoutine(options?: useDataConnectMutationOptions<UpdateRoutineData, FirebaseError, UpdateRoutineVariables>): UseDataConnectMutationResult<UpdateRoutineData, UpdateRoutineVariables>;
export function useUpdateRoutine(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateRoutineData, FirebaseError, UpdateRoutineVariables>): UseDataConnectMutationResult<UpdateRoutineData, UpdateRoutineVariables>;

export function useDeleteRoutine(options?: useDataConnectMutationOptions<DeleteRoutineData, FirebaseError, DeleteRoutineVariables>): UseDataConnectMutationResult<DeleteRoutineData, DeleteRoutineVariables>;
export function useDeleteRoutine(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteRoutineData, FirebaseError, DeleteRoutineVariables>): UseDataConnectMutationResult<DeleteRoutineData, DeleteRoutineVariables>;

export function useCreateInterval(options?: useDataConnectMutationOptions<CreateIntervalData, FirebaseError, CreateIntervalVariables>): UseDataConnectMutationResult<CreateIntervalData, CreateIntervalVariables>;
export function useCreateInterval(dc: DataConnect, options?: useDataConnectMutationOptions<CreateIntervalData, FirebaseError, CreateIntervalVariables>): UseDataConnectMutationResult<CreateIntervalData, CreateIntervalVariables>;

export function useUpdateInterval(options?: useDataConnectMutationOptions<UpdateIntervalData, FirebaseError, UpdateIntervalVariables>): UseDataConnectMutationResult<UpdateIntervalData, UpdateIntervalVariables>;
export function useUpdateInterval(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateIntervalData, FirebaseError, UpdateIntervalVariables>): UseDataConnectMutationResult<UpdateIntervalData, UpdateIntervalVariables>;

export function useDeleteInterval(options?: useDataConnectMutationOptions<DeleteIntervalData, FirebaseError, DeleteIntervalVariables>): UseDataConnectMutationResult<DeleteIntervalData, DeleteIntervalVariables>;
export function useDeleteInterval(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteIntervalData, FirebaseError, DeleteIntervalVariables>): UseDataConnectMutationResult<DeleteIntervalData, DeleteIntervalVariables>;

export function useCreateWorkoutSession(options?: useDataConnectMutationOptions<CreateWorkoutSessionData, FirebaseError, CreateWorkoutSessionVariables>): UseDataConnectMutationResult<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
export function useCreateWorkoutSession(dc: DataConnect, options?: useDataConnectMutationOptions<CreateWorkoutSessionData, FirebaseError, CreateWorkoutSessionVariables>): UseDataConnectMutationResult<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;

export function useUpdateWorkoutSession(options?: useDataConnectMutationOptions<UpdateWorkoutSessionData, FirebaseError, UpdateWorkoutSessionVariables>): UseDataConnectMutationResult<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
export function useUpdateWorkoutSession(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateWorkoutSessionData, FirebaseError, UpdateWorkoutSessionVariables>): UseDataConnectMutationResult<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;

export function useDeleteWorkoutSession(options?: useDataConnectMutationOptions<DeleteWorkoutSessionData, FirebaseError, DeleteWorkoutSessionVariables>): UseDataConnectMutationResult<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
export function useDeleteWorkoutSession(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteWorkoutSessionData, FirebaseError, DeleteWorkoutSessionVariables>): UseDataConnectMutationResult<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useGetWorkoutCategory(vars: GetWorkoutCategoryVariables, options?: useDataConnectQueryOptions<GetWorkoutCategoryData>): UseDataConnectQueryResult<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
export function useGetWorkoutCategory(dc: DataConnect, vars: GetWorkoutCategoryVariables, options?: useDataConnectQueryOptions<GetWorkoutCategoryData>): UseDataConnectQueryResult<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;

export function useListMyWorkoutCategories(options?: useDataConnectQueryOptions<ListMyWorkoutCategoriesData>): UseDataConnectQueryResult<ListMyWorkoutCategoriesData, undefined>;
export function useListMyWorkoutCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyWorkoutCategoriesData>): UseDataConnectQueryResult<ListMyWorkoutCategoriesData, undefined>;

export function useGetRoutine(vars: GetRoutineVariables, options?: useDataConnectQueryOptions<GetRoutineData>): UseDataConnectQueryResult<GetRoutineData, GetRoutineVariables>;
export function useGetRoutine(dc: DataConnect, vars: GetRoutineVariables, options?: useDataConnectQueryOptions<GetRoutineData>): UseDataConnectQueryResult<GetRoutineData, GetRoutineVariables>;

export function useListMyRoutines(options?: useDataConnectQueryOptions<ListMyRoutinesData>): UseDataConnectQueryResult<ListMyRoutinesData, undefined>;
export function useListMyRoutines(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyRoutinesData>): UseDataConnectQueryResult<ListMyRoutinesData, undefined>;

export function useGetInterval(vars: GetIntervalVariables, options?: useDataConnectQueryOptions<GetIntervalData>): UseDataConnectQueryResult<GetIntervalData, GetIntervalVariables>;
export function useGetInterval(dc: DataConnect, vars: GetIntervalVariables, options?: useDataConnectQueryOptions<GetIntervalData>): UseDataConnectQueryResult<GetIntervalData, GetIntervalVariables>;

export function useListIntervalsForRoutine(vars: ListIntervalsForRoutineVariables, options?: useDataConnectQueryOptions<ListIntervalsForRoutineData>): UseDataConnectQueryResult<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
export function useListIntervalsForRoutine(dc: DataConnect, vars: ListIntervalsForRoutineVariables, options?: useDataConnectQueryOptions<ListIntervalsForRoutineData>): UseDataConnectQueryResult<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;

export function useGetWorkoutSession(vars: GetWorkoutSessionVariables, options?: useDataConnectQueryOptions<GetWorkoutSessionData>): UseDataConnectQueryResult<GetWorkoutSessionData, GetWorkoutSessionVariables>;
export function useGetWorkoutSession(dc: DataConnect, vars: GetWorkoutSessionVariables, options?: useDataConnectQueryOptions<GetWorkoutSessionData>): UseDataConnectQueryResult<GetWorkoutSessionData, GetWorkoutSessionVariables>;

export function useListMyWorkoutSessions(options?: useDataConnectQueryOptions<ListMyWorkoutSessionsData>): UseDataConnectQueryResult<ListMyWorkoutSessionsData, undefined>;
export function useListMyWorkoutSessions(dc: DataConnect, options?: useDataConnectQueryOptions<ListMyWorkoutSessionsData>): UseDataConnectQueryResult<ListMyWorkoutSessionsData, undefined>;
