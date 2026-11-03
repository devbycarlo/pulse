# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetWorkoutCategory*](#getworkoutcategory)
  - [*ListMyWorkoutCategories*](#listmyworkoutcategories)
  - [*GetRoutine*](#getroutine)
  - [*ListMyRoutines*](#listmyroutines)
  - [*GetInterval*](#getinterval)
  - [*ListIntervalsForRoutine*](#listintervalsforroutine)
  - [*GetWorkoutSession*](#getworkoutsession)
  - [*ListMyWorkoutSessions*](#listmyworkoutsessions)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateWorkoutCategory*](#createworkoutcategory)
  - [*UpdateWorkoutCategory*](#updateworkoutcategory)
  - [*DeleteWorkoutCategory*](#deleteworkoutcategory)
  - [*CreateRoutine*](#createroutine)
  - [*UpdateRoutine*](#updateroutine)
  - [*DeleteRoutine*](#deleteroutine)
  - [*CreateInterval*](#createinterval)
  - [*UpdateInterval*](#updateinterval)
  - [*DeleteInterval*](#deleteinterval)
  - [*CreateWorkoutSession*](#createworkoutsession)
  - [*UpdateWorkoutSession*](#updateworkoutsession)
  - [*DeleteWorkoutSession*](#deleteworkoutsession)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
    profilePhotoUrl?: string | null;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    username: string;
    profilePhotoUrl?: string | null;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetWorkoutCategory
You can execute the `GetWorkoutCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getWorkoutCategory(vars: GetWorkoutCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;

interface GetWorkoutCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkoutCategoryVariables): QueryRef<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
}
export const getWorkoutCategoryRef: GetWorkoutCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkoutCategory(dc: DataConnect, vars: GetWorkoutCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;

interface GetWorkoutCategoryRef {
  ...
  (dc: DataConnect, vars: GetWorkoutCategoryVariables): QueryRef<GetWorkoutCategoryData, GetWorkoutCategoryVariables>;
}
export const getWorkoutCategoryRef: GetWorkoutCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkoutCategoryRef:
```typescript
const name = getWorkoutCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetWorkoutCategory` query requires an argument of type `GetWorkoutCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkoutCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkoutCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkoutCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetWorkoutCategoryData {
  workoutCategory?: {
    name: string;
  };
}
```
### Using `GetWorkoutCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkoutCategory, GetWorkoutCategoryVariables } from '@dataconnect/generated';

// The `GetWorkoutCategory` query requires an argument of type `GetWorkoutCategoryVariables`:
const getWorkoutCategoryVars: GetWorkoutCategoryVariables = {
  id: ..., 
};

// Call the `getWorkoutCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkoutCategory(getWorkoutCategoryVars);
// Variables can be defined inline as well.
const { data } = await getWorkoutCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkoutCategory(dataConnect, getWorkoutCategoryVars);

console.log(data.workoutCategory);

// Or, you can use the `Promise` API.
getWorkoutCategory(getWorkoutCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory);
});
```

### Using `GetWorkoutCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkoutCategoryRef, GetWorkoutCategoryVariables } from '@dataconnect/generated';

// The `GetWorkoutCategory` query requires an argument of type `GetWorkoutCategoryVariables`:
const getWorkoutCategoryVars: GetWorkoutCategoryVariables = {
  id: ..., 
};

// Call the `getWorkoutCategoryRef()` function to get a reference to the query.
const ref = getWorkoutCategoryRef(getWorkoutCategoryVars);
// Variables can be defined inline as well.
const ref = getWorkoutCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkoutCategoryRef(dataConnect, getWorkoutCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workoutCategory);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory);
});
```

## ListMyWorkoutCategories
You can execute the `ListMyWorkoutCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyWorkoutCategories(options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutCategoriesData, undefined>;

interface ListMyWorkoutCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyWorkoutCategoriesData, undefined>;
}
export const listMyWorkoutCategoriesRef: ListMyWorkoutCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyWorkoutCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutCategoriesData, undefined>;

interface ListMyWorkoutCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyWorkoutCategoriesData, undefined>;
}
export const listMyWorkoutCategoriesRef: ListMyWorkoutCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyWorkoutCategoriesRef:
```typescript
const name = listMyWorkoutCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListMyWorkoutCategories` query has no variables.
### Return Type
Recall that executing the `ListMyWorkoutCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyWorkoutCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyWorkoutCategoriesData {
  workoutCategories: ({
    id: UUIDString;
    name: string;
  } & WorkoutCategory_Key)[];
}
```
### Using `ListMyWorkoutCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyWorkoutCategories } from '@dataconnect/generated';


// Call the `listMyWorkoutCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyWorkoutCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyWorkoutCategories(dataConnect);

console.log(data.workoutCategories);

// Or, you can use the `Promise` API.
listMyWorkoutCategories().then((response) => {
  const data = response.data;
  console.log(data.workoutCategories);
});
```

### Using `ListMyWorkoutCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyWorkoutCategoriesRef } from '@dataconnect/generated';


// Call the `listMyWorkoutCategoriesRef()` function to get a reference to the query.
const ref = listMyWorkoutCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyWorkoutCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workoutCategories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutCategories);
});
```

## GetRoutine
You can execute the `GetRoutine` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getRoutine(vars: GetRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<GetRoutineData, GetRoutineVariables>;

interface GetRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRoutineVariables): QueryRef<GetRoutineData, GetRoutineVariables>;
}
export const getRoutineRef: GetRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRoutine(dc: DataConnect, vars: GetRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<GetRoutineData, GetRoutineVariables>;

interface GetRoutineRef {
  ...
  (dc: DataConnect, vars: GetRoutineVariables): QueryRef<GetRoutineData, GetRoutineVariables>;
}
export const getRoutineRef: GetRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRoutineRef:
```typescript
const name = getRoutineRef.operationName;
console.log(name);
```

### Variables
The `GetRoutine` query requires an argument of type `GetRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRoutineVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetRoutine` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRoutineData {
  routine?: {
    name: string;
    workDurationSeconds: number;
    rounds: number;
    description?: string | null;
  };
}
```
### Using `GetRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRoutine, GetRoutineVariables } from '@dataconnect/generated';

// The `GetRoutine` query requires an argument of type `GetRoutineVariables`:
const getRoutineVars: GetRoutineVariables = {
  id: ..., 
};

// Call the `getRoutine()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRoutine(getRoutineVars);
// Variables can be defined inline as well.
const { data } = await getRoutine({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRoutine(dataConnect, getRoutineVars);

console.log(data.routine);

// Or, you can use the `Promise` API.
getRoutine(getRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.routine);
});
```

### Using `GetRoutine`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRoutineRef, GetRoutineVariables } from '@dataconnect/generated';

// The `GetRoutine` query requires an argument of type `GetRoutineVariables`:
const getRoutineVars: GetRoutineVariables = {
  id: ..., 
};

// Call the `getRoutineRef()` function to get a reference to the query.
const ref = getRoutineRef(getRoutineVars);
// Variables can be defined inline as well.
const ref = getRoutineRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRoutineRef(dataConnect, getRoutineVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.routine);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.routine);
});
```

## ListMyRoutines
You can execute the `ListMyRoutines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyRoutines(options?: ExecuteQueryOptions): QueryPromise<ListMyRoutinesData, undefined>;

interface ListMyRoutinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyRoutinesData, undefined>;
}
export const listMyRoutinesRef: ListMyRoutinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyRoutines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyRoutinesData, undefined>;

interface ListMyRoutinesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyRoutinesData, undefined>;
}
export const listMyRoutinesRef: ListMyRoutinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyRoutinesRef:
```typescript
const name = listMyRoutinesRef.operationName;
console.log(name);
```

### Variables
The `ListMyRoutines` query has no variables.
### Return Type
Recall that executing the `ListMyRoutines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyRoutinesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyRoutinesData {
  routines: ({
    id: UUIDString;
    name: string;
  } & Routine_Key)[];
}
```
### Using `ListMyRoutines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyRoutines } from '@dataconnect/generated';


// Call the `listMyRoutines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyRoutines();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyRoutines(dataConnect);

console.log(data.routines);

// Or, you can use the `Promise` API.
listMyRoutines().then((response) => {
  const data = response.data;
  console.log(data.routines);
});
```

### Using `ListMyRoutines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyRoutinesRef } from '@dataconnect/generated';


// Call the `listMyRoutinesRef()` function to get a reference to the query.
const ref = listMyRoutinesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyRoutinesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.routines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.routines);
});
```

## GetInterval
You can execute the `GetInterval` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInterval(vars: GetIntervalVariables, options?: ExecuteQueryOptions): QueryPromise<GetIntervalData, GetIntervalVariables>;

interface GetIntervalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetIntervalVariables): QueryRef<GetIntervalData, GetIntervalVariables>;
}
export const getIntervalRef: GetIntervalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInterval(dc: DataConnect, vars: GetIntervalVariables, options?: ExecuteQueryOptions): QueryPromise<GetIntervalData, GetIntervalVariables>;

interface GetIntervalRef {
  ...
  (dc: DataConnect, vars: GetIntervalVariables): QueryRef<GetIntervalData, GetIntervalVariables>;
}
export const getIntervalRef: GetIntervalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getIntervalRef:
```typescript
const name = getIntervalRef.operationName;
console.log(name);
```

### Variables
The `GetInterval` query requires an argument of type `GetIntervalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetIntervalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetInterval` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetIntervalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetIntervalData {
  interval?: {
    name: string;
    durationSeconds: number;
    sequenceOrder: number;
  };
}
```
### Using `GetInterval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInterval, GetIntervalVariables } from '@dataconnect/generated';

// The `GetInterval` query requires an argument of type `GetIntervalVariables`:
const getIntervalVars: GetIntervalVariables = {
  id: ..., 
};

// Call the `getInterval()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInterval(getIntervalVars);
// Variables can be defined inline as well.
const { data } = await getInterval({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInterval(dataConnect, getIntervalVars);

console.log(data.interval);

// Or, you can use the `Promise` API.
getInterval(getIntervalVars).then((response) => {
  const data = response.data;
  console.log(data.interval);
});
```

### Using `GetInterval`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getIntervalRef, GetIntervalVariables } from '@dataconnect/generated';

// The `GetInterval` query requires an argument of type `GetIntervalVariables`:
const getIntervalVars: GetIntervalVariables = {
  id: ..., 
};

// Call the `getIntervalRef()` function to get a reference to the query.
const ref = getIntervalRef(getIntervalVars);
// Variables can be defined inline as well.
const ref = getIntervalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getIntervalRef(dataConnect, getIntervalVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.interval);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.interval);
});
```

## ListIntervalsForRoutine
You can execute the `ListIntervalsForRoutine` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listIntervalsForRoutine(vars: ListIntervalsForRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;

interface ListIntervalsForRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListIntervalsForRoutineVariables): QueryRef<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
}
export const listIntervalsForRoutineRef: ListIntervalsForRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listIntervalsForRoutine(dc: DataConnect, vars: ListIntervalsForRoutineVariables, options?: ExecuteQueryOptions): QueryPromise<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;

interface ListIntervalsForRoutineRef {
  ...
  (dc: DataConnect, vars: ListIntervalsForRoutineVariables): QueryRef<ListIntervalsForRoutineData, ListIntervalsForRoutineVariables>;
}
export const listIntervalsForRoutineRef: ListIntervalsForRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listIntervalsForRoutineRef:
```typescript
const name = listIntervalsForRoutineRef.operationName;
console.log(name);
```

### Variables
The `ListIntervalsForRoutine` query requires an argument of type `ListIntervalsForRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListIntervalsForRoutineVariables {
  routineId: UUIDString;
}
```
### Return Type
Recall that executing the `ListIntervalsForRoutine` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListIntervalsForRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListIntervalsForRoutineData {
  intervals: ({
    name: string;
    sequenceOrder: number;
  })[];
}
```
### Using `ListIntervalsForRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listIntervalsForRoutine, ListIntervalsForRoutineVariables } from '@dataconnect/generated';

// The `ListIntervalsForRoutine` query requires an argument of type `ListIntervalsForRoutineVariables`:
const listIntervalsForRoutineVars: ListIntervalsForRoutineVariables = {
  routineId: ..., 
};

// Call the `listIntervalsForRoutine()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listIntervalsForRoutine(listIntervalsForRoutineVars);
// Variables can be defined inline as well.
const { data } = await listIntervalsForRoutine({ routineId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listIntervalsForRoutine(dataConnect, listIntervalsForRoutineVars);

console.log(data.intervals);

// Or, you can use the `Promise` API.
listIntervalsForRoutine(listIntervalsForRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.intervals);
});
```

### Using `ListIntervalsForRoutine`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listIntervalsForRoutineRef, ListIntervalsForRoutineVariables } from '@dataconnect/generated';

// The `ListIntervalsForRoutine` query requires an argument of type `ListIntervalsForRoutineVariables`:
const listIntervalsForRoutineVars: ListIntervalsForRoutineVariables = {
  routineId: ..., 
};

// Call the `listIntervalsForRoutineRef()` function to get a reference to the query.
const ref = listIntervalsForRoutineRef(listIntervalsForRoutineVars);
// Variables can be defined inline as well.
const ref = listIntervalsForRoutineRef({ routineId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listIntervalsForRoutineRef(dataConnect, listIntervalsForRoutineVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.intervals);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.intervals);
});
```

## GetWorkoutSession
You can execute the `GetWorkoutSession` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getWorkoutSession(vars: GetWorkoutSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutSessionData, GetWorkoutSessionVariables>;

interface GetWorkoutSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkoutSessionVariables): QueryRef<GetWorkoutSessionData, GetWorkoutSessionVariables>;
}
export const getWorkoutSessionRef: GetWorkoutSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkoutSession(dc: DataConnect, vars: GetWorkoutSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkoutSessionData, GetWorkoutSessionVariables>;

interface GetWorkoutSessionRef {
  ...
  (dc: DataConnect, vars: GetWorkoutSessionVariables): QueryRef<GetWorkoutSessionData, GetWorkoutSessionVariables>;
}
export const getWorkoutSessionRef: GetWorkoutSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkoutSessionRef:
```typescript
const name = getWorkoutSessionRef.operationName;
console.log(name);
```

### Variables
The `GetWorkoutSession` query requires an argument of type `GetWorkoutSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkoutSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkoutSession` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkoutSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetWorkoutSessionData {
  workoutSession?: {
    completedAt: TimestampString;
    totalDurationSeconds: number;
  };
}
```
### Using `GetWorkoutSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkoutSession, GetWorkoutSessionVariables } from '@dataconnect/generated';

// The `GetWorkoutSession` query requires an argument of type `GetWorkoutSessionVariables`:
const getWorkoutSessionVars: GetWorkoutSessionVariables = {
  id: ..., 
};

// Call the `getWorkoutSession()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkoutSession(getWorkoutSessionVars);
// Variables can be defined inline as well.
const { data } = await getWorkoutSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkoutSession(dataConnect, getWorkoutSessionVars);

console.log(data.workoutSession);

// Or, you can use the `Promise` API.
getWorkoutSession(getWorkoutSessionVars).then((response) => {
  const data = response.data;
  console.log(data.workoutSession);
});
```

### Using `GetWorkoutSession`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkoutSessionRef, GetWorkoutSessionVariables } from '@dataconnect/generated';

// The `GetWorkoutSession` query requires an argument of type `GetWorkoutSessionVariables`:
const getWorkoutSessionVars: GetWorkoutSessionVariables = {
  id: ..., 
};

// Call the `getWorkoutSessionRef()` function to get a reference to the query.
const ref = getWorkoutSessionRef(getWorkoutSessionVars);
// Variables can be defined inline as well.
const ref = getWorkoutSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkoutSessionRef(dataConnect, getWorkoutSessionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workoutSession);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutSession);
});
```

## ListMyWorkoutSessions
You can execute the `ListMyWorkoutSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyWorkoutSessions(options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutSessionsData, undefined>;

interface ListMyWorkoutSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyWorkoutSessionsData, undefined>;
}
export const listMyWorkoutSessionsRef: ListMyWorkoutSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyWorkoutSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyWorkoutSessionsData, undefined>;

interface ListMyWorkoutSessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyWorkoutSessionsData, undefined>;
}
export const listMyWorkoutSessionsRef: ListMyWorkoutSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyWorkoutSessionsRef:
```typescript
const name = listMyWorkoutSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListMyWorkoutSessions` query has no variables.
### Return Type
Recall that executing the `ListMyWorkoutSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyWorkoutSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyWorkoutSessionsData {
  workoutSessions: ({
    id: UUIDString;
    completedAt: TimestampString;
    totalDurationSeconds: number;
  } & WorkoutSession_Key)[];
}
```
### Using `ListMyWorkoutSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyWorkoutSessions } from '@dataconnect/generated';


// Call the `listMyWorkoutSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyWorkoutSessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyWorkoutSessions(dataConnect);

console.log(data.workoutSessions);

// Or, you can use the `Promise` API.
listMyWorkoutSessions().then((response) => {
  const data = response.data;
  console.log(data.workoutSessions);
});
```

### Using `ListMyWorkoutSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyWorkoutSessionsRef } from '@dataconnect/generated';


// Call the `listMyWorkoutSessionsRef()` function to get a reference to the query.
const ref = listMyWorkoutSessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyWorkoutSessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workoutSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutSessions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  username: string;
  email: string;
  profilePhotoUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  profilePhotoUrl: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ username: ..., email: ..., profilePhotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  profilePhotoUrl: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ username: ..., email: ..., profilePhotoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  username?: string | null;
  email?: string | null;
  profilePhotoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  username: ..., // optional
  email: ..., // optional
  profilePhotoUrl: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ username: ..., email: ..., profilePhotoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  username: ..., // optional
  email: ..., // optional
  profilePhotoUrl: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ username: ..., email: ..., profilePhotoUrl: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateWorkoutCategory
You can execute the `CreateWorkoutCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createWorkoutCategory(vars: CreateWorkoutCategoryVariables): MutationPromise<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;

interface CreateWorkoutCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutCategoryVariables): MutationRef<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
}
export const createWorkoutCategoryRef: CreateWorkoutCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWorkoutCategory(dc: DataConnect, vars: CreateWorkoutCategoryVariables): MutationPromise<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;

interface CreateWorkoutCategoryRef {
  ...
  (dc: DataConnect, vars: CreateWorkoutCategoryVariables): MutationRef<CreateWorkoutCategoryData, CreateWorkoutCategoryVariables>;
}
export const createWorkoutCategoryRef: CreateWorkoutCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWorkoutCategoryRef:
```typescript
const name = createWorkoutCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateWorkoutCategory` mutation requires an argument of type `CreateWorkoutCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWorkoutCategoryVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateWorkoutCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWorkoutCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWorkoutCategoryData {
  workoutCategory_insert: WorkoutCategory_Key;
}
```
### Using `CreateWorkoutCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWorkoutCategory, CreateWorkoutCategoryVariables } from '@dataconnect/generated';

// The `CreateWorkoutCategory` mutation requires an argument of type `CreateWorkoutCategoryVariables`:
const createWorkoutCategoryVars: CreateWorkoutCategoryVariables = {
  name: ..., 
};

// Call the `createWorkoutCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWorkoutCategory(createWorkoutCategoryVars);
// Variables can be defined inline as well.
const { data } = await createWorkoutCategory({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWorkoutCategory(dataConnect, createWorkoutCategoryVars);

console.log(data.workoutCategory_insert);

// Or, you can use the `Promise` API.
createWorkoutCategory(createWorkoutCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_insert);
});
```

### Using `CreateWorkoutCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWorkoutCategoryRef, CreateWorkoutCategoryVariables } from '@dataconnect/generated';

// The `CreateWorkoutCategory` mutation requires an argument of type `CreateWorkoutCategoryVariables`:
const createWorkoutCategoryVars: CreateWorkoutCategoryVariables = {
  name: ..., 
};

// Call the `createWorkoutCategoryRef()` function to get a reference to the mutation.
const ref = createWorkoutCategoryRef(createWorkoutCategoryVars);
// Variables can be defined inline as well.
const ref = createWorkoutCategoryRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWorkoutCategoryRef(dataConnect, createWorkoutCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutCategory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_insert);
});
```

## UpdateWorkoutCategory
You can execute the `UpdateWorkoutCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateWorkoutCategory(vars: UpdateWorkoutCategoryVariables): MutationPromise<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;

interface UpdateWorkoutCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutCategoryVariables): MutationRef<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
}
export const updateWorkoutCategoryRef: UpdateWorkoutCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkoutCategory(dc: DataConnect, vars: UpdateWorkoutCategoryVariables): MutationPromise<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;

interface UpdateWorkoutCategoryRef {
  ...
  (dc: DataConnect, vars: UpdateWorkoutCategoryVariables): MutationRef<UpdateWorkoutCategoryData, UpdateWorkoutCategoryVariables>;
}
export const updateWorkoutCategoryRef: UpdateWorkoutCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkoutCategoryRef:
```typescript
const name = updateWorkoutCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkoutCategory` mutation requires an argument of type `UpdateWorkoutCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkoutCategoryVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateWorkoutCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkoutCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkoutCategoryData {
  workoutCategory_update?: WorkoutCategory_Key | null;
}
```
### Using `UpdateWorkoutCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutCategory, UpdateWorkoutCategoryVariables } from '@dataconnect/generated';

// The `UpdateWorkoutCategory` mutation requires an argument of type `UpdateWorkoutCategoryVariables`:
const updateWorkoutCategoryVars: UpdateWorkoutCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateWorkoutCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkoutCategory(updateWorkoutCategoryVars);
// Variables can be defined inline as well.
const { data } = await updateWorkoutCategory({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkoutCategory(dataConnect, updateWorkoutCategoryVars);

console.log(data.workoutCategory_update);

// Or, you can use the `Promise` API.
updateWorkoutCategory(updateWorkoutCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_update);
});
```

### Using `UpdateWorkoutCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutCategoryRef, UpdateWorkoutCategoryVariables } from '@dataconnect/generated';

// The `UpdateWorkoutCategory` mutation requires an argument of type `UpdateWorkoutCategoryVariables`:
const updateWorkoutCategoryVars: UpdateWorkoutCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateWorkoutCategoryRef()` function to get a reference to the mutation.
const ref = updateWorkoutCategoryRef(updateWorkoutCategoryVars);
// Variables can be defined inline as well.
const ref = updateWorkoutCategoryRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkoutCategoryRef(dataConnect, updateWorkoutCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutCategory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_update);
});
```

## DeleteWorkoutCategory
You can execute the `DeleteWorkoutCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWorkoutCategory(vars: DeleteWorkoutCategoryVariables): MutationPromise<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;

interface DeleteWorkoutCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutCategoryVariables): MutationRef<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
}
export const deleteWorkoutCategoryRef: DeleteWorkoutCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWorkoutCategory(dc: DataConnect, vars: DeleteWorkoutCategoryVariables): MutationPromise<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;

interface DeleteWorkoutCategoryRef {
  ...
  (dc: DataConnect, vars: DeleteWorkoutCategoryVariables): MutationRef<DeleteWorkoutCategoryData, DeleteWorkoutCategoryVariables>;
}
export const deleteWorkoutCategoryRef: DeleteWorkoutCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWorkoutCategoryRef:
```typescript
const name = deleteWorkoutCategoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteWorkoutCategory` mutation requires an argument of type `DeleteWorkoutCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWorkoutCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWorkoutCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWorkoutCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWorkoutCategoryData {
  workoutCategory_delete?: WorkoutCategory_Key | null;
}
```
### Using `DeleteWorkoutCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutCategory, DeleteWorkoutCategoryVariables } from '@dataconnect/generated';

// The `DeleteWorkoutCategory` mutation requires an argument of type `DeleteWorkoutCategoryVariables`:
const deleteWorkoutCategoryVars: DeleteWorkoutCategoryVariables = {
  id: ..., 
};

// Call the `deleteWorkoutCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWorkoutCategory(deleteWorkoutCategoryVars);
// Variables can be defined inline as well.
const { data } = await deleteWorkoutCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWorkoutCategory(dataConnect, deleteWorkoutCategoryVars);

console.log(data.workoutCategory_delete);

// Or, you can use the `Promise` API.
deleteWorkoutCategory(deleteWorkoutCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_delete);
});
```

### Using `DeleteWorkoutCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutCategoryRef, DeleteWorkoutCategoryVariables } from '@dataconnect/generated';

// The `DeleteWorkoutCategory` mutation requires an argument of type `DeleteWorkoutCategoryVariables`:
const deleteWorkoutCategoryVars: DeleteWorkoutCategoryVariables = {
  id: ..., 
};

// Call the `deleteWorkoutCategoryRef()` function to get a reference to the mutation.
const ref = deleteWorkoutCategoryRef(deleteWorkoutCategoryVars);
// Variables can be defined inline as well.
const ref = deleteWorkoutCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWorkoutCategoryRef(dataConnect, deleteWorkoutCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutCategory_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutCategory_delete);
});
```

## CreateRoutine
You can execute the `CreateRoutine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRoutine(vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface CreateRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
}
export const createRoutineRef: CreateRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRoutine(dc: DataConnect, vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface CreateRoutineRef {
  ...
  (dc: DataConnect, vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
}
export const createRoutineRef: CreateRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRoutineRef:
```typescript
const name = createRoutineRef.operationName;
console.log(name);
```

### Variables
The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRoutineVariables {
  name: string;
  workDurationSeconds: number;
  restDurationSeconds: number;
  rounds: number;
  description?: string | null;
  workoutCategoryId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CreateRoutine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRoutineData {
  routine_insert: Routine_Key;
}
```
### Using `CreateRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRoutine, CreateRoutineVariables } from '@dataconnect/generated';

// The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`:
const createRoutineVars: CreateRoutineVariables = {
  name: ..., 
  workDurationSeconds: ..., 
  restDurationSeconds: ..., 
  rounds: ..., 
  description: ..., // optional
  workoutCategoryId: ..., // optional
};

// Call the `createRoutine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRoutine(createRoutineVars);
// Variables can be defined inline as well.
const { data } = await createRoutine({ name: ..., workDurationSeconds: ..., restDurationSeconds: ..., rounds: ..., description: ..., workoutCategoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRoutine(dataConnect, createRoutineVars);

console.log(data.routine_insert);

// Or, you can use the `Promise` API.
createRoutine(createRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.routine_insert);
});
```

### Using `CreateRoutine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRoutineRef, CreateRoutineVariables } from '@dataconnect/generated';

// The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`:
const createRoutineVars: CreateRoutineVariables = {
  name: ..., 
  workDurationSeconds: ..., 
  restDurationSeconds: ..., 
  rounds: ..., 
  description: ..., // optional
  workoutCategoryId: ..., // optional
};

// Call the `createRoutineRef()` function to get a reference to the mutation.
const ref = createRoutineRef(createRoutineVars);
// Variables can be defined inline as well.
const ref = createRoutineRef({ name: ..., workDurationSeconds: ..., restDurationSeconds: ..., rounds: ..., description: ..., workoutCategoryId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRoutineRef(dataConnect, createRoutineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.routine_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.routine_insert);
});
```

## UpdateRoutine
You can execute the `UpdateRoutine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRoutine(vars: UpdateRoutineVariables): MutationPromise<UpdateRoutineData, UpdateRoutineVariables>;

interface UpdateRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRoutineVariables): MutationRef<UpdateRoutineData, UpdateRoutineVariables>;
}
export const updateRoutineRef: UpdateRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRoutine(dc: DataConnect, vars: UpdateRoutineVariables): MutationPromise<UpdateRoutineData, UpdateRoutineVariables>;

interface UpdateRoutineRef {
  ...
  (dc: DataConnect, vars: UpdateRoutineVariables): MutationRef<UpdateRoutineData, UpdateRoutineVariables>;
}
export const updateRoutineRef: UpdateRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRoutineRef:
```typescript
const name = updateRoutineRef.operationName;
console.log(name);
```

### Variables
The `UpdateRoutine` mutation requires an argument of type `UpdateRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRoutineVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateRoutine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRoutineData {
  routine_update?: Routine_Key | null;
}
```
### Using `UpdateRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRoutine, UpdateRoutineVariables } from '@dataconnect/generated';

// The `UpdateRoutine` mutation requires an argument of type `UpdateRoutineVariables`:
const updateRoutineVars: UpdateRoutineVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateRoutine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRoutine(updateRoutineVars);
// Variables can be defined inline as well.
const { data } = await updateRoutine({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRoutine(dataConnect, updateRoutineVars);

console.log(data.routine_update);

// Or, you can use the `Promise` API.
updateRoutine(updateRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.routine_update);
});
```

### Using `UpdateRoutine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRoutineRef, UpdateRoutineVariables } from '@dataconnect/generated';

// The `UpdateRoutine` mutation requires an argument of type `UpdateRoutineVariables`:
const updateRoutineVars: UpdateRoutineVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateRoutineRef()` function to get a reference to the mutation.
const ref = updateRoutineRef(updateRoutineVars);
// Variables can be defined inline as well.
const ref = updateRoutineRef({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRoutineRef(dataConnect, updateRoutineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.routine_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.routine_update);
});
```

## DeleteRoutine
You can execute the `DeleteRoutine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteRoutine(vars: DeleteRoutineVariables): MutationPromise<DeleteRoutineData, DeleteRoutineVariables>;

interface DeleteRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteRoutineVariables): MutationRef<DeleteRoutineData, DeleteRoutineVariables>;
}
export const deleteRoutineRef: DeleteRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteRoutine(dc: DataConnect, vars: DeleteRoutineVariables): MutationPromise<DeleteRoutineData, DeleteRoutineVariables>;

interface DeleteRoutineRef {
  ...
  (dc: DataConnect, vars: DeleteRoutineVariables): MutationRef<DeleteRoutineData, DeleteRoutineVariables>;
}
export const deleteRoutineRef: DeleteRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteRoutineRef:
```typescript
const name = deleteRoutineRef.operationName;
console.log(name);
```

### Variables
The `DeleteRoutine` mutation requires an argument of type `DeleteRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteRoutineVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteRoutine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteRoutineData {
  routine_delete?: Routine_Key | null;
}
```
### Using `DeleteRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteRoutine, DeleteRoutineVariables } from '@dataconnect/generated';

// The `DeleteRoutine` mutation requires an argument of type `DeleteRoutineVariables`:
const deleteRoutineVars: DeleteRoutineVariables = {
  id: ..., 
};

// Call the `deleteRoutine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteRoutine(deleteRoutineVars);
// Variables can be defined inline as well.
const { data } = await deleteRoutine({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteRoutine(dataConnect, deleteRoutineVars);

console.log(data.routine_delete);

// Or, you can use the `Promise` API.
deleteRoutine(deleteRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.routine_delete);
});
```

### Using `DeleteRoutine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteRoutineRef, DeleteRoutineVariables } from '@dataconnect/generated';

// The `DeleteRoutine` mutation requires an argument of type `DeleteRoutineVariables`:
const deleteRoutineVars: DeleteRoutineVariables = {
  id: ..., 
};

// Call the `deleteRoutineRef()` function to get a reference to the mutation.
const ref = deleteRoutineRef(deleteRoutineVars);
// Variables can be defined inline as well.
const ref = deleteRoutineRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteRoutineRef(dataConnect, deleteRoutineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.routine_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.routine_delete);
});
```

## CreateInterval
You can execute the `CreateInterval` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInterval(vars: CreateIntervalVariables): MutationPromise<CreateIntervalData, CreateIntervalVariables>;

interface CreateIntervalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateIntervalVariables): MutationRef<CreateIntervalData, CreateIntervalVariables>;
}
export const createIntervalRef: CreateIntervalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInterval(dc: DataConnect, vars: CreateIntervalVariables): MutationPromise<CreateIntervalData, CreateIntervalVariables>;

interface CreateIntervalRef {
  ...
  (dc: DataConnect, vars: CreateIntervalVariables): MutationRef<CreateIntervalData, CreateIntervalVariables>;
}
export const createIntervalRef: CreateIntervalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createIntervalRef:
```typescript
const name = createIntervalRef.operationName;
console.log(name);
```

### Variables
The `CreateInterval` mutation requires an argument of type `CreateIntervalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateIntervalVariables {
  name: string;
  durationSeconds: number;
  sequenceOrder: number;
  routineId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateInterval` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateIntervalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateIntervalData {
  interval_insert: Interval_Key;
}
```
### Using `CreateInterval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInterval, CreateIntervalVariables } from '@dataconnect/generated';

// The `CreateInterval` mutation requires an argument of type `CreateIntervalVariables`:
const createIntervalVars: CreateIntervalVariables = {
  name: ..., 
  durationSeconds: ..., 
  sequenceOrder: ..., 
  routineId: ..., 
};

// Call the `createInterval()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInterval(createIntervalVars);
// Variables can be defined inline as well.
const { data } = await createInterval({ name: ..., durationSeconds: ..., sequenceOrder: ..., routineId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInterval(dataConnect, createIntervalVars);

console.log(data.interval_insert);

// Or, you can use the `Promise` API.
createInterval(createIntervalVars).then((response) => {
  const data = response.data;
  console.log(data.interval_insert);
});
```

### Using `CreateInterval`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createIntervalRef, CreateIntervalVariables } from '@dataconnect/generated';

// The `CreateInterval` mutation requires an argument of type `CreateIntervalVariables`:
const createIntervalVars: CreateIntervalVariables = {
  name: ..., 
  durationSeconds: ..., 
  sequenceOrder: ..., 
  routineId: ..., 
};

// Call the `createIntervalRef()` function to get a reference to the mutation.
const ref = createIntervalRef(createIntervalVars);
// Variables can be defined inline as well.
const ref = createIntervalRef({ name: ..., durationSeconds: ..., sequenceOrder: ..., routineId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createIntervalRef(dataConnect, createIntervalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.interval_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.interval_insert);
});
```

## UpdateInterval
You can execute the `UpdateInterval` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateInterval(vars: UpdateIntervalVariables): MutationPromise<UpdateIntervalData, UpdateIntervalVariables>;

interface UpdateIntervalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateIntervalVariables): MutationRef<UpdateIntervalData, UpdateIntervalVariables>;
}
export const updateIntervalRef: UpdateIntervalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInterval(dc: DataConnect, vars: UpdateIntervalVariables): MutationPromise<UpdateIntervalData, UpdateIntervalVariables>;

interface UpdateIntervalRef {
  ...
  (dc: DataConnect, vars: UpdateIntervalVariables): MutationRef<UpdateIntervalData, UpdateIntervalVariables>;
}
export const updateIntervalRef: UpdateIntervalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateIntervalRef:
```typescript
const name = updateIntervalRef.operationName;
console.log(name);
```

### Variables
The `UpdateInterval` mutation requires an argument of type `UpdateIntervalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateIntervalVariables {
  id: UUIDString;
  durationSeconds?: number | null;
}
```
### Return Type
Recall that executing the `UpdateInterval` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateIntervalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateIntervalData {
  interval_update?: Interval_Key | null;
}
```
### Using `UpdateInterval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInterval, UpdateIntervalVariables } from '@dataconnect/generated';

// The `UpdateInterval` mutation requires an argument of type `UpdateIntervalVariables`:
const updateIntervalVars: UpdateIntervalVariables = {
  id: ..., 
  durationSeconds: ..., // optional
};

// Call the `updateInterval()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInterval(updateIntervalVars);
// Variables can be defined inline as well.
const { data } = await updateInterval({ id: ..., durationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInterval(dataConnect, updateIntervalVars);

console.log(data.interval_update);

// Or, you can use the `Promise` API.
updateInterval(updateIntervalVars).then((response) => {
  const data = response.data;
  console.log(data.interval_update);
});
```

### Using `UpdateInterval`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateIntervalRef, UpdateIntervalVariables } from '@dataconnect/generated';

// The `UpdateInterval` mutation requires an argument of type `UpdateIntervalVariables`:
const updateIntervalVars: UpdateIntervalVariables = {
  id: ..., 
  durationSeconds: ..., // optional
};

// Call the `updateIntervalRef()` function to get a reference to the mutation.
const ref = updateIntervalRef(updateIntervalVars);
// Variables can be defined inline as well.
const ref = updateIntervalRef({ id: ..., durationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateIntervalRef(dataConnect, updateIntervalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.interval_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.interval_update);
});
```

## DeleteInterval
You can execute the `DeleteInterval` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteInterval(vars: DeleteIntervalVariables): MutationPromise<DeleteIntervalData, DeleteIntervalVariables>;

interface DeleteIntervalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteIntervalVariables): MutationRef<DeleteIntervalData, DeleteIntervalVariables>;
}
export const deleteIntervalRef: DeleteIntervalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteInterval(dc: DataConnect, vars: DeleteIntervalVariables): MutationPromise<DeleteIntervalData, DeleteIntervalVariables>;

interface DeleteIntervalRef {
  ...
  (dc: DataConnect, vars: DeleteIntervalVariables): MutationRef<DeleteIntervalData, DeleteIntervalVariables>;
}
export const deleteIntervalRef: DeleteIntervalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteIntervalRef:
```typescript
const name = deleteIntervalRef.operationName;
console.log(name);
```

### Variables
The `DeleteInterval` mutation requires an argument of type `DeleteIntervalVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteIntervalVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteInterval` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteIntervalData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteIntervalData {
  interval_delete?: Interval_Key | null;
}
```
### Using `DeleteInterval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteInterval, DeleteIntervalVariables } from '@dataconnect/generated';

// The `DeleteInterval` mutation requires an argument of type `DeleteIntervalVariables`:
const deleteIntervalVars: DeleteIntervalVariables = {
  id: ..., 
};

// Call the `deleteInterval()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteInterval(deleteIntervalVars);
// Variables can be defined inline as well.
const { data } = await deleteInterval({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteInterval(dataConnect, deleteIntervalVars);

console.log(data.interval_delete);

// Or, you can use the `Promise` API.
deleteInterval(deleteIntervalVars).then((response) => {
  const data = response.data;
  console.log(data.interval_delete);
});
```

### Using `DeleteInterval`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteIntervalRef, DeleteIntervalVariables } from '@dataconnect/generated';

// The `DeleteInterval` mutation requires an argument of type `DeleteIntervalVariables`:
const deleteIntervalVars: DeleteIntervalVariables = {
  id: ..., 
};

// Call the `deleteIntervalRef()` function to get a reference to the mutation.
const ref = deleteIntervalRef(deleteIntervalVars);
// Variables can be defined inline as well.
const ref = deleteIntervalRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteIntervalRef(dataConnect, deleteIntervalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.interval_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.interval_delete);
});
```

## CreateWorkoutSession
You can execute the `CreateWorkoutSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createWorkoutSession(vars: CreateWorkoutSessionVariables): MutationPromise<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;

interface CreateWorkoutSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutSessionVariables): MutationRef<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
}
export const createWorkoutSessionRef: CreateWorkoutSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWorkoutSession(dc: DataConnect, vars: CreateWorkoutSessionVariables): MutationPromise<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;

interface CreateWorkoutSessionRef {
  ...
  (dc: DataConnect, vars: CreateWorkoutSessionVariables): MutationRef<CreateWorkoutSessionData, CreateWorkoutSessionVariables>;
}
export const createWorkoutSessionRef: CreateWorkoutSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWorkoutSessionRef:
```typescript
const name = createWorkoutSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateWorkoutSession` mutation requires an argument of type `CreateWorkoutSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWorkoutSessionVariables {
  routineId: UUIDString;
  completedAt: TimestampString;
  totalDurationSeconds: number;
}
```
### Return Type
Recall that executing the `CreateWorkoutSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWorkoutSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWorkoutSessionData {
  workoutSession_insert: WorkoutSession_Key;
}
```
### Using `CreateWorkoutSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWorkoutSession, CreateWorkoutSessionVariables } from '@dataconnect/generated';

// The `CreateWorkoutSession` mutation requires an argument of type `CreateWorkoutSessionVariables`:
const createWorkoutSessionVars: CreateWorkoutSessionVariables = {
  routineId: ..., 
  completedAt: ..., 
  totalDurationSeconds: ..., 
};

// Call the `createWorkoutSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWorkoutSession(createWorkoutSessionVars);
// Variables can be defined inline as well.
const { data } = await createWorkoutSession({ routineId: ..., completedAt: ..., totalDurationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWorkoutSession(dataConnect, createWorkoutSessionVars);

console.log(data.workoutSession_insert);

// Or, you can use the `Promise` API.
createWorkoutSession(createWorkoutSessionVars).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_insert);
});
```

### Using `CreateWorkoutSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWorkoutSessionRef, CreateWorkoutSessionVariables } from '@dataconnect/generated';

// The `CreateWorkoutSession` mutation requires an argument of type `CreateWorkoutSessionVariables`:
const createWorkoutSessionVars: CreateWorkoutSessionVariables = {
  routineId: ..., 
  completedAt: ..., 
  totalDurationSeconds: ..., 
};

// Call the `createWorkoutSessionRef()` function to get a reference to the mutation.
const ref = createWorkoutSessionRef(createWorkoutSessionVars);
// Variables can be defined inline as well.
const ref = createWorkoutSessionRef({ routineId: ..., completedAt: ..., totalDurationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWorkoutSessionRef(dataConnect, createWorkoutSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_insert);
});
```

## UpdateWorkoutSession
You can execute the `UpdateWorkoutSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateWorkoutSession(vars: UpdateWorkoutSessionVariables): MutationPromise<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;

interface UpdateWorkoutSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutSessionVariables): MutationRef<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
}
export const updateWorkoutSessionRef: UpdateWorkoutSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkoutSession(dc: DataConnect, vars: UpdateWorkoutSessionVariables): MutationPromise<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;

interface UpdateWorkoutSessionRef {
  ...
  (dc: DataConnect, vars: UpdateWorkoutSessionVariables): MutationRef<UpdateWorkoutSessionData, UpdateWorkoutSessionVariables>;
}
export const updateWorkoutSessionRef: UpdateWorkoutSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkoutSessionRef:
```typescript
const name = updateWorkoutSessionRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkoutSession` mutation requires an argument of type `UpdateWorkoutSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkoutSessionVariables {
  id: UUIDString;
  totalDurationSeconds: number;
}
```
### Return Type
Recall that executing the `UpdateWorkoutSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkoutSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkoutSessionData {
  workoutSession_update?: WorkoutSession_Key | null;
}
```
### Using `UpdateWorkoutSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutSession, UpdateWorkoutSessionVariables } from '@dataconnect/generated';

// The `UpdateWorkoutSession` mutation requires an argument of type `UpdateWorkoutSessionVariables`:
const updateWorkoutSessionVars: UpdateWorkoutSessionVariables = {
  id: ..., 
  totalDurationSeconds: ..., 
};

// Call the `updateWorkoutSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkoutSession(updateWorkoutSessionVars);
// Variables can be defined inline as well.
const { data } = await updateWorkoutSession({ id: ..., totalDurationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkoutSession(dataConnect, updateWorkoutSessionVars);

console.log(data.workoutSession_update);

// Or, you can use the `Promise` API.
updateWorkoutSession(updateWorkoutSessionVars).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_update);
});
```

### Using `UpdateWorkoutSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutSessionRef, UpdateWorkoutSessionVariables } from '@dataconnect/generated';

// The `UpdateWorkoutSession` mutation requires an argument of type `UpdateWorkoutSessionVariables`:
const updateWorkoutSessionVars: UpdateWorkoutSessionVariables = {
  id: ..., 
  totalDurationSeconds: ..., 
};

// Call the `updateWorkoutSessionRef()` function to get a reference to the mutation.
const ref = updateWorkoutSessionRef(updateWorkoutSessionVars);
// Variables can be defined inline as well.
const ref = updateWorkoutSessionRef({ id: ..., totalDurationSeconds: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkoutSessionRef(dataConnect, updateWorkoutSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutSession_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_update);
});
```

## DeleteWorkoutSession
You can execute the `DeleteWorkoutSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteWorkoutSession(vars: DeleteWorkoutSessionVariables): MutationPromise<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;

interface DeleteWorkoutSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteWorkoutSessionVariables): MutationRef<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
}
export const deleteWorkoutSessionRef: DeleteWorkoutSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteWorkoutSession(dc: DataConnect, vars: DeleteWorkoutSessionVariables): MutationPromise<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;

interface DeleteWorkoutSessionRef {
  ...
  (dc: DataConnect, vars: DeleteWorkoutSessionVariables): MutationRef<DeleteWorkoutSessionData, DeleteWorkoutSessionVariables>;
}
export const deleteWorkoutSessionRef: DeleteWorkoutSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteWorkoutSessionRef:
```typescript
const name = deleteWorkoutSessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteWorkoutSession` mutation requires an argument of type `DeleteWorkoutSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteWorkoutSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteWorkoutSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteWorkoutSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteWorkoutSessionData {
  workoutSession_delete?: WorkoutSession_Key | null;
}
```
### Using `DeleteWorkoutSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutSession, DeleteWorkoutSessionVariables } from '@dataconnect/generated';

// The `DeleteWorkoutSession` mutation requires an argument of type `DeleteWorkoutSessionVariables`:
const deleteWorkoutSessionVars: DeleteWorkoutSessionVariables = {
  id: ..., 
};

// Call the `deleteWorkoutSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteWorkoutSession(deleteWorkoutSessionVars);
// Variables can be defined inline as well.
const { data } = await deleteWorkoutSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteWorkoutSession(dataConnect, deleteWorkoutSessionVars);

console.log(data.workoutSession_delete);

// Or, you can use the `Promise` API.
deleteWorkoutSession(deleteWorkoutSessionVars).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_delete);
});
```

### Using `DeleteWorkoutSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteWorkoutSessionRef, DeleteWorkoutSessionVariables } from '@dataconnect/generated';

// The `DeleteWorkoutSession` mutation requires an argument of type `DeleteWorkoutSessionVariables`:
const deleteWorkoutSessionVars: DeleteWorkoutSessionVariables = {
  id: ..., 
};

// Call the `deleteWorkoutSessionRef()` function to get a reference to the mutation.
const ref = deleteWorkoutSessionRef(deleteWorkoutSessionVars);
// Variables can be defined inline as well.
const ref = deleteWorkoutSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteWorkoutSessionRef(dataConnect, deleteWorkoutSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutSession_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutSession_delete);
});
```

