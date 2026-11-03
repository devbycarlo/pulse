# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useDeleteUser, useCreateWorkoutCategory, useUpdateWorkoutCategory, useDeleteWorkoutCategory, useCreateRoutine, useUpdateRoutine, useDeleteRoutine, useCreateInterval } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateUser(updateUserVars);

const { data, isPending, isSuccess, isError, error } = useDeleteUser();

const { data, isPending, isSuccess, isError, error } = useCreateWorkoutCategory(createWorkoutCategoryVars);

const { data, isPending, isSuccess, isError, error } = useUpdateWorkoutCategory(updateWorkoutCategoryVars);

const { data, isPending, isSuccess, isError, error } = useDeleteWorkoutCategory(deleteWorkoutCategoryVars);

const { data, isPending, isSuccess, isError, error } = useCreateRoutine(createRoutineVars);

const { data, isPending, isSuccess, isError, error } = useUpdateRoutine(updateRoutineVars);

const { data, isPending, isSuccess, isError, error } = useDeleteRoutine(deleteRoutineVars);

const { data, isPending, isSuccess, isError, error } = useCreateInterval(createIntervalVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, createWorkoutCategory, updateWorkoutCategory, deleteWorkoutCategory, createRoutine, updateRoutine, deleteRoutine, createInterval } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation CreateWorkoutCategory:  For variables, look at type CreateWorkoutCategoryVars in ../index.d.ts
const { data } = await CreateWorkoutCategory(dataConnect, createWorkoutCategoryVars);

// Operation UpdateWorkoutCategory:  For variables, look at type UpdateWorkoutCategoryVars in ../index.d.ts
const { data } = await UpdateWorkoutCategory(dataConnect, updateWorkoutCategoryVars);

// Operation DeleteWorkoutCategory:  For variables, look at type DeleteWorkoutCategoryVars in ../index.d.ts
const { data } = await DeleteWorkoutCategory(dataConnect, deleteWorkoutCategoryVars);

// Operation CreateRoutine:  For variables, look at type CreateRoutineVars in ../index.d.ts
const { data } = await CreateRoutine(dataConnect, createRoutineVars);

// Operation UpdateRoutine:  For variables, look at type UpdateRoutineVars in ../index.d.ts
const { data } = await UpdateRoutine(dataConnect, updateRoutineVars);

// Operation DeleteRoutine:  For variables, look at type DeleteRoutineVars in ../index.d.ts
const { data } = await DeleteRoutine(dataConnect, deleteRoutineVars);

// Operation CreateInterval:  For variables, look at type CreateIntervalVars in ../index.d.ts
const { data } = await CreateInterval(dataConnect, createIntervalVars);


```