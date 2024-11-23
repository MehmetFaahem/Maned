/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.UserPreferenceInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.createMany(input as any))),

        create: procedure.input($Schema.UserPreferenceInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.create(input as any))),

        deleteMany: procedure.input($Schema.UserPreferenceInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.deleteMany(input as any))),

        delete: procedure.input($Schema.UserPreferenceInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.delete(input as any))),

        findFirst: procedure.input($Schema.UserPreferenceInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).userPreference.findFirst(input as any))),

        findMany: procedure.input($Schema.UserPreferenceInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).userPreference.findMany(input as any))),

        findUnique: procedure.input($Schema.UserPreferenceInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).userPreference.findUnique(input as any))),

        updateMany: procedure.input($Schema.UserPreferenceInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.updateMany(input as any))),

        update: procedure.input($Schema.UserPreferenceInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).userPreference.update(input as any))),

        count: procedure.input($Schema.UserPreferenceInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).userPreference.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.UserPreferenceCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.UserPreferenceCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserPreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserPreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserPreferenceGetPayload<T>, Context>) => Promise<Prisma.UserPreferenceGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.UserPreferenceDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.UserPreferenceDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserPreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserPreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserPreferenceGetPayload<T>, Context>) => Promise<Prisma.UserPreferenceGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.UserPreferenceFindFirstArgs, TData = Prisma.UserPreferenceGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.UserPreferenceFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserPreferenceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserPreferenceFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserPreferenceFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserPreferenceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserPreferenceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.UserPreferenceFindManyArgs, TData = Array<Prisma.UserPreferenceGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.UserPreferenceFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.UserPreferenceGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserPreferenceFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.UserPreferenceFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.UserPreferenceGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.UserPreferenceGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.UserPreferenceFindUniqueArgs, TData = Prisma.UserPreferenceGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.UserPreferenceFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UserPreferenceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UserPreferenceFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UserPreferenceFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UserPreferenceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UserPreferenceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.UserPreferenceUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.UserPreferenceUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UserPreferenceUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UserPreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UserPreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UserPreferenceUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UserPreferenceUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UserPreferenceGetPayload<T>, Context>) => Promise<Prisma.UserPreferenceGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.UserPreferenceCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserPreferenceCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.UserPreferenceCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.UserPreferenceCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.UserPreferenceCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.UserPreferenceCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.UserPreferenceCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.UserPreferenceCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
